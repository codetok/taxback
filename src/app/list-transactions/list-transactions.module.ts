import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTransactionsComponent } from './list-transactions.component';
import { RouterModule, Router, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

//service
import { TransactionsService } from './transactions.service';

const allTransations: Routes = [
  { path: 'list-transations', component: ListTransactionsComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(allTransations),
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [TransactionsService],
  declarations: [ListTransactionsComponent]
})
export class ListTransactionsModule { }
