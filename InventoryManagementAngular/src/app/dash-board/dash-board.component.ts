import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SignUp } from '../Model/SignUp';
import { UserService } from '../Service/UserService';
import { Router } from '@angular/router';

declare var initMenu: any; // إعلان عن الدالة الموجودة في script.js

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit, AfterViewInit {

  constructor(private router: Router,
              private userService: UserService) {}

  userName: string | null = '';
  role: string | null = '';

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.role = localStorage.getItem('role');
  }

  ngAfterViewInit(): void {
    // استدعاء initMenu بعد تحميل الـ DOM
    initMenu();
  }

  LogOut() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
