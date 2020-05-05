import { Component, OnInit } from '@angular/core';
import { baseUrl } from '../globals';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  
  formGroupFilter: FormGroup;
  users : any =[];
  cheak : boolean = false;
  district : any = [];
  group : any = [];
  msg;

  constructor(private _http: HttpClient) { }

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


}
