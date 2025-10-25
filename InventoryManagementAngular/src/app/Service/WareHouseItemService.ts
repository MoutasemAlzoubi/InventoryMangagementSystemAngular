import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WareHouseItemDTO } from "../Model/WareHouseItemDTO";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class WareHouseItemService{
    constructor(private httpClient:HttpClient){}

    Insert(newItem:WareHouseItemDTO):Observable<any>{
        return this.httpClient.post('http://localhost/InventoryManagementAPI/api/WareHouseItem',newItem)
    }


    LoadAll():Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/WareHouseItem/LoadAll')
    }


    Delete(id:number):Observable<any>{
        return this.httpClient.delete('http://localhost/InventoryManagementAPI/api/WareHouseItem?ItemId='+id)

    }

    Edit(id:number):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/WareHouseItem/Load?ItemId='+id)

    }


    Update(updatedItem:WareHouseItemDTO):Observable<any>{
        return this.httpClient.put('http://localhost/InventoryManagementAPI/api/WareHouseItem',updatedItem)
    }


    SearchName(name:string):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/WareHouseItem/LoadAllByName?name='+name)

    }
}