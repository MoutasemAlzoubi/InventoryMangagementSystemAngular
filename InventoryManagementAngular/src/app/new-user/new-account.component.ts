import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { RoleModel } from '../Model/RoleModel';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../Service/RoleService';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { SignUp } from '../Model/SignUp';
import { UserService } from '../Service/UserService';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              private roleService:RoleService,
              private formBuilder:FormBuilder,
              private userService:UserService
  ){

  }
  roleList!:RoleModel[]
  AccountForm!:FormGroup
  isEdit:boolean = false

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams['UserId'] != undefined){
      this.edit(this.activatedRoute.snapshot.queryParams['UserId'])

    }
    this.ddlRole()
    this.accountVali()
    
  }

  ddlRole(){
  this.roleService.GetRoles().subscribe({
    next:dataRole=>{
        this.roleList = dataRole
        
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

  accountVali(){
    this.AccountForm = this.formBuilder.group({
      txtName:['',Validators.required],
      txtUserName:['',Validators.required],
      txtPassword:['',Validators.required],
      txtConfPass:['',Validators.required],
      txtRole:['',Validators.required]


  })
  }

  

  Save(){
    if(this.AccountForm.valid){
    var signUp = new SignUp();
    signUp.name = this.AccountForm.value['txtName']
    signUp.userName = this.AccountForm.value['txtUserName']
    signUp.password = this.AccountForm.value['txtPassword']
    signUp.confirmPassword = this.AccountForm.value['txtConfPass']
    signUp.roleName = this.AccountForm.value['txtRole']
    this.userService.insert(signUp).subscribe({
      next:()=>{
         Swal.fire({
         position: "top-end",
         icon: "success",
         title: "the Account has been created",
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









edit(id:string){
  this.userService.EditUser(id).subscribe({
    next:userDate=>{
            this.isEdit = true

      this.AccountForm.controls['txtName'].setValue(userDate.name)
      this.AccountForm.controls['txtUserName'].setValue(userDate.userName)
      this.AccountForm.controls['txtRole'].setValue(userDate.roleName)

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
  var userUpdate = new SignUp();
  userUpdate.id = String(this.activatedRoute.snapshot.queryParams['UserId'])
  userUpdate.name = this.AccountForm.value['txtName']

  userUpdate.userName = this.AccountForm.value['txtUserName']
  userUpdate.password = this.AccountForm.value['txtPassword']
  userUpdate.confirmPassword = this.AccountForm.value['txtConfPass']
  userUpdate.roleName = this.AccountForm.value['txtRole']
  this.userService.UpdateUser(userUpdate).subscribe({
    next:()=>{
      this.router.navigate(['/app/UserList'])
      Swal.fire({
                position: "top-end",
                icon: "success",
                title: "the User has been Updated",
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
