import { Component, signal } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";

import { Footer } from "./components/footer/footer";
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Nexy');
}
