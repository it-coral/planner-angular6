import { Component, OnInit } from '@angular/core';
import {ItemControllerComponent} from "../item-controller/item-controller.component";
import {FormBuilder, FormArray} from "@angular/forms";

@Component({
  selector: 'app-item-array',
  templateUrl: './item-array.component.html',
  styleUrls: ['./item-array.component.css']
})
export class ItemArrayComponent implements OnInit {

  constructor() { }

    static buildItems( services) {
        let ar = new FormArray([]);
        services.forEach(service => {
            ar.push(  ItemControllerComponent.buildItem(service.name, service.time));
        })
        return ar;
    }



  ngOnInit() {
  }

}
