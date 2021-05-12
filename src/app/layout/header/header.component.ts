import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { CommonService } from 'src/app/core/services/common.service';
import {
  SocialAccount,
  SocialLink,
  Title,
} from 'src/app/core/services/proxy.service';
import { RoutesNames } from 'src/app/names.routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterContentChecked {
  // Language Detection and Change
  lang: string = this.common.lang;
  en: string = RoutesNames.english;
  ar: string = RoutesNames.arabic;
  @Output('onLanguageChange') choosenLanguage: EventEmitter<string> =
    new EventEmitter();

  // Dynamic Data
  @Input() socialAccounts: (SocialAccount | null)[] = [];
  @Input() socialLinks: SocialLink[] = [];
  @Input() titles: Title[] = [];

  // FontAwesome Icons
  Github = faGithub;
  Twitter = faTwitter;
  LinkedIn = faLinkedin;
  Facebook = faFacebook;
  Instagram = faInstagram;

  constructor(private common: CommonService) {}

  changeLanguage(lang: string): void {
    this.choosenLanguage.emit(lang);
  }

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
