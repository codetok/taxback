import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionsService {

  constructor(public http: Http) { }

  //get all transations
  /*
  @param id: user id
  */
  getAllService(id) {
    return this.http.get(`${environment.BASE_URL}${id}`).map(res => res.json())
  }
}
