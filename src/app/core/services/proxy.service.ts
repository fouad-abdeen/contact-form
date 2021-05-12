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
    return this.api.post<Contact>(this.url, JSON.stringify(i_Contact), options);
  }

  GetSocialAccounts() {
    this.url = this.APIBaseUrl + '/getSocialAccounts';
    return this.api.get<SocialAccount[]>(this.url);
  }

  GetTitles() {
    this.url = this.APIBaseUrl + '/getTitles';
    return this.api.get<Title[]>(this.url);
  }

  GetFormActions() {
    this.url = this.APIBaseUrl + '/getFormActions';
    return this.api.get<FormAction[]>(this.url);
  }

  GetFormMessages() {
    this.url = this.APIBaseUrl + '/getFormMessages';
    return this.api.get<FormMessage[]>(this.url);
  }
}

export class Contact {
  language!: string;
  firstName!: string;
  lastName!: string;
  emailAddress!: string | undefined;
  subject!: string;
  message!: string;
}

export interface SocialAccount {
  link: string;
  platform: string;
  activated: boolean;
}

export interface SocialLink {
  link: string;
}

export interface Title {
  [lang: string]: string;
  en: string;
  ar: string;
  id: string;
}

export interface FormAction {
  [lang: string]: string;
  en: string;
  ar: string;
}

export interface FormMessage {
  [lang: string]: string;
  en: string;
  ar: string;
}
