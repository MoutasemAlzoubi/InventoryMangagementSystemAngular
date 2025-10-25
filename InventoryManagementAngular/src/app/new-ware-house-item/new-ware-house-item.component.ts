import { Component, OnInit } from '@angular/core';
import { WareHouseItemService } from '../Service/WareHouseItemService';
import { WareHouseService } from '../Service/WareHouseService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WareHouseDTO } from '../Model/WareHouseDTO';
import { WareHouseItemDTO } from '../Model/WareHouseItemDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-ware-house-item',
  templateUrl: './new-ware-house-item.component.html',
  styleUrls: ['./new-ware-house-item.component.css']
})
export class NewWareHouseItemComponent implements OnInit {
  constructor(private itemService:WareHouseItemService,
              private houseService:WareHouseService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder

  ){}
  ddlWareHouse!:WareHouseDTO[]
  itemForm!:FormGroup
  isEdit:boolean=false;



  






  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams['ItemId'] != undefined){
      this.edit(this.activatedRoute.snapshot.queryParams['ItemId'])
    
  }




    this.fillItem()
    this.fillWareHouse()
    
  }
  fillWareHouse(){
    this.houseService.LoadAll().subscribe({
      next:data=>{
        this.ddlWareHouse = data

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





  fillItem(){
    this.itemForm = this.formBuilder.group({
      txtName:['',Validators.required],
      txtCode:['',Validators.required],
      txtQty:['',Validators.required],
      txtPrice:['',Validators.required],
      txtHouse:['',Validators.required]
    })
  }






  save(){
    var newItem = new WareHouseItemDTO();
    newItem.name = this.itemForm.value['txtName']
    newItem.code = this.itemForm.value['txtCode']
    newItem.qty = this.itemForm.value['txtQty']
    newItem.costPrice = this.itemForm.value['txtPrice']
    newItem.wareHouse_Id = this.itemForm.value['txtHouse']
    this.itemService.Insert(newItem).subscribe({
      next:()=>{
        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "the Item has been saved",
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








  edit(id:number){
    this.itemService.Edit(id).subscribe({
      next:data=>{
        this.isEdit = true
        this.itemForm.controls['txtName'].setValue(data.name)
        this.itemForm.controls['txtCode'].setValue(data.code)
        this.itemForm.controls['txtQty'].setValue(data.qty)
        this.itemForm.controls['txtPrice'].setValue(data.costPrice)
        this.itemForm.controls['txtHouse'].setValue(data.wareHouse_Id)

        
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
      var newHouseItem = new WareHouseItemDTO();
      newHouseItem.id = parseInt(this.activatedRoute.snapshot.queryParams['ItemId'])
      newHouseItem.name = this.itemForm.value['txtName']
      newHouseItem.code = this.itemForm.value['txtCode']
      newHouseItem.qty = this.itemForm.value['txtQty']
      newHouseItem.costPrice = this.itemForm.value['txtPrice']
      newHouseItem.wareHouse_Id = this.itemForm.value['txtHouse']
      this.itemService.Update(newHouseItem).subscribe({
        next:()=>{
          Swal.fire({
          position: "top-end",
          icon: "success",
          title: "the Item has been updated",
          showConfirmButton: false,
          timer: 1500
        });
          this.router.navigate(['/app/WareHouseItemList'])
        
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
