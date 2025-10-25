import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignUp } from "../Model/SignUp";
import { Observable } from "rxjs";
import { SignIn } from "../Model/SignIn";

@Injectable({
    providedIn:"root"
})
export class UserService{

    constructor(private httpClient:HttpClient){}

    insert(newAccount:SignUp):Observable<any>{
        return this.httpClient.post('http://localhost/InventoryManagementAPI/api/Account/CreateAccount',newAccount)
    }

    LoadAllUsers():Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/Account/LoadAllUsers')
    }

    DeleteUser(id:string):Observable<any>{
        return this.httpClient.delete('http://localhost/InventoryManagementAPI/api/Account/DeleteUser?UserId='+id)
    }

    EditUser(id:string):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/Account/EditUser?UserId='+id)
    }

    UpdateUser(updatedUser:SignUp):Observable<any>{
        return this.httpClient.put('http://localhost/InventoryManagementAPI/api/Account/UpdateUser',updatedUser)
    }

    SearchByNameOfUser(name:string):Observable<any>{
        return this.httpClient.get('http://localhost/InventoryManagementAPI/api/Account/LoadAllByName?name='+name)
    }

    Login(login:SignIn):Observable<any>{
        return this.httpClient.post('http://localhost/InventoryManagementAPI/api/Account/LogIn',login)
    }

    
    logout() {
        localStorage.removeItem('angTocken');
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
    }
}
