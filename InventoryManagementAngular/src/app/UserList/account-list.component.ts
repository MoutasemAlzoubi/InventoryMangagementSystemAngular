import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/UserService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignUp } from '../Model/SignUp';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  UsersList!:SignUp[]
  UserSearch:string = ''



  constructor(private userService:UserService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private formsModule:FormsModule
  ){}


  ngOnInit(): void {
    this.LoadUsers();
  }

  LoadUsers(){
    this.userService.LoadAllUsers().subscribe({
      next:dateUsers=>{
        this.UsersList = dateUsers

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
    this.userService.DeleteUser(id).subscribe({
     next:()=>{
            
             Swal.fire({
                   title: "Deleted!",
                   text: "Your Account has been deleted.",
                   icon: "success"
                 });
             this.LoadUsers()
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
        this.router.navigate(['/app/NewAccount'],{queryParams:{UserId:id}})
       }










       SearchByName(){
        this.userService.SearchByNameOfUser(this.UserSearch).subscribe({
          next:searchData=>{
            this.UsersList = searchData

          },
          error:()=>{

          }


        })



       }




}
