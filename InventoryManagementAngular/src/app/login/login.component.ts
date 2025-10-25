import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn } from '../Model/SignIn';
import { UserService } from '../Service/UserService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword = false;
  invalidPass:boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      txtUserName: ['', Validators.required],
      txtPassword: ['', Validators.required]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  inva(){
            this.invalidPass = false;
          }


  LogIn(): void {
    if (this.loginForm.valid) {
      const signIn = new SignIn();
      signIn.userName = this.loginForm.value['txtUserName'];
      signIn.password = this.loginForm.value['txtPassword'];

      this.userService.Login(signIn).subscribe({
        next: data => {
          console.log(data.token)
          
          localStorage.setItem('angToken', data.token);
          localStorage.setItem('userName', data.name);
          localStorage.setItem('role', data.roles);

          this.router.navigate(['/app/DashBoard']);
        },
        error: () => {
          // Swal.fire({
          //   position: "top-end",
          //   icon: "error",
          //   title: "Error happened",
          //   showConfirmButton: false,
          //   timer: 1500
          // });

          this.invalidPass = true;
          
          setTimeout(()=> this.inva(),3000)
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
