import { Component, OnInit } from '@angular/core';
import { RoleService } from '../Service/RoleService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoleModel } from '../Model/RoleModel';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.css']
})
export class NewRoleComponent implements OnInit {

  roleForm!:FormGroup
  isEdit:boolean = false

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams['roleId'] != undefined){
      this.edit(this.activatedRoute.snapshot.queryParams['roleId'])

    }
    this.fillRole();
  }


  constructor(private roleService:RoleService,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute,
              private router:Router

  ){}

  fillRole(){
  this.roleForm = this.formBuilder.group({
    txtRole:['',Validators.required]
  })
  }




  save(){
    if(this.roleForm.valid){
      // debugger

    var newRole = new RoleModel
    newRole.name = this.roleForm.value['txtRole']
     console.log(this.roleForm.value); 
    this.roleService.Insert(newRole).subscribe({
      next:()=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "the Role has been saved",
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
  this.roleService.Edit(id).subscribe({
    next:data=>{
      this.isEdit = true
     this.roleForm.controls['txtRole'].setValue(data.name)
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
  var upRole = new RoleModel();
  upRole.id = String(this.activatedRoute.snapshot.queryParams['roleId'])
  upRole.name = this.roleForm.value['txtRole']
  this.roleService.UpdateRole(upRole).subscribe({
    next:()=>{
      this.router.navigate(['/app/RolesList'])
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: "the Role has been Updated",
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
