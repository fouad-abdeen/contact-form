import { AfterContentChecked, Component, Input } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { Title } from 'src/app/core/services/proxy.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements AfterContentChecked {
  lang: string = this.common.lang;

  // Dynamic Data
  @Input() titles: Title[] = [];

  constructor(private common: CommonService) {}

  getTitleById(id: number): string {
    if (this.titles.length === 0) {
      return '';
    } else {
      return this.titles[id][this.lang];
    }
  }

  ngAfterContentChecked(): void {
    this.lang = this.common.lang;
  }
}
