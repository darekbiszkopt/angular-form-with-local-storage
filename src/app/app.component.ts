import {
  ChangeDetectionStrategy,
  Component, ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgxSpinnerService } from 'ngx-spinner';
import { AUTHORITIES, INVOICE_LIST, SPINNER_TIMEOUT } from './app.constants';
import { Router } from '@angular/router';
import { LocalService } from './shared/services/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  opened = false;

  constructor(private readonly spinner: NgxSpinnerService,
              private readonly router: Router, private readonly localService: LocalService) {
  }

  ngOnInit(): void {
    this.spinner.show().then(() => setTimeout(() => {
      this.localService.saveData('invoiceList', JSON.stringify(INVOICE_LIST));
      this.localService.saveData('authentication', JSON.stringify(AUTHORITIES));

      this.spinner.hide();
    }, SPINNER_TIMEOUT));
  }


  toggleSideNav() {
    this.opened = !this.opened;
  }


  redirectTo(pathRedirectTo: string) {
    this.router.navigate([pathRedirectTo]).then(() => this.opened = false);
  }
}
