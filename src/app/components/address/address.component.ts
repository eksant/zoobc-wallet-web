import { Component, OnInit, Input } from '@angular/core';
import { onCopyText } from 'src/helpers/utils';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'wallet-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() value: string;
  @Input() copyButton: boolean = false;
  @Input() center: boolean = false;

  len: number = 0;
  halfLen: number = 0;

  constructor(private snackbar: MatSnackBar, private translate: TranslateService) {}

  ngOnInit() {
    this.len = this.value.length;
    this.halfLen = Math.round(this.value.length / 2);
  }

  async onCopyText(e) {
    e.stopPropagation();
    onCopyText(this.value);

    let message: string;
    await this.translate
      .get('Address copied to clipboard')
      .toPromise()
      .then(res => (message = res));
    this.snackbar.open(message, null, { duration: 3000 });
  }
}
