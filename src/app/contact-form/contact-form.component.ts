import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faPaperPlane, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Contact,
  FormAction,
  FormMessage,
  Proxy,
  Title,
} from '.././core/services/proxy.service';
import { CommonService } from '../core/services/common.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  lang: string = this.common.lang;

  // Dynamic Data
  @Input() placeholders: Title[] = [];
  @Input() formActions: FormAction[] = [];
  @Input() FormMessages: FormMessage[] = [];
  myPlaceholders: string[] = [];
  myFormActions: string[] = [];
  myFormMessages: string[] = [];

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

  // FontAwesome Icons
  faSendEmail = faPaperPlane;
  faResendEail = faRedoAlt;

  constructor(private apiCaller: Proxy, private common: CommonService) {}

  getElement(selector: string): Element | null {
    return document.querySelector(selector);
  }

  // #region Form Validation
  validateElement(elementReference: Element, wrapperSelector: string): void {
    const element = elementReference;
    const wrapper = this.getElement(wrapperSelector);

    if (element.classList.contains('ng-invalid')) {
      wrapper?.classList.add('alert-validate');
    } else {
      wrapper?.classList.remove('alert-validate');
    }
  }

  validateFirstName() {
    this.validateElement(this.firstNameInput.nativeElement, '#firstName');
    this.validForm = this.isValidForm();
  }

  validateLastName() {
    this.validateElement(this.lastNameInput.nativeElement, '#lastName');
    this.validForm = this.isValidForm();
  }

  validateEmail() {
    this.validateElement(this.emailInput.nativeElement, '#email');
    this.validForm = this.isValidForm();
  }

  validateSubject() {
    this.validateElement(this.subjectInput.nativeElement, '#subject');
    this.validForm = this.isValidForm();
  }

  validateMessage() {
    this.validateElement(this.messageInput.nativeElement, '#message');
    this.validForm = this.isValidForm();
  }

  isValidForm() {
    const form = this.contactForm.nativeElement;
    return form.classList.contains('ng-valid');
  }
  // #endregion

  // #region Form Submission
  Clear_Values() {
    this.Inquiry.firstName = '';
    this.Inquiry.lastName = '';
    this.Inquiry.emailAddress = '';
    this.Inquiry.subject = '';
    this.Inquiry.message = '';
  }

  sendEmail() {
    const validInquiry = this.isValidForm();
    if (!validInquiry) {
      this.validForm = false;
      throw new Error('Invalid Form Submission');
    }

    this.Inquiry.language = this.common.lang;

    try {
      this.apiCaller.CreateContact(this.Inquiry).subscribe(() => {
        this.Clear_Values();
        this.submittedForm = true;
        return false;
      });
    } catch (e) {
      console.log(`${e.message} ?!`);
      alert(e.message);
    }
  }

  resendEmail() {
    this.submittedForm = false;
    return false;
  }
  // #endregion

  ngAfterContentChecked() {
    this.lang = this.common.lang;
    this.myPlaceholders = this.placeholders.map(
      (placeholder: Title) => placeholder[this.lang]
    );
    this.myFormActions = this.formActions.map(
      (formAction: FormAction) => formAction[this.lang]
    );
    this.myFormMessages = this.FormMessages.map(
      (formMessage: FormMessage) => formMessage[this.lang]
    );
  }
}
