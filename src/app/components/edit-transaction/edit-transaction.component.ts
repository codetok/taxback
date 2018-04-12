import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionsService } from '../../list-transactions/transactions.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  public transactionForm: FormGroup;
  public error: string[] = [];

  constructor(public fb: FormBuilder,
    public tranSer: TransactionsService,
    public dialogRef: MatDialogRef<EditTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.transactionForm = this.fb.group({
        id: [this.data.id, Validators.required],
        user: [this.data.user, Validators.required],
        amount: [this.data.amount, Validators.required],
        currency: [this.data.currency, Validators.required],
        txn_date: [this.data.txn_date, Validators.required]
      });
  }

  ngOnInit() {
  }
  editTransaction() {
    this.error = [];
    this.tranSer.editTransaction(this.transactionForm.value)
    .subscribe(res => {
       this.dialogRef.close( this.transactionForm.value);
    }, (e: any) => {
      for ( const err  of Object.keys(e.error)) {
         this.error.push(e.error[err]);
      }
   });
  }
}
