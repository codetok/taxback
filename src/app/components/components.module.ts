import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleTransactionComponent } from './single-transaction/single-transaction.component';
import { MatCardModule } from '@angular/material/card';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component'
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { TransactionsService } from '../list-transactions/transactions.service';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
 
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [
    SingleTransactionComponent,
    EditTransactionComponent,
    CreateTransactionComponent,
    ConfirmBoxComponent
  ],
  exports: [
    SingleTransactionComponent,
    EditTransactionComponent,
    CreateTransactionComponent,
    ConfirmBoxComponent
  ],
  providers: [TransactionsService]
})
export class ComponentsModule { }
