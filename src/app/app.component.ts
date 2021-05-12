import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonService } from './core/services/common.service';
import {
  FormAction,
  FormMessage,
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
      [formActions]="this.formActions"
      [FormMessages]="this.formMessages"
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
  formActions: FormAction[] = [];
  formMessages: FormMessage[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private common: CommonService,
    private apiCaller: Proxy
  ) {}

  switchLanguageToEn() {
    this.common.lang = RoutesNames.english;
    const path = this.router.url.slice(3);
    this.router.navigate([RoutesNames.english + path]);
    const body = document.getElementById('body');
    const footer = document.getElementById('footer');
    body!.style.direction = 'ltr';
    footer!.style.direction = 'ltr';
  }

  switchLanguageToAr() {
    this.common.lang = RoutesNames.arabic;
    const path = this.router.url.slice(3);
    this.router.navigate([RoutesNames.arabic + path]);
    const body = document.getElementById('body');
    const footer = document.getElementById('footer');
    body!.style.direction = 'rtl';
    footer!.style.direction = 'rtl';
  }

  switchLanguage(lang: string) {
    if (lang === RoutesNames.arabic) {
      this.switchLanguageToAr();
    } else {
      this.switchLanguageToEn();
    }
  }

  resetLanguage() {
    this.lang = this.common.lang;
  }

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
        } else if (t.id === 'form-placeholder') {
          this.formPlaceholders.push(t);
        } else if (t.id === 'footer') {
          this.footerTitles.push(t);
        }
      }
    });

    this.apiCaller.GetFormActions().subscribe((data: FormAction[]) => {
      for (const fa of data) {
        this.formActions.push(fa);
      }
    });

    this.apiCaller.GetFormMessages().subscribe((data: FormMessage[]) => {
      for (const fm of data) {
        this.formMessages.push(fm);
      }
    });
    // #endregion

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Change language to English.
        // While accessing the first child of the root in router state tree.
        this.setLangAsEn =
          this.activatedRoute.firstChild!.snapshot.data.setLangAsEn !== false;

        // Change language to Arabic.
        // While accessing the first child of the root in router state tree.
        this.setLangAsAr =
          this.activatedRoute.firstChild!.snapshot.data.setLangAsAr !== false;
      }
    });
  }
}
