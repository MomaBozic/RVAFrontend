import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IgracComponent } from './components/igrac/igrac.component';
import { TimComponent } from './components/tim/tim.component';
import { LigaComponent } from './components/liga/liga.component';
import { NacionalnostComponent } from './components/nacionalnost/nacionalnost.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HelpComponent } from './components/core/help/help.component';
import { HomeComponent } from './components/core/home/home.component';

import { NacionalnostDialogComponent } from './components/dialogs/nacionalnost-dialog/nacionalnost-dialog.component';
import { LigaDialogComponent } from './components/dialogs/liga-dialog/liga-dialog.component';
import { TimDialogComponent } from './components/dialogs/tim-dialog/tim-dialog.component';
import { IgracDialogComponent } from './components/dialogs/igrac-dialog/igrac-dialog.component';

import { MatButtonModule, 
  MatIconModule, 
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,
  MatGridListModule,
  MatOptionModule,
  MatTableModule,
  MatToolbarModule,
  MatSelectModule,
  MatSnackBarModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatSortModule,
  MatPaginatorModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LigaService } from './services/liga.service';
import { TimService } from './services/tim.service';
import { IgracService } from './services/igrac.service';
import { NacionalnostService } from './services/nacionalnost.service';

const Routes = [
  { path: 'nacionalnost', component: NacionalnostComponent },
  { path: 'liga', component: LigaComponent },
  { path: 'tim', component: TimComponent },
  { path: 'igrac', component: IgracComponent },
  { path: 'home', component: HomeComponent },
  { path: 'author', component: AuthorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    IgracComponent,
    TimComponent,
    LigaComponent,
    NacionalnostComponent,
    AuthorComponent,
    HelpComponent,
    HomeComponent,
    NacionalnostDialogComponent,
    LigaDialogComponent,
    TimDialogComponent,
    IgracDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forRoot(Routes)
  ],
  entryComponents: [
    NacionalnostDialogComponent,
    LigaDialogComponent,
    TimDialogComponent,
    IgracDialogComponent
  ],
  providers: [NacionalnostService,
              LigaService,
              TimService,
              IgracService],
  bootstrap: [AppComponent]
})
export class AppModule { }