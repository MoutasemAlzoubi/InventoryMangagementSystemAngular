import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NewCountryComponent } from './new-country/new-country.component';
import { CountryListComponent } from './country-list/country-list.component';
import { NewCityComponent } from './new-city/new-city.component';
import { CityListComponent } from './city-list/city-list.component';
import { NewWareHouseComponent } from './new-ware-house/new-ware-house.component';
import { WareHouseListComponent } from './ware-house-list/ware-house-list.component';
import { NewWareHouseItemComponent } from './new-ware-house-item/new-ware-house-item.component';
import { WareHouseItemListComponent } from './ware-house-item-list/ware-house-item-list.component';
import { NewAccountComponent } from './new-user/new-account.component';
import { AccountListComponent } from './UserList/account-list.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { DashhBoardComponent } from './dashh-board/dashh-board.component';

const routes: Routes = [{path:'',component:LoginComponent},
  {path:'app',component:DashBoardComponent,children:[
    {path:'DashBoard',component:DashhBoardComponent},
    {path:'NewCountry',component:NewCountryComponent},
    {path:'CountryList',component:CountryListComponent},
    {path:'NewCity',component:NewCityComponent},
    {path:'CityList',component:CityListComponent},
    {path:'NewWareHouse',component:NewWareHouseComponent},
    {path:'WareHouseList',component:WareHouseListComponent},
    {path:'NewWareHouseItem',component:NewWareHouseItemComponent},
    {path:'WareHouseItemList',component:WareHouseItemListComponent},
    {path:'NewAccount',component:NewAccountComponent},
    {path:'UserList',component:AccountListComponent},
    {path:'NewRole',component:NewRoleComponent},
    {path:'RolesList',component:RolesListComponent}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
