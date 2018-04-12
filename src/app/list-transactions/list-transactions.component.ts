import { Component, OnInit, ViewChild, } from '@angular/core';
import { Transactions } from './transaction.model';// model for transactions
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { TransactionsService } from './transactions.service';


@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css']
})
export class ListTransactionsComponent implements OnInit {

  //table headers
  displayedColumns = ['id', 'user', 'amount', 'currency', 'txn_date'];

  @ViewChild(MatSort) sort: MatSort;

  //declare an empty array of type Transactions
  transactions_array =  new MatTableDataSource();
  
  constructor(public transactionSer:TransactionsService) {

  }
  ngAfterViewInit() {
    this.transactions_array.sort = this.sort;
    this.sort.sortChange.subscribe(() => console.log('s'));
  }

  sortData(r) {
    console.log(r);
  }

  ngOnInit() {
    this.transactionSer
      .getAllService('priya@gmail.com')
      .subscribe((res:any) => {
         this.transactions_array.data = res;    
      })
  }

}
