import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  profile1:File | null=null;
  aadhar1:File | null=null;
  receivedData: any;
  employeedata: any;
  public data:any;
  data1:any;
  bodydata:any;
  first:string="";
  last:string="";
  gender:string="";
  mobno?: number;
  address:string="";
  aadharno:string="";
  dob: string='';
  department:string="";
  designation:string="";
  constructor(
    private http: HttpClient,
    private route:Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.data=localStorage.getItem('email');
    this.data1={
      'email':this.data,
    }
    console.log(this.data);
    this.http.post("http://3.25.133.235/edit/",this.data1).subscribe(
      (res)=>{this.employeedata=res}
    )
  }

  uploadphoto(event: any) {
    this.profile1 = event.target.files[0];
  }

  uploadaadhar(event: any) {
    this.aadhar1 = event.target.files[0];
  }
 
  uploaddoc(){
      const formattedDate = this.datepipe.transform(this.dob, 'yyyy-MM-dd');
      let datatosend=new FormData();
      datatosend.append('FirstName',this.first);
      datatosend.append("LastName",this.last);
      datatosend.append("Gender",this.gender);
      datatosend.append("address",this.address);
      datatosend.append("Department",this.department);
      datatosend.append("Designation",this.designation);
      datatosend.append("AadharNumber",this.aadharno);
      if (this.mobno != undefined) {
        datatosend.append("Mobno", this.mobno.toString());
      }
      if(formattedDate != null){
          datatosend.append("DOB",formattedDate);
      }
      datatosend.append("ProfileImage",this.profile1 as Blob);
      datatosend.append("AadharImage",this.aadhar1 as Blob);
      this.http.put(`http://3.25.133.235/edit1/${this.data}`,datatosend).subscribe(
          (res)=>{console.log(res);
                this.route.navigate(['profile'])},
          (err)=>{console.log(err)}
    ) 
  }
}
