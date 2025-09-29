import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="app-title">FraudWatch</h1>
          <p class="app-subtitle">Intelligent Fraud Detection App</p>
        </div>
        <div class="header-actions">
          <button class="user-profile">
            <span class="user-icon">👤</span>
            <span>Officer Portal</span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: #222349;
      color: white;
      padding: 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
    }

    .logo-section {
      display: flex;
      flex-direction: column;
    }

    .app-title {
      font-size: 1.8rem;
      font-weight: 700;
      margin: 0;
      color: #FEC900;
    }

    .app-subtitle {
      font-size: 0.9rem;
      margin: 0;
      color: #ccc;
      font-weight: 400;
    }

    .header-actions {
      display: flex;
      align-items: center;
    }

    .user-profile {
      background: transparent;
      border: 1px solid #FEC900;
      color: #FEC900;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .user-profile:hover {
      background: #FEC900;
      color: #222349;
    }

    .user-icon {
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .header-content {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
      }

      .app-title {
        font-size: 1.5rem;
      }

      .app-subtitle {
        font-size: 0.8rem;
      }
    }
  `]
})
export class HeaderComponent {}