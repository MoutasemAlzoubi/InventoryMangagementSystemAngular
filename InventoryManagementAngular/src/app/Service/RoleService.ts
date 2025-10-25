import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RoleModel } from "../Model/RoleModel";

@Injectable({providedIn:'root'})
export class RoleService{
    constructor(private httpClient: HttpClient){}

    Insert(newRole:RoleModel):Observable<any>{
        return this.httpClient.post('http://localhost/InventoryManagementAPI/api/Account/AddRole',newRole)
    }
    GetRoles():Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/Account/RoleList')

    }

    Delete(id:string):Observable<any>{
        return this.httpClient.delete('http://localhost/InventoryManagementAPI/api/Account/DeleteRole?RoleId='+id)
    }

    Edit(id:string):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/Account/EditRole?RoleId='+id)

    }

    UpdateRole(upRole:RoleModel):Observable<any>{
        return this.httpClient.put('http://localhost/InventoryManagementAPI/api/Account/UpdateRole',upRole)
    }

    SearchByName(name:string):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/Account/SearchRoleByName?Name='+name)
    }


}