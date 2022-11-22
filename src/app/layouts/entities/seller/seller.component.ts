import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { sellerList, SPINNER_TIMEOUT } from '../../../app.constants';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { debounceTime } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SellerModel } from '../home/models/seller.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './seller.component.html',
  styles: ['.footer { font-weight: bold;} span {font-weight: lighter;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SellerComponent implements OnInit {
  filterControl = new FormControl();
  sellerList = sellerList;
  choosenSeller?: SellerModel;
  edit = true;

  constructor(private readonly spinner: NgxSpinnerService, private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(SPINNER_TIMEOUT),
        untilDestroyed(this)
      )
      .subscribe((sellerId) => this.spinner.show().then(() => this.addInvoice(sellerId)));
  }

  changeReadable($event: MatButtonToggleChange): void {
    this.setDisabled($event.value);
  }

  addInvoice(sellerId: number): void {
    this.choosenSeller = this.sellerList.find((seller) => seller.id === sellerId);
    this.cdRef.detectChanges();
    setTimeout(() => this.spinner.hide(), SPINNER_TIMEOUT);
  }

  private setDisabled(edit: boolean): void {
    if (edit) {
      this.filterControl.enable();
    } else {
      this.filterControl.disable();
    }
  }
}
