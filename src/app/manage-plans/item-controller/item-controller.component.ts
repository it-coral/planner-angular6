import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-item-controller',
  templateUrl: './item-controller.component.html',
  styleUrls: ['./item-controller.component.css']
})
export class ItemControllerComponent implements OnInit {

  constructor() {

  }
    static buildItem(name: string, time: string) {
        return new FormGroup({
            activity: new FormControl(name),
            time: new FormControl(time)
        });
    }


  ngOnInit() {

  }



}
