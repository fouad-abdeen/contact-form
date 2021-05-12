import { Injectable } from '@angular/core';
import { RoutesNames } from 'src/app/names.routes';

@Injectable()
export class CommonService {
  public APIUrl: string = 'https://fouad-portfolio.herokuapp.com/api/data';
  public lang: string = RoutesNames.english;
  public recaptchaToken: string = '';

  constructor() {}
}
