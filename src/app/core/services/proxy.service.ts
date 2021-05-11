import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable()
export class Proxy {
  APIBaseUrl = '';
  url = '';
  constructor(public api: HttpClient, private common: CommonService) {
    this.APIBaseUrl = common.APIUrl;
  }

  CreateContact(i_Contact: Contact): Observable<Contact> {
    this.url = this.APIBaseUrl + '/createContact';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = { headers: headers };
    return this.api
      .post<ResultCreateContact>(this.url, JSON.stringify(i_Contact), options)
      .pipe(
        map((response) => {
          this.common.Handle_Exception(response.ExceptionMsg);
          return response.MyContact;
        })
      );
  }
}

export class Contact {
  FIRST_NAME!: string;
  LAST_NAME!: string;
  EMAIL!: string | undefined;
  SUBJECT!: string;
  MESSAGE!: string;
}

export class ActionResult {
  ExceptionMsg!: string;
}

export class ResultCreateContact extends ActionResult {
  MyContact!: Contact;
}
