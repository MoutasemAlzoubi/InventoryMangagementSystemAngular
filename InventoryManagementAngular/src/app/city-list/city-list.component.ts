import { Component, OnInit } from '@angular/core';
import { CityService } from '../Service/CityService';
import { CityDTO } from '../Model/CityDTO';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cityList!:CityDTO[];
  cityName:string = ''
  

  constructor(private cityService:CityService,
              private router:Router){}

  ngOnInit(): void {
    this.fillCity()

  }
  fillCity(){
    this.cityService.LoadAll().subscribe({
      next:data=>{
        this.cityList = data

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
    this.cityService.Delete(id).subscribe({
      next:()=>{
        Swal.fire({
         title: "Deleted!",
         text: "Your City has been deleted.",
         icon: "success"
                  });
        this.fillCity()
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
    this.router.navigate(['/app/NewCity'],{queryParams:{CityId:id}})

  }





  SearchByName(){
    this.cityService.LoadByName(this.cityName).subscribe({
      next:dataName=>{
        this.cityList = dataName

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


