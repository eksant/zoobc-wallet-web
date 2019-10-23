import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { LanguageService } from 'src/app/services/language.service';
import { LANGUAGES, AppService } from 'src/app/app.service';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { AddNodeAdminComponent } from 'src/app/pages/add-node-admin/add-node-admin.component';
import { AuthService, SavedAccount } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { onCopyText, generateEncKey } from 'src/helpers/utils';
import * as CryptoJS from 'crypto-js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  @ViewChild('revealPhrase') revealPassphrase: TemplateRef<any>;
  revealPassphraseDialog: MatDialogRef<any>;

  formConfirmPin: FormGroup;
  pinField = new FormControl('', Validators.required);
  isConfirmPinLoading = false;
  pinValid: boolean = false;
  private phrase: string;

  languages = [];
  activeLanguage = 'en';

  isLoggedIn: boolean = false;

  account: SavedAccount;
  node: string = '';

  routerEvent: Subscription;

  constructor(
    private langServ: LanguageService,
    private authServ: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private appServ: AppService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.isLoggedIn = this.authServ.currSeed ? true : false;

    this.routerEvent = this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.account = authServ.getCurrAccount();
        this.node = this.account ? this.account.nodeIP : null;
      }
    });
  }

  ngOnInit() {
    this.languages = LANGUAGES;
    this.activeLanguage = localStorage.getItem('SELECTED_LANGUAGE') || 'en';
    this.formConfirmPin = new FormGroup({
      pin: this.pinField,
    });
  }

  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }

  onToggle() {
    this.appServ.toggle();
  }

  selectActiveLanguage(lang) {
    this.langServ.setLanguage(lang);
    this.activeLanguage = lang;
  }

  onOpenAddNodeAdmin() {
    this.dialog.open(AddNodeAdminComponent, {
      width: '360px',
    });
  }

  onOpenRevealPassphrase() {
    this.revealPassphraseDialog = this.dialog.open(this.revealPassphrase, {
      width: '420px',
    });
  }

  async onLogout() {
    let message: string;
    await this.translate
      .get('Are you sure want to logout?')
      .toPromise()
      .then(res => (message = res));

    Swal.fire({
      title: message,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        this.authServ.currSeed = null;

        this.router.navigateByUrl('/');
        return true;
      },
    });
  }

  onSubmitPin() {
    if (this.pinField.valid) {
      this.isConfirmPinLoading = true;

      setTimeout(() => {
        const key = generateEncKey(this.pinField.value);
        const encSeed = localStorage.getItem('ENC_PASSPHRASE_SEED');
        const isPinValid = this.authServ.isPinValid(encSeed, key);
        if (isPinValid) {
          this.pinValid = true;
          const seed = CryptoJS.AES.decrypt(encSeed, key).toString(
            CryptoJS.enc.Utf8
          );
          this.phrase = seed;
        } else {
          this.formConfirmPin.setErrors({ invalid: true });
        }
        this.isConfirmPinLoading = false;
      }, 50);
    }
  }

  closeDialog() {
    this.formConfirmPin.reset();
    this.phrase = undefined;
    this.pinValid = false;
    this.revealPassphraseDialog.close();
  }

  async copyPhrase() {
    onCopyText(this.phrase);

    let message: string;
    await this.translate
      .get('Passphrase Copied')
      .toPromise()
      .then(res => (message = res));
    this.snackBar.open(message, null, { duration: 3000 });
  }
}
