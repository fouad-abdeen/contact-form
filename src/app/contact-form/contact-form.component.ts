import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faPaperPlane, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { Contact, Proxy } from '.././core/services/proxy.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  // Contact Form (Inquiry) Model
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

  constructor(private apiCaller: Proxy) {}

  ngOnInit(): void {}

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
  sendEmail() {
    const validInquiry = this.isValidForm();
    if (!validInquiry) {
      this.validForm = false;
      throw new Error('Invalid Form Submission');
    }

    this.submittedForm = true;
    return false;
  }

  resendEmail() {
    this.submittedForm = false;
    return false;
  }
  // #endregion
}
