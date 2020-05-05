import { Component, OnInit } from '@angular/core';
import { baseUrl } from '../globals';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  formGroupAdd: FormGroup;
  formGroupUpdate: FormGroup;
  district : any = [];
  group : any = [];
  user : any = [];
  cheak : boolean = false;
  msg;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.formGroupAdd = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.required
        
      ]),
      DOB: new FormControl('', [
        Validators.required
        
      ]),
      blood_Group: new FormControl('0', [
        Validators.required
        
      ]),
      district: new FormControl('0', [
        Validators.required
      ]),
      gender: new FormControl('0', [
        Validators.required
      ])
    });
    this.formGroupUpdate = new FormGroup({
      phone: new FormControl('', [
        Validators.required
      ]),
      blood_Group: new FormControl('0', [
        Validators.required
        
      ]),
      DOB: new FormControl('', [
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

  onSubmitadd(){
    console.log(this.formGroupAdd.value)
    if (this.formGroupAdd.valid){
      this._http.post(baseUrl+'addData',this.formGroupAdd.value)
      .subscribe(data =>{
        if (data[0].msg == 1){
          this.formGroupAdd.reset();
        }
      })
    }
  }

  onSubmitFilter(){
    console.log(this.formGroupUpdate.value)
    if (this.formGroupUpdate.valid){
      this._http.post(baseUrl+'getUser',this.formGroupUpdate.value)
      .subscribe(data =>{
          this.formGroupUpdate.reset({blood_Group:"0"});
          this.user = data;
          if (this.user == undefined){
            this.msg = "Doner Not Found"
            this.cheak = false;
          }else{
            this.cheak = true;
            this.msg = null;
            this.formGroupAdd.get('name').setValue(this.user.name);
            this.formGroupAdd.get('phone').setValue(this.user.phone);
            this.formGroupAdd.get('DOB').setValue(this.user.DOB);
            this.formGroupAdd.get('gender').setValue(this.user.gender);
            this.formGroupAdd.get('blood_Group').setValue(this.user.blood_group);
            this.formGroupAdd.get('district').setValue(this.user.district);
            this.formGroupAdd.get('address').setValue(this.user.address);
          }
      })
    }
  }

  onSubmitUpdate(){
    console.log(this.formGroupAdd.value)
    if (this.formGroupAdd.valid){
      this._http.post(baseUrl+'updateData/' + this.user._id,this.formGroupAdd.value)
      .subscribe(data =>{
        if (data[0].msg == 1){
          alert("User updated");
          this.formGroupAdd.reset();
          this.user = null;
          this.cheak = false;
        }
      })
    } 
  }

}
