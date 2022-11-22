import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
      } , {
        path: 'seller',
        loadChildren: () => import('./seller/seller.module').then(module => module.SellerModule)
      }
    ])
  ]
})
export class EntityModule {
}
