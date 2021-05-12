import {
  AfterContentChecked,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { faPaperPlane, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment.prod';
import { Contact, Proxy, Title } from '.././core/services/proxy.service';
import { CommonService } from '../core/services/common.service';
import { RoutesNames } from '../names.routes';

interface invalidInput {
  [input: string]: boolean;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements AfterContentChecked {
  readonly SITE_KEY = environment.recaptchaSiteKey;
  lang: string = this.common.lang;
  en: string = RoutesNames.english;
  ar: string = RoutesNames.arabic;

  // Dynamic Data
  @Input() placeholders: Title[] = [];
  @Input() actions: Title[] = [];
  @Input() messages: Title[] = [];

  // Contact Form (Inquiry)
  Inquiry: Contact = new Contact();
  validForm: boolean = false;
  submittedForm: boolean = false;

  // ElementRefs || Wrappers of Native DOM Elements
  @ViewChild('contactForm')
  contactForm!: ElementRef;
  @ViewChild('firstNameInput')
  firstNameInput!: ElementRef;
  @ViewChild('lastNameInput')
  lastNameInput!: ElementRef;
  @ViewChild('emailInput')
  emailInput!: ElementRef;
  @ViewChild('subjectInput')
  subjectInput!: ElementRef;
  @ViewChild('messageInput')
  messageInput!: ElementRef;

  // Validity of each Input
  invalidInput: invalidInput = {};

  // FontAwesome Icons
  faSendEmail = faPaperPlane;
  faResendEail = faRedoAlt;

  constructor(private apiCaller: Proxy, private common: CommonService) {}

  getPlaceholderById(id: number): string {
    if (this.placeholders.length === 0) {
      return '';
    } else {
      return this.placeholders[id][this.lang];
    }
  }

  getActionById(id: number): string {
    if (this.actions.length === 0) {
      return '';
    } else {
      return this.actions[id][this.lang];
    }
  }

  getElement(selector: string): Element | null {
    return document.querySelector(selector);
  }

  // #region Form Validation
  validateElement(elementReference: Element, wrapperSelector: string): void {
    const element = elementReference;
    const wrapper = this.getElement(wrapperSelector);

    if (element.classList.contains('ng-invalid')) {
      if (this.lang === RoutesNames.english)
        wrapper?.classList.add('alert-validate');
      this.invalidInput[wrapperSelector] = true;
    } else {
      wrapper?.classList.remove('alert-validate');
      this.invalidInput[wrapperSelector] = false;
    }
  }

  validateFirstName(): void {
    this.validateElement(this.firstNameInput.nativeElement, '#firstName');
    this.validForm = this.isValidForm();
  }

  validateLastName(): void {
    this.validateElement(this.lastNameInput.nativeElement, '#lastName');
    this.validForm = this.isValidForm();
  }

  validateEmail(): void {
    this.validateElement(this.emailInput.nativeElement, '#email');
    this.validForm = this.isValidForm();
  }

  validateSubject(): void {
    this.validateElement(this.subjectInput.nativeElement, '#subject');
    this.validForm = this.isValidForm();
  }

  validateMessage(): void {
    this.validateElement(this.messageInput.nativeElement, '#message');
    this.validForm = this.isValidForm();
  }

  isValidForm(): boolean {
    const form = this.contactForm.nativeElement;
    return form.classList.contains('ng-valid');
  }
  // #endregion

  // #region Form Submission
  resolved(captchaResponse: string) {
    if (captchaResponse === null) {
      this.common.recaptchaToken = '';
    } else {
      this.common.recaptchaToken = captchaResponse;
    }
  }

  sendEmail(): boolean {
    const validInquiry = this.isValidForm();

    if (!validInquiry) {
      this.validForm = false;
      throw new Error('Invalid Form Submission');
    }

    this.Inquiry.language = this.lang;

    this.apiCaller.CreateContact(this.Inquiry).subscribe(() => {
      this.Inquiry = new Contact();
      this.submittedForm = true;
    });

    return false;
  }

  resendEmail(): boolean {
    this.submittedForm = false;
    return false;
  }
  // #endregion

  ngAfterContentChecked(): void {
    this.lang = this.common.lang;
  }
}
