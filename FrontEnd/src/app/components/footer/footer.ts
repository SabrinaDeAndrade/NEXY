import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// Import FontAwesome
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: "./footer.html",
  styleUrls: ["./footer.css"]
})
export class Footer {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { name: "Facebook", icon: faFacebook, url: "#" },
    { name: "Instagram", icon: faInstagram, url: "#" },
    { name: "Twitter", icon: faTwitter, url: "#" },
    { name: "LinkedIn", icon: faLinkedin, url: "#" },
  ];

  // Inicializa os ícones
  constructor(private library: FaIconLibrary) {
    library.addIcons(faFacebook, faInstagram, faTwitter, faLinkedin);
  }
}
