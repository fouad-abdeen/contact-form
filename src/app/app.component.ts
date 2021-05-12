import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonService } from './core/services/common.service';
import {
  Proxy,
  SocialAccount,
  SocialLink,
  Title,
} from './core/services/proxy.service';
import { RoutesNames } from './names.routes';

@Component({
  selector: 'app-root',
  template: `
    <app-arabic
      *ngIf="setLangAsAr"
      (onLanguageDetection)="resetLanguage()"
    ></app-arabic>
    <app-english
      *ngIf="setLangAsEn"
      (onLanguageDetection)="resetLanguage()"
    ></app-english>
    <app-header
      (onLanguageChange)="switchLanguage($event)"
      [socialAccounts]="this.socialAccounts"
      [socialLinks]="this.socialLinks"
      [titles]="this.headerTitles"
    ></app-header>
    <app-contact-form
      [placeholders]="this.formPlaceholders"
      [actions]="this.formActions"
      [messages]="this.formMessages"
    ></app-contact-form>
    <app-footer [titles]="this.footerTitles"></app-footer>
  `,
  styles: [``],
})
export class AppComponent implements OnInit {
  title: string = 'contactForm';
  lang: string = this.common.lang;
  setLangAsEn: boolean = false;
  setLangAsAr: boolean = false;

  socialAccounts: (SocialAccount | null)[] = [];
  socialLinks: SocialLink[] = [];
  headerTitles: Title[] = [];
  footerTitles: Title[] = [];
  formPlaceholders: Title[] = [];
  formActions: Title[] = [];
  formMessages: Title[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private common: CommonService,
    private apiCaller: Proxy
  ) {}

  // #region Language Change Handling
  switchLanguageToEn(): void {
    this.common.lang = RoutesNames.english;

    const path = this.router.url.slice(3);
    this.router.navigate([RoutesNames.english + path]);

    const body = document.getElementById('body');
    const footer = document.getElementById('footer');
    body!.style.direction = 'ltr';
    footer!.style.direction = 'ltr';
  }

  switchLanguageToAr(): void {
    this.common.lang = RoutesNames.arabic;

    const path = this.router.url.slice(3);
    this.router.navigate([RoutesNames.arabic + path]);

    const body = document.getElementById('body');
    const footer = document.getElementById('footer');
    body!.style.direction = 'rtl';
    footer!.style.direction = 'rtl';
  }

  switchLanguage(lang: string): void {
    if (lang === RoutesNames.arabic) {
      this.switchLanguageToAr();
    } else {
      this.switchLanguageToEn();
    }
  }

  resetLanguage(): void {
    this.lang = this.common.lang;
  }
  // #endregion

  ngOnInit() {
    // #region API Calls
    // Rertrieving Dynamic Data from the Server
    this.apiCaller.GetSocialAccounts().subscribe((data: SocialAccount[]) => {
      this.socialAccounts = data.map((sa) => {
        const { link } = sa;
        this.socialLinks.push({ link });

        if (sa.activated) return sa;

        return null;
      });
    });

    this.apiCaller.GetTitles().subscribe((data: Title[]) => {
      for (const t of data) {
        if (t.id === 'header') {
          this.headerTitles.push(t);
        } else if (t.id === 'form-action') {
          this.formActions.push(t);
        } else if (t.id === 'form-placeholder') {
          this.formPlaceholders.push(t);
        } else if (t.id === 'form-message') {
          this.formMessages.push(t);
        } else if (t.id === 'footer') {
          this.footerTitles.push(t);
        }
      }
    });
    // #endregion

    // Subscribing to the Router Changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Decide what language to set depending on the accessed data
        // from the first child of the root in the router state tree.

        // if (setLangAsEn === undefined) => true
        // if (setLangAsEn === false) => false
        this.setLangAsEn =
          this.activatedRoute.firstChild!.snapshot.data.setLangAsEn !== false;

        // if (setLangAsAr === undefined) => true
        // if (setLangAsAr === false) => false
        this.setLangAsAr =
          this.activatedRoute.firstChild!.snapshot.data.setLangAsAr !== false;
      }
    });
  }
}
