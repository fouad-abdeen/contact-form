import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArabicComponent } from './arabic.component';
import { EnglishComponent } from './english.component';

@NgModule({
  declarations: [ArabicComponent, EnglishComponent],
  imports: [CommonModule],
  exports: [ArabicComponent, EnglishComponent],
})
export class LanguageModule {}
