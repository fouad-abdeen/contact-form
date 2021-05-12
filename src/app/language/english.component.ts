import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../core/services/common.service';
import { RoutesNames } from '../names.routes';

@Component({
  selector: 'app-english',
  template: ``,
  styles: [``],
})
export class EnglishComponent {
  @Output('onLanguageDetection') lang: EventEmitter<void> = new EventEmitter();

  constructor(private common: CommonService) {
    this.common.lang = RoutesNames.english;
    this.lang.emit();
  }
}
