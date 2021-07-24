import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { StyleServiceService } from '../services/style-service.service';
import { Style } from '../style';
import { StyleDetails } from '../StyleDetails';

@Component({
  selector: 'formcomponent',
  templateUrl: './formcomponent.component.html',
  styleUrls: ['./formcomponent.component.css'],
  providers:[StyleServiceService]
})
export class FormcomponentComponent implements OnInit  {
  

  constructor(private styleServiceService:StyleServiceService,private fb: FormBuilder){
    
  }
  ngOnInit() {
    this.getStyleDetailsElement();
    this.myForm = this.fb.group({
      style: this.fb.array([
        this.initTimes()
      ])
    });
    this.getCategories()
  }


  model:any;
  modifyActionForm = new FormGroup({
    styleCode : new FormControl(),
    status: new FormControl(),
    styleType: new FormControl(),
    styleName: new FormControl(),
    styleQuantity:new FormControl()
    // And that ⬆ for each input in your form
  })



  addElement(){
  // this.model = new Style(18,
  //    this.modifyActionForm.get('styleNo').value,
  //    this.modifyActionForm.get('styleStatus').value,
  //    this.modifyActionForm.get('styleType').value,
  //    this.modifyActionForm.get('styleName').value,
  //    this.modifyActionForm.get('styleQty').value);
  //   this.styleServiceService.createStyle(this.model).subscribe(result => {
  //     console.log(result);
  //   });
  }

      getStyleDetailsElement(){
        this.styleServiceService.getStyleDetails(1).subscribe(result => {
          console.log(result);
        });
      }

      myForm: FormGroup;
    
  
      isCollapsed = false;
      toggleMenu(){
        this.isCollapsed = !this.isCollapsed;
      }
    
    
      trackByFn(index: number, item: any) {
        return item.trackingId;
      }
    
      initTimes() {
        return this.fb.group({
          itemCode: this.fb.control('', Validators.required),
          itemCategory: {"id":this.fb.control('', Validators.required).value}
        });
      }
    
      generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
    
      addGroup() {
        // add address to the list
        const control = <FormArray>this.myForm.controls['style'];
        control.push(this.initTimes());
      }
    
      removeGroup(i: number) {
        // remove address from the list
        const control = <FormArray>this.myForm.controls['style'];
        control.removeAt(i);
      }
    
      onSubmit() {
        // console.log(this.myForm.value)
        // this.styleServiceService.createStyle(this.myForm.value).subscribe(result => {
        //   console.log(result);
        //   this.createStyleDetails(result);

        // });

        // console.log('value: ', this.myForm.value);
        // console.log('valid: ', this.myForm.valid);
        this.model = new Style(
          this.modifyActionForm.get('styleCode').value,
          this.modifyActionForm.get('status').value,
          this.modifyActionForm.get('styleType').value,
          this.modifyActionForm.get('styleName').value,
          this.modifyActionForm.get('styleQuantity').value);
         this.styleServiceService.createStyle(this.model).subscribe(result => {
           console.log("result", result);
           this.createStyleDetails(result);


         });
      }


      styleDetials: StyleDetails;
      styleDetialsList: StyleDetails[] = [];
      createStyleDetails(result) {
         console.log(this.myForm.value)
         this.styleDetials = this.myForm.value.style.forEach((element: { itemCategory: Number; itemCode: String; }) => {
          //  console.log(element.itemCategory);

           this.styleDetials = new StyleDetails(element.itemCode, {id: element.itemCategory});
          //  console.log(this.styleDetials);

           this.styleDetialsList.push(this.styleDetials);
         });
        this.styleServiceService.createStyleDetails(this.styleDetialsList, result)
        .subscribe(result => {
          console.log("cdddddddddddd", result);    
          // this.myForm = this.fb.group({
          //   style: this.fb.array([
          //     this.initTimes()
          //   ])
          // });  
          this.clearData();
          alert('Record Created Successfully!');

        });
      }
      public clearData(){
          this.myForm.reset();
          this.modifyActionForm.reset();
          this.styleDetials = null
          this.styleDetialsList = [];
      }

      categoryArray : any;
      getCategories(){
        this.styleServiceService.getCategories().subscribe(result=>{
          console.log(result)
          this.categoryArray = result;
        })
      }

      item: any;
      getItemByCategoryId(id){
        this.styleServiceService.getItemByCategoryId(id).subscribe(result=>{
          console.log(result)
          this.item = result;
        })
      }


  

}
