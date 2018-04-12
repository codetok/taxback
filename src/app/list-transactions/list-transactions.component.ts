import { Component, OnInit, ViewChild, } from '@angular/core';
import { Transactions } from './transaction.model'; // model for transactions
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { TransactionsService } from './transactions.service';
import { SingleTransactionComponent } from '../components/single-transaction/single-transaction.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditTransactionComponent } from '../components/edit-transaction/edit-transaction.component';
import { CreateTransactionComponent } from '../components/create-transaction/create-transaction.component';
import { ConfirmBoxComponent } from '../components/confirm-box/confirm-box.component';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css']
})
export class ListTransactionsComponent implements OnInit {

  // table headers
  displayedColumns = ['id', 'user', 'amount', 'currency', 'txn_date', 'select'];
  // loading = true shows the progress bar
  public loading = false;

  // subscribe to this sort  to do custom sort
  @ViewChild(MatSort) sort: MatSort;

  // initialise MatTableDataSource, this class hold data
  transactions_array = new MatTableDataSource();

  constructor(public transactionSer: TransactionsService, public dialog: MatDialog) {
  }

  // view modal.
  view(transaction: Transactions) {
    const viewRef = this.dialog.open(SingleTransactionComponent, {
      width: '60%',
      data: transaction
    });
  }

  // edit model
  edit(transaction: Transactions) {
    const editTrasaction = this.dialog.open(EditTransactionComponent, {
      width: '60%',
      data: transaction
    });
    // update the listing if there is a change
    editTrasaction.afterClosed().subscribe(el => {
      const index = this.getIndexById(el.id);
      // use spread operator to update the rows.
      this.transactions_array.data = [
        ...this.transactions_array.data.slice(0, index),
        el,
        ...this.transactions_array.data.slice(index + 1)
      ];
    });
  }
  create() {
    const createTrasaction = this.dialog.open(CreateTransactionComponent, {
      width: '60%',
    });
    createTrasaction.afterClosed().subscribe(tran => {
      if (tran) {
        // add the new row as the last element of the listing.
        this.transactions_array.data = [...this.transactions_array.data,
        new Transactions(tran.id, tran.user, tran.amount, tran.currency, tran.txn_date)];
      }
    });
  }

  // get the index of the record in the listing.
  getIndexById(id) {
    let i = 0;
    for (const tran of this.transactions_array.data) {
      if (tran['id'] === id) {
        return i;
      }
      i++;
    }
  }
  // delete
  delete(transaction: Transactions) {
    const deleteTrasaction = this.dialog.open(ConfirmBoxComponent, {
      data: transaction
    });
    deleteTrasaction.afterClosed()
    .subscribe(de => {
      if (de) {
        // slice the array
        const index = this.getIndexById(transaction.id);
        this.transactions_array.data = [
          ...this.transactions_array.data.slice(0, index),
          ...this.transactions_array.data.slice(index + 1)
        ];
        this.transactionSer.delete(transaction).toPromise();
      }
    });
  }
  ngOnInit() {
    this.getRecordsByEmail('priya@gmail.com');
  }

  getRecordsByEmail(email) {
    this.loading = true;
    this.transactionSer
      .getAllService(email)
      .debounceTime(1000)
      .map(res => {
        // convert the array into transaction objects
        let trans: Transactions[] = [];
        for (const tran of res) {
          trans = [...trans, new Transactions(tran.id, tran.user, tran.amount, tran.currency, tran.txn_date)];
        }
        return trans;
      })
      .subscribe((res: any) => {
        this.transactions_array.data = res;
        this.loading = false;
      });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.getRecordsByEmail(filterValue);
  }

}
