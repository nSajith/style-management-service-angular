import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { StyleDetails } from '../StyleDetails';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface StyleElement {
  selected: boolean;
  category: string;
  itemCode: string;
  consumption: string;
}




const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'}
];
@Component({
  selector: 'tablecomponent',
  templateUrl: './tablecomponent.component.html',
  styleUrls: ['./tablecomponent.component.css']
})
export class TablecomponentComponent {
  myForm: FormGroup;
  
  isCollapsed = false;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    // we will initialize our form here
    this.myForm = this.fb.group({
      times: this.fb.array([
        this.initTimes()
      ])
    });
  }
  toggleMenu(){
    this.isCollapsed = !this.isCollapsed;
  }


  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

  initTimes() {
    return this.fb.group({
      from: this.fb.control('', Validators.required),
      to: this.fb.control('', Validators.required),
      trackingId: this.generateUniqueId()
    });
  }

  generateUniqueId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  addGroup() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['times'];
    control.push(this.initTimes());
  }

  removeGroup(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['times'];
    control.removeAt(i);
  }

  onSubmit() {
    console.log('value: ', this.myForm.value);
    console.log('valid: ', this.myForm.valid);
  }

}
