import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { navbarRoute } from './layouts/navbar/navbar.route';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      navbarRoute
    ], { enableTracing: false }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
