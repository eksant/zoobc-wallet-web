import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PinSetupDialogComponent } from 'src/app/components/pin-setup-dialog/pin-setup-dialog.component';
import { AuthService, SavedAccount } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { MnemonicsService } from 'src/app/services/mnemonics.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import zoobc, { ZooKeyring, getZBCAdress } from 'zoobc-sdk';

@Component({
  selector: 'app-restore-wallet',
  templateUrl: './restore-wallet.component.html',
  styleUrls: ['./restore-wallet.component.scss'],
})
export class RestoreWalletComponent implements OnInit {
  totalTx: number = 0;
  mnemonicWordLengtEnv: number = environment.mnemonicNumWords;

  restoreForm: FormGroup;
  passphraseField = new FormControl('', Validators.required);
  errorOpenWallet: boolean = false;

  word: string;
  wordField: FormArray;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authServ: AuthService,
    private mnemonicServ: MnemonicsService,
    private translate: TranslateService,
    private fb: FormBuilder
  ) {
    this.restoreForm = this.fb.group({
      words: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.onLoad24Passphrase('');
  }

  onLoad24Passphrase(phrase: any) {
    const phraseWord = phrase;
    for (let i = 0; i < this.mnemonicWordLengtEnv; i++) {
      this.wordField = this.restoreForm.get('words') as FormArray;
      this.wordField.push(
        this.fb.group({ word: [phraseWord[i], Validators.required] })
      );
    }
  }

  onPasteEvent(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let passphrase = clipboardData.getData('text').toLowerCase();
    let phraseWord = passphrase.split(' ');
    const valid = this.mnemonicServ.validateMnemonic(passphrase);
    this.wordField.controls = [];
    this.onLoad24Passphrase(phraseWord);
    if (phraseWord.length != this.mnemonicWordLengtEnv) {
      // Give some time for load passphrase after then set error
      setTimeout(() => {
        this.restoreForm.setErrors({ lengthMnemonic: true });
      }, 50);
    }
    if (!valid) {
      // Give some time for load passphrase after then set error
      setTimeout(() => {
        this.restoreForm.setErrors({ mnemonic: true });
      }, 50);
    }
  }

  backClicked() {
    this.router.navigate(['login']);
  }

  onClearClicked() {
    this.wordField.controls = [];
    this.onLoad24Passphrase('');
  }

  onChangeMnemonic() {
    let passphrase: string = this.restoreForm.value.words
      .map(form => form.word)
      .join(' ')
      .replace(/\s\s+/g, ' ')
      .toLowerCase();
    const valid = this.mnemonicServ.validateMnemonic(passphrase);
    if (!valid) this.restoreForm.setErrors({ mnemonic: true });
  }

  async onRestore() {
    if (this.restoreForm.valid) {
      if (localStorage.getItem('ENC_MASTER_SEED')) {
        let message: string;
        await this.translate
          .get('Your old wallet will be removed from this device')
          .toPromise()
          .then(res => (message = res));
        Swal.fire({
          title: message,
          confirmButtonText: 'Continue',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            this.openPinDialog();
            return true;
          },
        });
      } else this.openPinDialog();
    }
  }

  openPinDialog() {
    let pinDialog = this.dialog.open(PinSetupDialogComponent, {
      width: '400px',
      disableClose: true,
    });
    pinDialog.afterClosed().subscribe((key: string) => {
      this.saveNewAccount(key);
    });
  }

  async saveNewAccount(key: string) {
    let passphrase: string = this.restoreForm.value.words
      .map(form => form.word)
      .join(' ')
      .replace(/\s\s+/g, ' ')
      .toLowerCase()
      .trim();

    const keyring = new ZooKeyring(passphrase, 'p4ssphr4se');
    const childSeed = keyring.calcDerivationPath(0);

    localStorage.removeItem('ACCOUNT');
    localStorage.removeItem('CURR_ACCOUNT');

    const address = getZBCAdress(childSeed.publicKey);
    const account: SavedAccount = {
      name: 'Account 1',
      path: 0,
      nodeIP: null,
      address: address,
    };

    const encPassphrase = zoobc.Wallet.encryptPassphrase(passphrase, key);
    localStorage.setItem('ENC_PASSPHRASE_SEED', encPassphrase);

    this.authServ.addAccount(account);
    this.authServ.login(key);
    this.router.navigate(['dashboard'], {
      state: { loadAccount: true },
    });
  }
}
