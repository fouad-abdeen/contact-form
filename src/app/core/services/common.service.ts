import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  public APIUrl = 'http://localhost:8080/api/data';

  constructor() {}

  // Alert_Message = (message: string) => alert(message);

  Handle_Exception(msg: string) {
    if (msg != null && msg !== '') {
      alert(msg);
      throw new Error(msg);
    }
  }
}
