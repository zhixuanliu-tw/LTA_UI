import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent],
  template: `
    <div class="app-container">
      <app-home></app-home>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #ffffff;
    }
  `]
})
export class AppComponent {
  title = 'FraudWatch';
}