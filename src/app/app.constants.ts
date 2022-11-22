import { environment } from '../environments/environment';
import { AddressModel } from './layouts/entities/home/models/address.model';
import { SellerModel } from './layouts/entities/home/models/seller.model';
import { InvoiceModel } from './layouts/entities/home/models/invoice.model';
import { Authorities } from './shared/models/authorities';

export const ANGULAR_MAT_DATE_FORMATS = {
  parse: {
    dateInput: 'L'
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

export const SPINNER_TIMEOUT = 500;
export const VERSION = environment.VERSION;
export const SERVER_API_URL = environment.SERVER_API_URL;


export const address1: AddressModel = {
  postalCode: '03-733',
  city: 'Warszawa',
  street: 'Słowackiego',
  houseNumber: 153
};

export const seller1: SellerModel = { id: 1, firstName: 'Dariusz', surName: 'Dajcz', address: address1 };
export const seller2: SellerModel = { id: 2, firstName: 'Robert', surName: 'Lewandowski', address: address1 };
export const seller3: SellerModel = { id: 3, firstName: 'Cristiano', surName: 'Ronaldo', address: address1 };
export const seller4: SellerModel = { id: 4, firstName: 'Arkadiusz', surName: 'Milik', address: address1 };

export const sellerList: SellerModel[] = [seller1, seller2, seller3, seller4];

export const INVOICE_LIST: InvoiceModel[] = [
  { date: '2022-11-18', invoiceNumber: 12333223444, seller: seller1, amount: 25000 },
  { date: '2022-11-12', invoiceNumber: 155321453531, seller: seller1, amount: 35000 },
  { date: '2022-10-18', invoiceNumber: 25532434423, seller: seller2, amount: 45000 },
  { date: '2022-09-18', invoiceNumber: 24212442224, seller: seller2, amount: 55000 },
  { date: '2021-11-18', invoiceNumber: 24245252424, seller: seller3, amount: 54000 },
  { date: '2021-11-04', invoiceNumber: 24224444424, seller: seller3, amount: 35000 },
  { date: '2020-04-18', invoiceNumber: 24244424424, seller: seller4, amount: 155000 },
  { date: '2020-02-18', invoiceNumber: 24225554424, seller: seller4, amount: 57600 }
];

export const AUTHORITIES: Authorities[] = [Authorities.ADMIN];

