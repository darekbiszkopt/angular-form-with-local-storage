import { Route } from '@angular/router';
import { SellerComponent } from './seller.component';

export const SELLER_ROUTE: Route = {
  path: '',
  component: SellerComponent,
  data: {
    authorities: [],
    pageTitle: 'title.home'
  }
};
