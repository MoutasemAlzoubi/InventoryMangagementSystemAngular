import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WareHouseDTO } from "../Model/WareHouseDTO";

@Injectable({providedIn:'root'})
export class WareHouseService{
    constructor(private httpClient:HttpClient){

    }


    Insert(ware:WareHouseDTO):Observable<any>{
        return this.httpClient.post('http://localhost/InventoryManagementAPI/api/WareHouse',ware)
    }




    LoadAll():Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/WareHouse/LoadAll')
    }



    Delete(id:number):Observable<any>{
        return this.httpClient.delete('http://localhost/InventoryManagementAPI/api/WareHouse?WareHouseId='+id)
    }


    Edit(Id:number):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/WareHouse/Load?WareHouseId='+Id)
    }


    Update(house:WareHouseDTO):Observable<any>{
        return this.httpClient.put('http://localhost/InventoryManagementAPI/api/WareHouse',house)
    }

    SearchByName(name:string):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/WareHouse/LoadAllByName?name='+name)

    }

    

    
}