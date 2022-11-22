import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { RouterModule } from '@angular/router';
import { SELLER_ROUTE } from './seller.route';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppModule } from '../../../app.module';
import { AddressPipe } from '../../../shared/pipes/address.pipe';

@NgModule({
  declarations: [
    SellerComponent,
    AddressPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([SELLER_ROUTE]),
    NgSelectModule,
    MatButtonToggleModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class SellerModule { }
