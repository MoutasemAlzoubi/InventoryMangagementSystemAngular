import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CityDTO } from "../Model/CityDTO";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class CityService{
    constructor(private httpClient:HttpClient){}
    Insert(cityDTO:CityDTO):Observable<any>{
        return this.httpClient.post('http://localhost/InventoryManagementAPI/api/City',cityDTO)
    }
    LoadAll():Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/City/LoadAll')
    }
    Delete(Id:number):Observable<any>{
        return this.httpClient.delete('http://localhost/InventoryManagementAPI/api/City?Id='+Id)

    }
    Edit(Id:number):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/City/Load?Id='+Id)
    }

    Update(city:CityDTO):Observable<any>{
        return this.httpClient.put('http://localhost/InventoryManagementAPI/api/City',city)
    }



    LoadByName(cityName:string):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/City/LoadAllBySearch?Name='+cityName)
    }



}