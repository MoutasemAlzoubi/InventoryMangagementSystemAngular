import { Component, OnInit } from '@angular/core';
import { WareHouseService } from '../Service/WareHouseService';
import { WareHouseDTO } from '../Model/WareHouseDTO';
import { Route, Router } from '@angular/router';
import { query } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ware-house-list',
  templateUrl: './ware-house-list.component.html',
  styleUrls: ['./ware-house-list.component.css']
})
export class WareHouseListComponent implements OnInit {
  constructor(private wareHouseService:WareHouseService,
              private router:Router
  ){}
  listWareHouse!:WareHouseDTO[]
  wareHouseName:string = ''


  ngOnInit(): void {
    this.wareHouseList()
  }

  wareHouseList(){
    this.wareHouseService.LoadAll().subscribe({
      next:data=>{
        this.listWareHouse = data
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
    
    this.wareHouseService.Delete(id).subscribe({
      next:()=>{
       
        Swal.fire({
              title: "Deleted!",
              text: "Your Warehouse has been deleted.",
              icon: "success"
            });
        this.wareHouseList()
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

    this.router.navigate(['/app/NewWareHouse'],{queryParams:{WareHouseId:id}})

  }

  



  SearchByWareHouseName(){
    this.wareHouseService.SearchByName(this.wareHouseName).subscribe({
      next:dataName=>{
        this.listWareHouse = dataName
        
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
