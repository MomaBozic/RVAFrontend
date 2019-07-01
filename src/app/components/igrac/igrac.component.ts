import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Igrac } from 'src/app/models/igrac';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Tim } from 'src/app/models/tim';
import { IgracService } from 'src/app/services/igrac.service';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { IgracDialogComponent } from '../dialogs/igrac-dialog/igrac-dialog.component';
import { TimService } from 'src/app/services/tim.service';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit {


  displayedColumns = ['id', 'ime', 'prezime', 'brojReg', 'datumRodjenja', 'nacionalnost', 'tim', 'actions'];
  dataSource: MatTableDataSource<Igrac>;

  @Input() selektovanTim: Tim;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort: MatSort;

  constructor(public igracService: IgracService,
              public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.selektovanTim.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.igracService.getIgracTimId(this.selektovanTim.id)
  .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource);
      //pretraga po nazivu ugnježdenog objekta
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'nacionalnost' ? currentTerm + data.nacionalnost.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

        //sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'nacionalnost': return data.nacionalnost.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, id: number, ime: string, prezime: string, brojReg: string,
    datumRodjenja: Date, nacionalnost: Nacionalnost, tim: Tim) {
    const dialogRef = this.dialog.open(IgracDialogComponent, {
      data: {
        id: id, ime: ime, prezime: prezime, brojReg: brojReg,
        datumRodjenja: datumRodjenja, nacionalnost: nacionalnost, tim: tim
      }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag == 1)
      dialogRef.componentInstance.data.tim = this.selektovanTim;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}