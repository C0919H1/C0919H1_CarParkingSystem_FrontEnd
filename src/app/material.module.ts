import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


import {
  MatProgressBarModule, MatProgressSpinnerModule, MatButtonModule,
  MatIconModule, MatTabsModule, MatInputModule, MatRippleModule,
  MatCardModule, MatCheckboxModule, MatSelectModule, MatSidenavModule, MatToolbarModule,
  MatMenuModule, MatSnackBarModule, MatTooltipModule, MatStepperModule, MatDialogModule,
  MatTableModule, MatSortModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule,
  MatListModule, MatGridListModule, MatAutocompleteModule,MatRadioModule
} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomerDeletedComponent } from './employee/components/customer-management/customer-deleted/customer-deleted.component';
import { DeleteManagementComponent } from './employee/components/ticket-management/delete-management/delete-management.component';
import { ExtensionManagementComponent } from './employee/components/ticket-management/extension-management/extension-management.component';
import { SellManagementComponent } from './employee/components/ticket-management/sell-management/sell-management.component'
import { VehiclePickedComponent } from './employee/components/ticket-management/vehicle-picked/vehicle-picked.component'
import { from } from 'rxjs';
import { ParkingPositionDetailComponent } from './employee/components/parking-position-management/parking-position-detail/parking-position-detail.component';


const MaterialModules = [
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatExpansionModule,
  MatTabsModule,
  MatIconModule, MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatStepperModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatListModule,
  MatGridListModule,
  MatAutocompleteModule, 
  FormsModule,
  ReactiveFormsModule,
  MatRadioModule
]
@NgModule({
  declarations: [],
  imports: [
    MaterialModules
  ],
  exports: [
    MaterialModules
  ], entryComponents: [
    CustomerDeletedComponent,
    DeleteManagementComponent,
    ExtensionManagementComponent,
    SellManagementComponent,
    VehiclePickedComponent,
    ParkingPositionDetailComponent
  ]
  
})
export class MaterialModule { }
