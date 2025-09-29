import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Chatbot Toggle Button -->
    <div 
      class="chatbot-toggle" 
      *ngIf="isVisible && !isOpen"
      (click)="toggleChat()">
      <div class="chat-bubble">
        <span class="chat-icon">💬</span>
      </div>
      <span class="chat-label">Ask Intel</span>
    </div>

    <!-- Chatbot Window -->
    <div class="chatbot-window" *ngIf="isVisible && isOpen">
      <div class="chat-header">
        <div class="chat-header-info">
          <span class="chat-icon">💬</span>
          <span class="chat-title">Ask Intel</span>
        </div>
        <button class="minimize-btn" (click)="toggleChat()">−</button>
      </div>
      
      <div class="chat-messages" #chatMessages>
        <div class="message bot-message">
          <div class="message-content">
            <span class="bot-icon">🤖</span>
            <div class="message-text">
              Hello! I'm Intel, your fraud detection assistant. Ask me about transaction patterns, similar cases, or insights from your data.
            </div>
          </div>
        </div>

        <div class="message user-message" *ngIf="userQuery">
          <div class="message-content">
            <div class="message-text">{{userQuery}}</div>
            <span class="user-icon">👤</span>
          </div>
        </div>

        <div class="message bot-message" *ngIf="showResponse">
          <div class="message-content">
            <span class="bot-icon">🤖</span>
            <div class="message-text">
              <p>{{botResponse}}</p>
              <div class="similar-cases" *ngIf="similarCases.length > 0">
                <h5>Similar Cases Found:</h5>
                <div class="cases-list">
                  <div class="case-item" *ngFor="let case of similarCases">
                    <span class="case-id">{{case.id}}</span>
                    <span class="case-score">{{case.fraudScore}}%</span>
                    <span class="case-reason">{{case.reason}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="typing-indicator" *ngIf="isTyping">
          <div class="message-content">
            <span class="bot-icon">🤖</span>
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <input 
          type="text" 
          [(ngModel)]="currentInput"
          (keypress)="onKeyPress($event)"
          placeholder="Ask about similar cases, patterns, or insights..."
          class="message-input">
        <button class="send-btn" (click)="sendMessage()">
          <span>→</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-toggle {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 1000;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chat-bubble {
      background: #222349;
      color: #FEC900;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(34, 35, 73, 0.4);
      transition: all 0.3s ease;
    }

    .chat-bubble:hover {
      background: #FEC900;
      color: #222349;
      transform: scale(1.1);
    }

    .chat-icon {
      font-size: 1.5rem;
    }

    .chat-label {
      background: #222349;
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(34, 35, 73, 0.3);
    }

    .chatbot-window {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 400px;
      height: 500px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .chat-header {
      background: #222349;
      color: white;
      padding: 1rem;
      border-radius: 12px 12px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-header-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .chat-title {
      font-weight: 600;
      font-size: 1rem;
    }

    .minimize-btn {
      background: none;
      border: none;
      color: #FEC900;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.3s ease;
    }

    .minimize-btn:hover {
      background: rgba(254, 201, 0, 0.2);
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      display: flex;
      animation: messageSlide 0.3s ease-out;
    }

    @keyframes messageSlide {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .user-message {
      justify-content: flex-end;
    }

    .user-message .message-content {
      flex-direction: row-reverse;
    }

    .message-content {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      max-width: 85%;
    }

    .message-text {
      background: #f8f9fa;
      padding: 0.75rem;
      border-radius: 12px;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .user-message .message-text {
      background: #222349;
      color: white;
    }

    .bot-icon,
    .user-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .similar-cases {
      margin-top: 1rem;
    }

    .similar-cases h5 {
      color: #222349;
      font-size: 0.9rem;
      font-weight: 600;
      margin: 0 0 0.75rem 0;
    }

    .cases-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .case-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 0.5rem;
      border-radius: 6px;
      border: 1px solid #dee2e6;
      font-size: 0.8rem;
    }

    .case-id {
      font-weight: 600;
      color: #222349;
    }

    .case-score {
      background: #f8d7da;
      color: #721c24;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }

    .case-reason {
      font-size: 0.7rem;
      color: #666;
      flex: 1;
      text-align: right;
      margin-left: 8px;
    }

    .typing-indicator .typing-dots {
      background: #f8f9fa;
      padding: 0.75rem;
      border-radius: 12px;
      display: flex;
      gap: 4px;
    }

    .typing-dots span {
      width: 8px;
      height: 8px;
      background: #666;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
    }

    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

    @keyframes typing {
      0%, 80%, 100% {
        transform: scale(1);
        opacity: 0.5;
      }
      40% {
        transform: scale(1.2);
        opacity: 1;
      }
    }

    .chat-input {
      display: flex;
      padding: 1rem;
      border-top: 1px solid #e9ecef;
      gap: 8px;
    }

    .message-input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 20px;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .message-input:focus {
      border-color: #FEC900;
    }

    .send-btn {
      background: #222349;
      color: #FEC900;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: all 0.3s ease;
    }

    .send-btn:hover {
      background: #FEC900;
      color: #222349;
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      .chatbot-window {
        width: calc(100vw - 20px);
        height: 400px;
        right: 10px;
        bottom: 10px;
      }

      .chatbot-toggle {
        right: 20px;
        bottom: 20px;
      }

      .chat-label {
        display: none;
      }
    }
  `]
})
export class ChatbotComponent {
  @Input() isVisible: boolean = true;
  isOpen: boolean = false;
  showResponse: boolean = false;

  currentInput: string = '';
  userQuery: string = '';
  botResponse: string = '';
  isTyping: boolean = false;

  similarCases = [
    { id: 'TXN045', fraudScore: 89, reason: 'Frequent Transfers' },
    { id: 'TXN067', fraudScore: 84, reason: 'COE Timing Issues' },
    { id: 'TXN089', fraudScore: 92, reason: 'Multiple NRIC Pattern' },
    { id: 'TXN124', fraudScore: 78, reason: 'Frequent Transfers' }
  ];

  ngOnInit() {
    // Initialize component
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.currentInput.trim()) return;

    this.userQuery = this.currentInput;
    this.currentInput = '';
    this.isTyping = true;

    setTimeout(() => {
      this.simulateResponse();
    }, 2000);
  }

  simulateResponse() {
    this.isTyping = false;
    this.showResponse = true;
    this.botResponse = 'Found 12 similar cases in the past 6 months. Most involve NRICs with frequent transfers before COE expiry. These transactions show similar patterns of rapid vehicle transfers shortly before Certificate of Entitlement expiration dates, suggesting potential COE arbitrage activities.';
  }

  onKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}