import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Nacionalnost } from 'src/app/models/nacionalnost';
import { NacionalnostService } from 'src/app/services/nacionalnost.service';
import { NacionalnostDialogComponent } from '../dialogs/nacionalnost-dialog/nacionalnost-dialog.component';

@Component({
  selector: 'app-nacionalnost',
  templateUrl: './nacionalnost.component.html',
  styleUrls: ['./nacionalnost.component.css']
})
export class NacionalnostComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'skracenica', 'actions'];
  dataSource: MatTableDataSource<Nacionalnost>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public nacionalnostService: NacionalnostService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.nacionalnostService.getAllNacionalnosti().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public openDialog(flag: number, id: number, naziv: string, skracenica: string) {
    const dialogRef = this.dialog.open(NacionalnostDialogComponent, 
                      { data: { id: id, naziv: naziv, skracenica: skracenica } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}