import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewCountryComponent } from './new-country/new-country.component';
import { NewCityComponent } from './new-city/new-city.component';
import { NewWareHouseComponent } from './new-ware-house/new-ware-house.component';
import { NewWareHouseItemComponent } from './new-ware-house-item/new-ware-house-item.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { NewAccountComponent } from './new-user/new-account.component';
import { LoginComponent } from './login/login.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CityListComponent } from './city-list/city-list.component';
import { WareHouseListComponent } from './ware-house-list/ware-house-list.component';
import { WareHouseItemListComponent } from './ware-house-item-list/ware-house-item-list.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { AccountListComponent } from './UserList/account-list.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CountryService } from './Service/CountryService';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { DashhBoardComponent } from './dashh-board/dashh-board.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    NewCountryComponent,
    NewCityComponent,
    NewWareHouseComponent,
    NewWareHouseItemComponent,
    NewRoleComponent,
    NewAccountComponent,
    LoginComponent,
    CountryListComponent,
    CityListComponent,
    WareHouseListComponent,
    WareHouseItemListComponent,
    RolesListComponent,
    AccountListComponent,
    DashBoardComponent,
    DashhBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule
    
  ],
  providers: [CountryService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthenticationInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
