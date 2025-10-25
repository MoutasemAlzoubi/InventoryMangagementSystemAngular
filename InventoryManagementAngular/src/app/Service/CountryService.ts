import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CountryDTO } from "../Model/CountryDTO";
import { Observable } from "rxjs";
@Injectable({providedIn:'root'})
export class CountryService{
    

    constructor(private httpClient:HttpClient){}

    Insert(country:CountryDTO):Observable<any>{

        return this.httpClient.post('http://localhost/InventoryManagementAPI/api/Country/Save',country)
    }

    LoadAll():Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/Country/LoadAll')
    }

    DeleteCountry(Id:number):Observable<any>{
        return this.httpClient.delete('http://localhost/InventoryManagementAPI/api/Country?Id='+Id)
    }
    Edit(Id:number):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/Country/Edit?CountryId='+Id)
    }
    SearchByNameOrCode(countryName:string):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/Country/Load?name='+countryName)
    }






Update(country:CountryDTO):Observable<any>{

        return this.httpClient.put('http://localhost/InventoryManagementAPI/api/Country',country)
    }


}