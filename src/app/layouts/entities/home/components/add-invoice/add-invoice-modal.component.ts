import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { sellerList } from '../../../../../app.constants';
import { InvoiceModel } from '../../models/invoice.model';
import { SellerModel } from '../../models/seller.model';

@Component({
  selector: 'ngc-add-invoice-modal',
  templateUrl: './add-invoice-modal.component.html',
  styleUrls: ['./add-invoice-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddInvoiceModalComponent implements OnInit {
  invoice?: InvoiceModel;
  invoiceForm!: FormGroup;
  sellerList = sellerList;

  constructor(private readonly activeModal: NgbActiveModal, private readonly fb: FormBuilder) {
  }

  static open(ngbModal: NgbModal, invoice?: InvoiceModel): NgbModalRef {
    const modal = ngbModal.open(AddInvoiceModalComponent,
      {
        backdrop: 'static',
        centered: true,
        keyboard: false
      });

    modal.componentInstance.invoice = invoice;

    return modal;
  }

  get sellerControl(): FormControl {
    return this.invoiceForm.get('seller') as FormControl;
  }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      date: [this.invoice?.date || null, [Validators.required]],
      invoiceNumber: [this.invoice?.invoiceNumber || null, [Validators.required]],
      seller: [this.invoice?.seller.id || null, [Validators.required]],
      amount: [this.invoice?.amount || null, [Validators.required]]
    });
  }

  dismiss() {
    this.activeModal.close();
  }

  save() {
    const invoiceModel: InvoiceModel = {
      ...this.invoiceForm.value,
      seller: this.findSellerById()
    };
    this.activeModal.close(invoiceModel);
  }

  private findSellerById(): SellerModel | undefined {
    return this.sellerList.find((s) => s.id === +this.sellerControl.value);
  }
}
