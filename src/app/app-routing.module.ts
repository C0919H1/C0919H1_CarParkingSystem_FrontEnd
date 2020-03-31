import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material.module';
import { MatDialogModule, MatInputModule, MatDatepicker } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartsModule } from 'ng2-charts';


import { HeaderComponent } from './employee/layout/header/header.component';
import { FooterComponent } from './employee/layout/footer/footer.component';
import { MainComponent } from './employee/layout/main/main.component';
import { PageNotFoundComponent } from './employee/components/home-page/page-not-found/page-not-found.component';
import { HomePageComponent } from './employee/components/home-page/home-page/home-page.component';
import { LoginComponent } from './employee/loginn/login/login.component';
import { TicketManagementComponent } from './employee/components/ticket-management/ticket-management/ticket-management.component';
import { SellManagementComponent } from './employee/components/ticket-management/sell-management/sell-management.component';
import { ExtensionManagementComponent } from './employee/components/ticket-management/extension-management/extension-management.component';
import { DeleteManagementComponent } from './employee/components/ticket-management/delete-management/delete-management.component';
import { CustomerListComponent } from './employee/components/customer-management/customer-list/customer-list.component';
import { EmployeeListComponent } from '../app/employee/components/employee-management/employee-list/employee-list.component';
import { ForgotPasswordDialogComponent } from './employee/loginn/forgot-password-dialog/forgot-password-dialog.component';
import { LogoutDialogComponent } from './employee/layout/logout-dialog/logout-dialog.component';
import { VehicleListComponent } from './employee/components/vehicle-management/vehicle-list/vehicle-list.component';
import { CustomerDeletedComponent } from './employee/components/customer-management/customer-deleted/customer-deleted.component';
import { CustomerEditComponent } from './employee/components/customer-management/customer-edit/customer-edit.component';
import { TestLoginComponent } from './employee/loginn/test-login/test-login.component';
import { VehiclePickedComponent } from './employee/components/ticket-management/vehicle-picked/vehicle-picked.component';
import { TicketPickedComponent } from './employee/components/ticket-management/ticket-picked/ticket-picked.component';
import { MainManagementComponent } from './employee/components/money-management/main-management/main-management.component';
import { MainScreenComponent } from './employee/components/money-management/main-screen/main-screen.component';
import { CarStatisticComponent } from './employee/components/money-management/car-statistic/car-statistic.component';
import { RevenueStatisticComponent } from './employee/components/money-management/revenue-statistic/revenue-statistic.component';
import { ParkingPositionListComponent } from './employee/components/parking-position-management/parking-position-list/parking-position-list.component';
import { ParkingPositionDetailComponent } from './employee/components/parking-position-management/parking-position-detail/parking-position-detail.component';
import { CarStatisticDaysComponent } from './employee/components/money-management/car-statistic-days/car-statistic-days.component';
import { ParkingPositionEditComponent } from './employee/components/parking-position-management/parking-position-edit/parking-position-edit.component';


const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'car-management', component: PageNotFoundComponent },
      { path: 'home-page', component: HomePageComponent },
      { path: 'ticket-management', component: TicketManagementComponent },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'customer-list', component: CustomerListComponent },
     

      {
        path: 'money-management', component: MainManagementComponent, children: [
          { path: 'asd', component: MainScreenComponent },
          { path: '', component: MainScreenComponent },
          { path: 'month-management', component: CarStatisticComponent },
          { path: 'year-management', component: RevenueStatisticComponent },
          { path: 'day-management', component: CarStatisticDaysComponent },
        ]
      },

      { path: 'vehicle-list/:id', component: VehicleListComponent },
      { path: 'parking-position-list', component: ParkingPositionListComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'test-login', component: TestLoginComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    ChartsModule
  ],

  exports: [
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepicker,
    MaterialModule
  ],
  entryComponents: [ForgotPasswordDialogComponent, LogoutDialogComponent,ParkingPositionEditComponent],
  declarations: [HeaderComponent, FooterComponent, MainComponent, PageNotFoundComponent, HomePageComponent,ParkingPositionEditComponent, LoginComponent, TicketManagementComponent, SellManagementComponent, ExtensionManagementComponent, DeleteManagementComponent, EmployeeListComponent, ForgotPasswordDialogComponent, LogoutDialogComponent, CustomerListComponent, VehicleListComponent, CustomerDeletedComponent, CustomerEditComponent, TestLoginComponent, VehiclePickedComponent, TicketPickedComponent, MainManagementComponent, MainScreenComponent, CarStatisticComponent, RevenueStatisticComponent,ParkingPositionListComponent, ParkingPositionDetailComponent, CarStatisticDaysComponent]
})
export class AppRoutingModule { }
