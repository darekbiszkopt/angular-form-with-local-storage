import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { InvoiceModel } from '../../models/invoice.model';

@Component({
  selector: 'ngc-info-invoice-modal',
  templateUrl: './info-invoice-modal.component.html',
  styles: ['div { font-weight: bold;} span {font-weight: lighter;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoInvoiceModalComponent implements OnInit {

  invoice!: InvoiceModel;

  constructor(private readonly activeModal: NgbActiveModal, private readonly fb: FormBuilder) {
  }

  static open(ngbModal: NgbModal, invoice: InvoiceModel): NgbModalRef {
    const modal = ngbModal.open(InfoInvoiceModalComponent,
      {
        backdrop: 'static',
        centered: true,
        keyboard: false
      });

    modal.componentInstance.invoice = invoice;

    return modal;
  }

  ngOnInit(): void {
  }


  dismiss() {
    this.activeModal.close();
  }

}
