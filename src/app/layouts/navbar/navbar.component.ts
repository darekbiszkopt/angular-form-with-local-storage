import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './navbar.component.html',
  styles: ['.angular-logo { min-height: 40px; width: 100px;background-size: contain;background-repeat: no-repeat;background-image: url("../../../assets/image/angular_logo.png");}']
})
export class NavbarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  redirectTo() {
    window.open('https://github.com/darekbiszkopt/AngularLib', '_blank');
  }
}
