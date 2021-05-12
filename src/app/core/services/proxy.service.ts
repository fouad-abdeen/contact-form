import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.api.post<Contact>(this.url, JSON.stringify(i_Contact));
  }

  GetSocialAccounts(): Observable<SocialAccount[]> {
    this.url = this.APIBaseUrl + '/getSocialAccounts';
    return this.api.get<SocialAccount[]>(this.url);
  }

  GetTitles(): Observable<Title[]> {
    this.url = this.APIBaseUrl + '/getTitles';
    return this.api.get<Title[]>(this.url);
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
