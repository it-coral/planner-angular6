import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PlannerComponent } from './planner/planner.component';
import { CreatePlanComponent } from './manage-plans/create-plan/create-plan.component';
import { AddDaysComponent } from './manage-plans/add-days/add-days.component';
import {RouterModule} from "@angular/router";
import {MatInputModule} from '@angular/material/input';
import {MyDatePickerModule} from "mydatepicker";
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from "@angular/forms";
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {Routes} from "@angular/router";
import { ItemControllerComponent } from './manage-plans/item-controller/item-controller.component';
import { ItemArrayComponent } from './manage-plans/item-array/item-array.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "./data.service";
import { PlansListComponent } from './planner/plans-list/plans-list.component';
import { PlanDetailComponent } from './planner/plan-detail/plan-detail.component';
import {MatCardModule} from "@angular/material";
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import {UserService} from "./user.service";
import { HomeComponent } from './home/home.component';
import {AuthActivateRouteGuard, NotAuthActivateRouteGuard} from "./authenticated.guard";
import { MyPlansComponent } from './my-plans/my-plans.component';

const routes : Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthActivateRouteGuard]},
    {path: 'signin', component: SigninComponent, canActivate: [ NotAuthActivateRouteGuard]},
    {path: 'signup', component: SignupComponent, canActivate: [ NotAuthActivateRouteGuard]},
    {path:'create', component: CreatePlanComponent, canActivate: [AuthActivateRouteGuard]},
    {path:'plans', component: PlannerComponent,  canActivate: [AuthActivateRouteGuard],
    children: [
        {path: 'list', component:PlansListComponent},
        {path: 'plan-detail/:id', component:PlanDetailComponent},
        {path: 'my-plans', component:MyPlansComponent}
    ]}
]

@NgModule({
  declarations: [
    AppComponent,
    PlannerComponent,
    CreatePlanComponent,
    AddDaysComponent,
    ItemControllerComponent,
    ItemArrayComponent,
    PlansListComponent,
    PlanDetailComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    MyPlansComponent
  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes),
      MatInputModule,
      ReactiveFormsModule,
      MyDatePickerModule,
      MatStepperModule,
      MatButtonModule,
      MatTableModule,
      MatToolbarModule,
      AmazingTimePickerModule,
      HttpClientModule,
      MatCardModule
  ],
  providers: [DataService, UserService,AuthActivateRouteGuard, NotAuthActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
