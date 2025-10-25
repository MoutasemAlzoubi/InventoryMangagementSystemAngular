import { Component, OnInit } from '@angular/core';
import { RoleModel } from '../Model/RoleModel';
import { RoleService } from '../Service/RoleService';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit{

  roleList!:RoleModel[]
  roleName:string = ''



  constructor(private roleService:RoleService,
              private router:Router
  ){}

  ngOnInit(): void {
    this.fillRoles()
    
  }





  fillRoles(){
    this.roleService.GetRoles().subscribe({
      next:data=>{
        this.roleList = data
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










  Delete(id:string){
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
    this.roleService.Delete(id).subscribe({
      next:()=>{
             
              Swal.fire({
                    title: "Deleted!",
                    text: "Your Role has been deleted.",
                    icon: "success"
                  });
              this.fillRoles()
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
    
    
 




    Edit(id:string){
      this.router.navigate(['/app/NewRole'],{queryParams:{roleId:id}})
    }







    SearchByName(){
      this.roleService.SearchByName(this.roleName).subscribe({
        next:dataname=>{

          this.roleList = dataname

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



