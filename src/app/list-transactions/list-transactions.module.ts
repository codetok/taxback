import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTransactionsComponent } from './list-transactions.component';
import { RouterModule, Router, Routes } from '@angular/router';

// material modules
import { MatTableModule   } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// service
import { TransactionsService } from './transactions.service';

// custom modules
import { ComponentsModule } from '../components/components.module';

// entry components
import { SingleTransactionComponent } from '../components/single-transaction/single-transaction.component';
import { EditTransactionComponent } from '../components/edit-transaction/edit-transaction.component';
import { CreateTransactionComponent } from '../components/create-transaction/create-transaction.component';
import { ConfirmBoxComponent } from '../components/confirm-box/confirm-box.component';


// all routes point to this page.
const allTransations: Routes = [
  { path: '**', component: ListTransactionsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(allTransations),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    ComponentsModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule
  ],
  entryComponents: [
    SingleTransactionComponent,
    EditTransactionComponent ,
    CreateTransactionComponent,
    ConfirmBoxComponent
  ],
  providers: [TransactionsService],
  declarations: [ListTransactionsComponent]
})
export class ListTransactionsModule { }
