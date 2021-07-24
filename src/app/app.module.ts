import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormcomponentComponent } from './formcomponent/formcomponent.component';
import { TablecomponentComponent } from './tablecomponent/tablecomponent.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  } from '@ng-bootstrap/ng-bootstrap';
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    FormcomponentComponent,
    TablecomponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatGridListModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
