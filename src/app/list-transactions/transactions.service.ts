import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import { Transactions } from './transaction.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class TransactionsService {
  constructor(public http: Http) { }

  /** @description get all the service by emaild.
  * @param {string} id email of the user .
  */
  getAllService(email) {
    return this.http.get(`${environment.BASE_URL}${email}`)
      .map(res => res.json());
  }

  /** @description method to create a txn
  * @param {Transactions} data  Transactions object .
  */
  createTransaction(data: Transactions) {
    return this.http.post(`${environment.BASE_URL}${data.user}`, data)
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));
  }

  /** @description method to edit a txn
  * @param {Transactions} data  Transactions object .
  */
  editTransaction(data: Transactions) {
    return this.http.post(`${environment.BASE_URL}${data.user}/${data.id}`, data)
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));
  }
  /** @description method to delete a txn
  * @param {Transactions} data  Transactions object .
  */
  delete(data: Transactions) {
    return this.http.delete(`${environment.BASE_URL}${data.user}/${data.id}`)
      .map(res => res.json())
      .catch(res => Observable.throw(res.json()));
  }
}
