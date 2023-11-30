import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  employeedata:any;
  receivedData:any;
  bodydata:any;
  constructor(private http:HttpClient,private route:Router){  }
  ngOnInit() {
      this.receivedData =localStorage.getItem('email');
      this.bodydata={'email':this.receivedData};
      this.fetchEmployeeData();
  }
  fetchEmployeeData() {
    this.http.post('http://3.25.133.235/profile/',this.bodydata).subscribe(
      (response) => {
        this.employeedata = response;
        console.log(this.employeedata);
      },
      (error) => {
        console.log('Error fetching employee data:', error);});
      }
  editdata(){
    this.route.navigate(['edit']);
  }
}
