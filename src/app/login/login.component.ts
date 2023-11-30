import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router)
              {
              this.loginForm=this.formBuilder.group({
                 email:['', [Validators.required,Validators.email]],
                 password:['', Validators.required]});
               }
   authentication(){
     this.http.post("http://3.25.133.235/login/",this.loginForm.value).subscribe(
       (res)=>{if(res == "Invalid Password For General User")
                {alert("Invalid Password")}
               else if(res == "Login Successful For General User")
                 {
                  localStorage.setItem('email',this.loginForm.value.email);
                  this.router.navigate(['profile/']);
                 }
               else if(res == 'Invalid Password For Admin')
                  {
                   alert("Invalid Password For Admin")
                  }
               else if(res == 'Login Successful For Admin')
                  {
                    localStorage.setItem('email',this.loginForm.value.email);
                   this.router.navigate(['admin/'])
                  }
               else if(res == "Invalid Credentials")
                {alert("Employee Doesn`t Exist. Please Register First");
                 this.router.navigate(['register/'])}
               },
       (err)=>{console.log(err)},
     )
   }
   get email(){
     return this.loginForm.get('email');
   } 
   get pas(){
     return this.loginForm.get('password');
   } 

}
