import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../Service/CountryService';
import { CityService } from '../Service/CityService';
import { ActivatedRoute, Router } from '@angular/router';
import { WareHouseService } from '../Service/WareHouseService';
import { CountryDTO } from '../Model/CountryDTO';
import { CityDTO } from '../Model/CityDTO';
import { WareHouseDTO } from '../Model/WareHouseDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-ware-house',
  templateUrl: './new-ware-house.component.html',
  styleUrls: ['./new-ware-house.component.css']
})
export class NewWareHouseComponent implements OnInit {
constructor(private formBuilder:FormBuilder,
            private countryService:CountryService,
            private cityService:CityService,
            private wareHouseService:WareHouseService,
            private router:Router,
            private activateRoute:ActivatedRoute

){}
  isEdit:boolean = false;
countryList!:CountryDTO[]
cityList!:CityDTO[]
WareForm!:FormGroup
  
  
  ngOnInit(): void {
    if(this.activateRoute.snapshot.queryParams['WareHouseId'] != undefined){
      this.edit(this.activateRoute.snapshot.queryParams['WareHouseId'])

    }
    this.fillCountry()
    this.fillCity()
    this.fillWareHouse()

    
  }
  fillCountry(){
    this.countryService.LoadAll().subscribe({
      next:data=>{
        this.countryList = data
      },
      error:()=>{
        console.log("error happened with Country load")
      }

    })

  }


  fillCity(){
    this.cityService.LoadAll().subscribe({
      next:data=>{
        this.cityList = data
      },
      error:()=>{
        console.log("error happened with City load")
      }

    })
  }
  


  fillWareHouse(){

    this.WareForm = this.formBuilder.group({
      txtName:['',Validators.required],
      txtDesc:['',Validators.required],
      txtCountry:['',Validators.required],
      txtCity:['',Validators.required]
  })
  }



  save(){
    if(this.WareForm.valid){
    var ware = new WareHouseDTO();
    ware.name = this.WareForm.value['txtName']
    ware.description = this.WareForm.value['txtDesc']
    ware.country_Id = this.WareForm.value['txtCountry']
    ware.city_Id = this.WareForm.value['txtCity']
    this.wareHouseService.Insert(ware).subscribe({
      next:()=>{
      this.router.navigate(['/app/WareHouseList'])
         Swal.fire({
                position: "top-end",
                icon: "success",
                title: "the Warehouse has been saved",
                showConfirmButton: false,
                timer: 1500
              });
      },
      error:()=>{
                        Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "error happened",
                        showConfirmButton: false,
                        timer: 1500
                      });
      }
    })
    }
  }


edit(id:number){
  this.wareHouseService.Edit(id).subscribe({
    next:data=>{  
      this.isEdit = true;
      // this.WareForm.controls['txtId'].setValue(data.id)
      this.WareForm.controls['txtName'].setValue(data.name)
      this.WareForm.controls['txtDesc'].setValue(data.description)
      this.WareForm.controls['txtCountry'].setValue(data.country_Id)
      this.WareForm.controls['txtCity'].setValue(data.city_Id)
    },
    error:()=>{
       Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "error happened",
                      showConfirmButton: false,
                      timer: 1500
                    });
    }
  })
}


Update(){
  var wareh = new WareHouseDTO()
  wareh.id = parseInt(this.activateRoute.snapshot.queryParams['WareHouseId'])
  // wareh.id = this.WareForm.value['txtId']
  wareh.name = this.WareForm.value['txtName']
  wareh.description = this.WareForm.value['txtDesc']
  wareh.country_Id = this.WareForm.value['txtCountry']
  wareh.city_Id = this.WareForm.value['txtCity']
  this.wareHouseService.Update(wareh).subscribe({
    next:()=>{
      this.router.navigate(['/app/WareHouseList'])
       Swal.fire({
                position: "top-end",
                icon: "success",
                title: "the Warehouse has been updated",
                showConfirmButton: false,
                timer: 1500
              });
    },
    error:()=>{
      Swal.fire({
       position: "top-end",
       icon: "error",
       title: "error happened",
       showConfirmButton: false,
       timer: 1500
                });
    }
  })
}


}
