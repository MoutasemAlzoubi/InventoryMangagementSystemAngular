import { Component } from '@angular/core';
import { UserService } from '../Service/UserService';
import { WareHouseService } from '../Service/WareHouseService';
import { CountryService } from '../Service/CountryService';
import { CityService } from '../Service/CityService';
import { WareHouseDTO } from '../Model/WareHouseDTO';

@Component({
  selector: 'app-dashh-board',
  templateUrl: './dashh-board.component.html',
  styleUrls: ['./dashh-board.component.css']
})
export class DashhBoardComponent {

  WareHouse!:''
  Users!:''
  Cities!:''
  Countries!:''



    
     

  ;

  constructor(
    private userService: UserService,
    private warehouseService: WareHouseService,
    private countryService: CountryService,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    // جلب عدد الحسابات
    this.userService.LoadAllUsers().subscribe({
      next:datau=>{
       this.Users = datau.length
       
      }
    }),

    // جلب عدد المخازن
    this.warehouseService.LoadAll().subscribe({
      next:data=>{
       this.WareHouse = data.length
       
      }
    });

    // جلب عدد الدول
    this.countryService.LoadAll().subscribe({
      next:dataCountry=>{
        this.Countries = dataCountry.length
      }
    });

    // جلب عدد المدن
    this.cityService.LoadAll().subscribe({
      next:dataCity=>{
        this.Cities = dataCity.length
      }
    })
}
}

