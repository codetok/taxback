import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionsService } from '../../list-transactions/transactions.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  public transactionForm: FormGroup;
  public error: string[] = [];

  constructor(public fb: FormBuilder,
    public tranSer: TransactionsService,
    public dialogRef: MatDialogRef<CreateTransactionComponent>,
    ) {
    this.transactionForm = this.fb.group({
      user: ['', Validators.required],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
      txn_date: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  CreateTransaction() {
    this.error = [];
    this.tranSer.createTransaction(this.transactionForm.value)
    .subscribe(res => {
       this.transactionForm.value['id'] = res.id;
       this.dialogRef.close( this.transactionForm.value);
    }, (e: any) => {
       for ( const err  of Object.keys(e.error)) {
          this.error.push(e.error[err]);
       }
    });
  }

}
