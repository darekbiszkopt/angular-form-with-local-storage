import { Pipe, PipeTransform } from '@angular/core';
import { AddressModel } from '../../layouts/entities/home/models/address.model';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {
  transform = (value: AddressModel): string =>
    value ? `${ value.street ? value.street : '' } ${ value.houseNumber ? value.houseNumber : '' }
     , ${ value.postalCode } ${ value.city }` : '';
}
