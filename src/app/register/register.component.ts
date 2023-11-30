import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  myForm: FormGroup;

  constructor(private http:HttpClient,
              private formBuilder:FormBuilder,private route:Router){
  this.myForm=this.formBuilder.group({
                FirstName:['', Validators.required],
                LastName:['', Validators.required],
                email:['', [Validators.required,Validators.email]],
                Mobno:['', Validators.required],
            }
            );
          
          }
  
  submitForm(){
     localStorage.setItem('first',this.myForm.value.FirstName)
     this.http.post("http://3.25.133.235/email/",this.myForm.value).subscribe(
      (res)=>{alert(res),
               this.route.navigate(['view/'])},
      (err)=>{alert("Something Went Wrong")}
     )
  }
  get First(){
    return this.myForm.get('FirstName');
  }  
  get Last(){
    return this.myForm.get('LastName');
  } 
  get email(){
    return this.myForm.get('email');
  } 
  get Mob(){
    return this.myForm.get('Mobno');
  } 

  }
