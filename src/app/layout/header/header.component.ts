import { Component, OnInit } from '@angular/core';
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // FontAwesome Icons
  Github = faGithub;
  Twitter = faTwitter;
  LinkedIn = faLinkedin;
  Facebook = faFacebook;
  Instagram = faInstagram;

  constructor() {}

  ngOnInit(): void {
    const mediaQuery = window.matchMedia('(max-width: 576px)');

    if (mediaQuery.matches) {
      const socialIcons = document.querySelectorAll('fa-icon');

      socialIcons.forEach((icon) => {
        icon.setAttribute('size', 'lg');
        console.log(icon.getAttribute('size'));
      });
    }
  }
}
