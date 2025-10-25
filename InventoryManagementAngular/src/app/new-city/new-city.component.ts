import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../Service/CountryService';
import { CityDTO } from '../Model/CityDTO';
import { CountryDTO } from '../Model/CountryDTO';
import { CityService } from '../Service/CityService';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.css']
})
export class NewCityComponent implements OnInit {
  CityForm!:FormGroup
  listCountry!:CountryDTO[]
  isEdit:boolean = false;

  


  constructor(private formBuilder:FormBuilder,
              private countryService:CountryService,
              private cityService:CityService,
              private activatedRoute:ActivatedRoute,
              private router:Router
  ){}

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams['CityId'] != undefined){
      this.edit(this.activatedRoute.snapshot.queryParams['CityId'])

    }
    this.fillCity();
    this.ddlCountry();
  }




  fillCity(){
    this.CityForm = this.formBuilder.group({
      txtName:['',Validators.required],
      txtCountryList:['',Validators.required]
  })
  }
  ddlCountry(){
    this.countryService.LoadAll().subscribe({
      next:data=>{
        this.listCountry = data

      }
    })
  }


  Save(){
    
    if(this.CityForm.valid){
      var cityDTO = new CityDTO();
      cityDTO.name = this.CityForm.value['txtName']
      cityDTO.country_Id = this.CityForm.value['txtCountryList']
      
      
      this.cityService.Insert(cityDTO).subscribe({
        next:()=>{
           Swal.fire({
           position: "top-end",
           icon: "success",
           title: "the City has been saved",
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
  this.cityService.Edit(id).subscribe({
    next:data=>{
      // debugger
      this.isEdit = true;
      this.CityForm.controls['txtName'].setValue(data.name)
      this.CityForm.controls['txtCountryList'].setValue(data.country_Id)

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
  if(this.CityForm.valid){
  var newCity = new CityDTO();
  newCity.id = parseInt(this.activatedRoute.snapshot.queryParams['CityId'])
  newCity.name = this.CityForm.value['txtName']
  newCity.country_Id = this.CityForm.value['txtCountryList']
  this.cityService.Update(newCity).subscribe({
    next:()=>{
      this.router.navigate(['/app/CityList'])
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "the City has been Updated",
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

}
