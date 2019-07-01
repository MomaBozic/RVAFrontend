import { Component, OnInit, ViewChild } from '@angular/core';
import { Tim } from 'src/app/models/tim';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { TimService } from 'src/app/services/tim.service';
import { Liga } from 'src/app/models/liga';
import { TimDialogComponent } from '../dialogs/tim-dialog/tim-dialog.component';

@Component({
  selector: 'app-tim',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css']
})
export class TimComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'osnovan', 'sediste', 'liga', 'actions'];
  dataSource: MatTableDataSource<Tim>;
  selektovanTim: Tim;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public timService: TimService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.timService.getAllTimovi().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      //pretraga po nazivu ugnježdenog objekta
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'liga' ? currentTerm + data.liga.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

       //sortiranje po nazivu ugnježdenog objekta
       this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'liga': return data.liga.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, id: number, naziv: string, osnovan: Date, sediste: string, liga: Liga) {
    const dialogRef = this.dialog.open(TimDialogComponent, { data: { id: id, naziv: naziv, osnovan: osnovan, sediste: sediste, liga: liga} });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1){
          this.loadData();
      }

    });
  }

  selectRow(row){
    this.selektovanTim = row;
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}