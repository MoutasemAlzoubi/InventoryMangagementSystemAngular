import { Component, OnInit } from '@angular/core';
import { SignUp } from '../Model/SignUp';
import { UserService } from '../Service/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit{
  constructor(private router:Router,
              private userService:UserService
  ){}
  userName: string | null = '';
  role: string | null = '';
   ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.role = localStorage.getItem('role');
  }



  LogOut(){
    this.userService.logout();
    this.router.navigate([''])
  }



  

  
    

  }

