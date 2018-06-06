import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray} from "@angular/forms";
import {IMyDpOptions} from 'mydatepicker';
import {NgZone} from "@angular/core";
import {ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatHorizontalStepper} from "@angular/material";
import {DataService} from "../../data.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {
    @ViewChild(MatHorizontalStepper) stepper;
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    diffDays;
    mainForm: FormGroup;
    day = 1;
    currentDay = 0;
    selectedDay = 0;
    result;
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd'
    };
    weather;

    show = false;

    public model: any = { date: { year: 2018, month: 10, day: 9 } };

    constructor(private _formBuilder: FormBuilder, private zone : NgZone,  private http: HttpClient, private dataSrv: DataService, private userSrv:UserService ) {


    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
                  firstCtrl: [''],
                  title: ['', Validators.required],
                  from: ['', Validators.required],
                  to: ['', Validators.required],
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['']
        });

        this.mainForm = this._formBuilder.group({
            location: [],
            from: [],
            to: [],
            user_id: [],
            days: this._formBuilder.array([])
        });


        this.stepper.selectionChange.subscribe(value => {
            if ( value.selectedIndex === 1) {

                this.show = true;

                this.dataSrv.getWeather( this.firstFormGroup.controls['title'].value).subscribe(value => {
                    this.weather = JSON.parse(value['body']);
                    console.log(value);
                })

                this.mainForm.controls['location'].setValue(this.firstFormGroup.controls['title'].value);
                this.mainForm.controls['from'].setValue(this.firstFormGroup.controls['from'].value.formatted);
                this.mainForm.controls['to'].setValue(this.firstFormGroup.controls['to'].value.formatted);
                this.mainForm.controls['user_id'].setValue(this.userSrv.user().id);
                this.diffDays = this.amountOfDays();
            }
        })

            this.mainForm.valueChanges.subscribe(value =>{
                this.result = value;
            })
    }


    post() {
        let formObj =  this.mainForm.getRawValue();
            this.dataSrv.savePost(formObj).subscribe(
                data =>{
                    this.currentDay = 0;
                    this.clearFormArray((this.mainForm.controls['days'] as FormArray));
                    this.mainForm.reset();
                    this.firstFormGroup.reset();
                    this.stepper.selectedIndex = 0;
                    console.log("success!", data)
                } ,
                error => console.error("couldn't post because", error)
            );
    }

    deleteActivity(index : number) {
        (((this.mainForm.controls['days'] as FormArray).controls[this.currentDay - 1] as FormGroup).controls['activities'] as FormArray).removeAt(index);
    }


    selectDay(number: number) {
            this.currentDay = number;
    }

    logger(value){
        console.log(value);
    }

    addDay() {
        if( this.currentDay === 0) {
            this.day = 0;
            this.currentDay++;
        }
        (this.mainForm.controls['days'] as FormArray).push(this.createDay(this.day++ +1));
        this.currentDay = (this.mainForm.controls['days'] as FormArray).length;

    }

    clearFormArray (formArray: FormArray){
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    getCurrrentDayActivity() {
        let arr = (((this.mainForm.controls['days'] as FormArray).controls[this.currentDay - 1] as FormGroup).controls['activities'] as FormArray);
        arr.push(this.createActivity('222','23:33'));
           return arr;

    }

    addActivity() {
        (((this.mainForm.controls['days'] as FormArray).controls[this.currentDay - 1] as FormGroup).controls['activities'] as FormArray)
            .push(this.createActivity('',''));
    }

    current() {
        return (((this.mainForm.controls['days'] as FormArray).controls[this.currentDay - 1] as FormGroup).controls['activities'] as FormArray).controls;
    }

    createDay(number: number): FormGroup {
        return this._formBuilder.group({
            day: number,
            activities: this._formBuilder.array([])
        });
    }
    createActivity(_name: string, _time: string): FormGroup {
        return this._formBuilder.group({
            name: [_name],
            time: [_time]
        })
    }


    amountOfDays(){
        let oneDay = 24*60*60*1000;
        let firstDate = new Date(this.controlValue('from','year'),
                                 this.controlValue('from','month'),
                                 this.controlValue('from','day'));
        let secondDate = new Date(this.controlValue('to','year'),
                                  this.controlValue('to','month'),
                                  this.controlValue('to','day'));
        let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays;
    }

    controlValue(name, value){
        return this.firstFormGroup.controls[name].value.date[value];
    }

}
