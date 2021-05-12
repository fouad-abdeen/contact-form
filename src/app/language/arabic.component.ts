import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../core/services/common.service';
import { RoutesNames } from '../names.routes';

@Component({
  selector: 'app-arabic',
  template: ``,
  styles: [``],
})
export class ArabicComponent {
  @Output('onLanguageDetection') lang: EventEmitter<void> = new EventEmitter();

  constructor(private common: CommonService) {
    this.common.lang = RoutesNames.arabic;
    const body = document.getElementById('body');
    const footer = document.getElementById('footer');
    body!.style.direction = 'rtl';
    footer!.style.direction = 'rtl';
    this.lang.emit();
  }
}
