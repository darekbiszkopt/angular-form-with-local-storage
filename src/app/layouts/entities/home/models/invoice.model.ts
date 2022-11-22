import { SellerModel } from './seller.model';

export interface InvoiceModel {
  date: string;
  invoiceNumber: number;
  seller: SellerModel;
  amount: number;
}

