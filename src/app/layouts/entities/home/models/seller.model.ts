import { AddressModel } from './address.model';

export interface SellerModel {
  id: number;
  firstName: string;
  surName: string;
  address: AddressModel;
}

