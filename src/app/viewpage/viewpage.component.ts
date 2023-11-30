import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent implements OnInit{
  msg:any;
  body={
    'msg':'Hello'
   }
   receiveddata=localStorage.getItem('first');

   constructor(private http:HttpClient){}
   ngOnInit(): void {
    this.http.post("http://3.25.133.235/email1/",this.body).subscribe(
      (res:any) => {this.msg=res},
      err => {console.log(err)}
    )
  }

}
