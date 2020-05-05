import { Component, OnInit } from '@angular/core';
import { baseUrl } from '../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formGroupFilter: FormGroup;
  users : any =[];
  cheak : boolean = true;
  district : any = [];
  group : any = [];
  msg;
  username;


  constructor(private _router: Router,private _http: HttpClient) { 
    this._http.get(baseUrl+'username',{
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
    .subscribe(
      data => this.username= data.toString(),
      error => this._router.navigate(['/login'])
    )
  }

  ngOnInit(): void {
    this.formGroupFilter = new FormGroup({
      blood_Group: new FormControl('', [
        Validators.required
        
      ]),
      district: new FormControl('', [
        Validators.required
        
      ])
    });

    this.getDistrict();
    this.getBloodGroup();
    this.getData();
  }

  getDistrict(){
    this._http.get(baseUrl+'district')
      .subscribe(data =>{
        this.district = data;
        console.log(this.district)
      })
  }

  getBloodGroup(){
    this._http.get(baseUrl+'group')
      .subscribe(data =>{
        this.group = data;
        console.log(this.group)
      })
  }

  getData(){
    this._http.get(baseUrl+'getData')
      .subscribe(data =>{
        this.users = data;
      })
  }

  onSubmitSearch(){
    console.log(this.formGroupFilter.value)
    if (this.formGroupFilter.valid){
      this._http.post(baseUrl+'getUsers',this.formGroupFilter.value)
      .subscribe(data =>{
          this.users = data;
          if (this.users[0] == undefined){
            this.msg = "No Data Found"
            this.cheak = false;
          }
          else{
            this.cheak = true;
          console.log(this.users[0]);
          this.msg = null;
          }
      })
    }
  }

  dataDelete(id,i){
    var r = confirm("Are you really want to delete this comment??");
    if (r == true) {
    this._http.post(baseUrl +'user-delete', {
      _id : id
    })
      .subscribe(data => {
        this.getData();
      });
    }

  }

  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }


}
