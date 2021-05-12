import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { Title } from 'src/app/core/services/proxy.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  lang: string = this.common.lang;

  // Dynamic Data
  @Input() titles: Title[] = [];
  myTitles: string[] = [];

  constructor(private common: CommonService) {}

  ngAfterContentChecked() {
    this.lang = this.common.lang;
    this.myTitles = this.titles.map((title: Title) => title[this.lang]);
  }
}
