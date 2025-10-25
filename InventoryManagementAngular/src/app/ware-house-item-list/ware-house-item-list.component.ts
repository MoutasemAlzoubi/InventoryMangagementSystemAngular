import { Component, OnInit } from '@angular/core';
import { WareHouseItemService } from '../Service/WareHouseItemService';
import { Router } from '@angular/router';
import { WareHouseItemDTO } from '../Model/WareHouseItemDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ware-house-item-list',
  templateUrl: './ware-house-item-list.component.html',
  styleUrls: ['./ware-house-item-list.component.css']
})
export class WareHouseItemListComponent implements OnInit {
  ItemList!: WareHouseItemDTO[];
  searchName: string = '';

  constructor(private itemService: WareHouseItemService, private router: Router) {}

  ngOnInit(): void {
    this.ListItem();
  }

  ListItem() {
    this.itemService.LoadAll().subscribe({
      next: data => (this.ItemList = data),
      error: () =>
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'error happened',
          showConfirmButton: false,
          timer: 1500,
        }),
    });
  }

  Delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        this.itemService.Delete(id).subscribe({
          next: () => {
            this.ListItem();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your Item has been deleted.',
              icon: 'success',
            });
          },
          error: () =>
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'error happened',
              showConfirmButton: false,
              timer: 1500,
            }),
        });
      }
    });
  }

  Edit(id: number) {
    this.router.navigate(['/app/NewWareHouseItem'], { queryParams: { ItemId: id } });
  }

  SearchByName() {
    this.itemService.SearchName(this.searchName).subscribe({
      next: nameData => {
        this.ItemList = nameData;
        console.log('search successfully');
      },
      error: () =>
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'error happened',
          showConfirmButton: false,
          timer: 1500,
        }),
    });
  }
}
