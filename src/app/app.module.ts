import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { TableViewComponent } from './table-view/table-view.component';
import { AddDataComponent } from './add-data/add-data.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    TableViewComponent,
    AddDataComponent,
    AdminComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot([
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "search",
        component: TableViewComponent
      },
      {
        path: "add-Doner",
        component: AddDataComponent
      },
      {
        path: "admin",
        component: AdminComponent
      },
      {
        path: "login",
        component: AuthComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
