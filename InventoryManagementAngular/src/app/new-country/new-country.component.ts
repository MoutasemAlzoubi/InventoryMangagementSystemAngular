import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryDTO } from '../Model/CountryDTO';
import { CountryService } from '../Service/CountryService';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.css']
})
export class NewCountryComponent implements OnInit {
  CountryForm!:FormGroup
  IsEdit:boolean = false;

constructor(private formBuilder:FormBuilder,
            private countryService:CountryService,
            private activatedRoute:ActivatedRoute,
            private router:Router){

}
  ngOnInit(): void {
    this.formCountry();
    if(this.activatedRoute.snapshot.queryParams['CountryId'] != undefined){
      this.edit(this.activatedRoute.snapshot.queryParams['CountryId'])

    }

    }


    formCountry(){
      this.CountryForm = this.formBuilder.group({
      txtCode:['',Validators.required],
      txtName:['',Validators.required]}
    )}
  

  Save(){
    if(this.CountryForm.valid){
      //save country
      var newCountry = new CountryDTO();
      newCountry.code = this.CountryForm.value['txtCode']
      newCountry.name = this.CountryForm.value['txtName']

      this.countryService.Insert(newCountry).subscribe({
        next:()=>{
           Swal.fire({
               position: "top-end",
               icon: "success",
               title: "the Country has been saved",
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
    // debugger
     this.countryService.Edit(id).subscribe({
      next:data=>{
        this.IsEdit = true;
        this.CountryForm.controls['txtCode'].setValue(data.code)
        this.CountryForm.controls['txtName'].setValue(data.name)
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
    if(this.CountryForm.valid){
      //save country
      var newCountry = new CountryDTO();
      newCountry.id = parseInt(this.activatedRoute.snapshot.queryParams['CountryId'])
      newCountry.code = this.CountryForm.value['txtCode']
      newCountry.name = this.CountryForm.value['txtName']

      this.countryService.Update(newCountry).subscribe({
        next:()=>{
          this.router.navigate(['/app/CountryList'])
          Swal.fire({
               position: "top-end",
               icon: "success",
               title: "the Country has been updated",
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
