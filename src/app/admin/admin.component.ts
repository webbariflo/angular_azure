import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  employeearray:any[]=[];
  generalemployee:any[]=[];
  adminemployee:any[]=[];
  roles:string = '';
  constructor(private http:HttpClient,private route:Router){
   this.getallemployeedata();
  }
  getallemployeedata(){
   this.http.get<object[]>("http://3.25.133.235/admin1/").subscribe(
     (res:object[])=>{this.employeearray=res;
                      for(let i =0; i < this.employeearray.length;i++){
                          if(this.employeearray[i].roles == "General User")
                           {
                            this.generalemployee.push(this.employeearray[i]);
                           }
                          else if(this.employeearray[i].roles == "Admin")
                           {
                            this.adminemployee.push(this.employeearray[i])
                           }
                             
                         }
                      },
     (err)=>{console.log(err)}
   )
  }
  setupdate(data:any)
    {
    localStorage.setItem('email',data.email)
    this.route.navigate(['edit/']);
    }
  setdelete(data: any)
   {
    this.http.delete(`http://3.25.133.235/admin2/${data.email}`).subscribe((resultData: any)=>
      {
        console.log(resultData);
        prompt("Employee Deletedddd");
        this.getallemployeedata();
      });
   }
  profileview(data: any){
    localStorage.setItem('email',data.email);
    this.route.navigate(['profile']);
  }

}
