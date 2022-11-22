import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalService } from '../../../shared/services/local.service';
import { sellerList } from '../../../app.constants';
import { AddInvoiceModalComponent } from './components/add-invoice/add-invoice-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceModel } from './models/invoice.model';
import { InfoInvoiceModalComponent } from './components/info-invoice/info-invoice-modal.component';
import { Authorities } from '../../../shared/models/authorities';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AuthorityService } from '../../../shared/services/authority.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  filterList: InvoiceModel[] | undefined;
  invoiceList: InvoiceModel[] | undefined;
  filterControl = new FormControl();
  sellerList = sellerList;
  Authorities = Authorities;
  currentAuth = Authorities.ADMIN;

  constructor(private readonly spinner: NgxSpinnerService, private readonly cdRef: ChangeDetectorRef,
              private readonly localService: LocalService, private readonly modal: NgbModal,
              private readonly authorityService: AuthorityService) {
  }

  ngOnInit(): void {
    this.invoiceList = JSON.parse(this.localService.getData('invoiceList'));
    this.filterList = this.invoiceList;

    this.filterControl.valueChanges
      .pipe(
        debounceTime(500),
        untilDestroyed(this)
      )
      .subscribe(() => this.spinner.show().then(() => this.filterListner()));
  }

  isAvailable(auth: Authorities[]): boolean {
    return this.authorityService.hasRequiredAuthority(auth);
  }

  addInvoice(): void {
    this.openInvoiceModal();
  }


  editInvoice(invoice: InvoiceModel) {
    this.openInvoiceModal(invoice);

  }

  deleteInvoice(invoice: InvoiceModel): void {
    this.invoiceList = this.invoiceList?.filter((i) => i.invoiceNumber !== invoice.invoiceNumber);
    this.localService.saveData('invoiceList', JSON.stringify(this.invoiceList));
    this.filterListner();
    this.cdRef.detectChanges();
  }

  infoInvoice(invoice: InvoiceModel): void {
    InfoInvoiceModalComponent.open(this.modal, invoice);
  }

  private openInvoiceModal(invoice?: InvoiceModel): void {
    const modalRef = AddInvoiceModalComponent.open(this.modal, invoice);

    modalRef.closed
      .pipe(
        take(1),
        filter((x) => !!x)
      ).subscribe((res) => this.updateList(res, !!invoice));
  }

  private updateList(res: InvoiceModel, isEdited: boolean): void {
    console.log(res)
    if (isEdited) {
      this.invoiceList = this.invoiceList?.map((invoice) => invoice.invoiceNumber === res.invoiceNumber ? res : invoice);
    } else {
      this.invoiceList?.push(res);
    }
    this.localService.saveData('invoiceList', JSON.stringify(this.invoiceList));
    this.filterListner();
    this.cdRef.detectChanges();
  }

  private filterListner(): void {
    if (!this.filterControl.value) {
      this.filterList = this.invoiceList;
      this.cdRef.detectChanges();
      setTimeout(() => this.spinner.hide(), 500);
      return;
    }
    this.filterList = this.invoiceList?.filter((invoice) => invoice.seller.id === this.filterControl.value);
    this.cdRef.detectChanges();
    setTimeout(() => this.spinner.hide(), 500);
  }

  changeAuth($event: MatButtonToggleChange) {
    this.currentAuth = $event.value;
    this.authorityService.updateAuthority([$event.value]);
  }
}
