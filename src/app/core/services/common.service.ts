import { Injectable } from '@angular/core';
import { RoutesNames } from 'src/app/names.routes';

@Injectable()
export class CommonService {
  public APIUrl = 'http://localhost:8080/api/data';
  lang = RoutesNames.english;

  constructor() {}
}
