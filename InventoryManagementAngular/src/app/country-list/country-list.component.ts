import { Component, OnInit } from '@angular/core';
import { CountryService } from '../Service/CountryService';
import { CountryDTO } from '../Model/CountryDTO';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countryList!:CountryDTO[]
  countryName!:string

constructor(private countryService:CountryService,
            private router:Router){}
  ngOnInit(): void {
    this.fillCountry()

  }

  fillCountry(){
    this.countryService.LoadAll().subscribe({
      next:data=>{
        // console.log(data)
        this.countryList = data
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
  Delete(id:number){
     Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
    this.countryService.DeleteCountry(id).subscribe({
      next:()=>{
        Swal.fire({
                      title: "Deleted!",
                      text: "Your Country has been deleted.",
                      icon: "success"
                    });
        this.fillCountry()
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
});

  }



  Edit(id:number){
    // debugger

    this.router.navigate(['/app/NewCountry'],{queryParams:{CountryId:id}})
  }

  SearchByName(){
    this.countryService.SearchByNameOrCode(this.countryName).subscribe({
      next:data=>{
        this.countryList = data

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
