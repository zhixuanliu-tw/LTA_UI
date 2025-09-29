import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-flagged-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="why-flagged-overlay" *ngIf="isVisible" (click)="onOverlayClick($event)">
      <div class="why-flagged-panel" (click)="$event.stopPropagation()">
        <div class="panel-header">
          <h3>Transaction Analysis</h3>
          <button class="close-btn" (click)="onClose()">✕</button>
        </div>
        
        <div class="panel-content">
          <div class="transaction-summary">
            <h4>Transaction Summary</h4>
            <div class="summary-grid">
              <div class="summary-item">
                <span class="label">Transaction ID:</span>
                <span class="value">{{transaction?.id}}</span>
              </div>
              <div class="summary-item">
                <span class="label">Date:</span>
                <span class="value">{{formatDate(transaction?.date)}}</span>
              </div>
              <div class="summary-item">
                <span class="label">Fraud Score:</span>
                <span class="value fraud-score" [ngClass]="getFraudScoreClass(transaction?.fraudScore)">
                  {{(transaction?.fraudScore * 100).toFixed(0)}}%
                </span>
              </div>
              <div class="summary-item">
                <span class="label">Vehicle Plate:</span>
                <span class="value vehicle-plate">{{transaction?.vehiclePlate}}</span>
              </div>
              <div class="summary-item">
                <span class="label">NRIC:</span>
                <span class="value nric">{{transaction?.nric}}</span>
              </div>
              <div class="summary-item">
                <span class="label">Name:</span>
                <span class="value">{{transaction?.name}}</span>
              </div>
              <div class="summary-item full-width">
                <span class="label">Address:</span>
                <span class="value">{{transaction?.address}}</span>
              </div>
            </div>
          </div>

          <div class="fraud-analysis">
            <h4>Why This Transaction Was Flagged</h4>
            <div class="analysis-content">
              <div class="risk-label" [ngClass]="getRiskLevelClass()">
                <span class="risk-icon">⚠️</span>
                <span>{{getRiskLevel()}}: {{transaction?.flaggingReason}}</span>
              </div>
              
              <div class="explanation">
                <p class="explanation-text">{{getFraudExplanation()}}</p>
              </div>

              <div class="ai-insights">
                <h5>AI Analysis Insights</h5>
                <div class="insights-list">
                  <div class="insight-item">
                    <span class="insight-icon">📊</span>
                    <span>Pattern detected: {{getPatternInsight()}}</span>
                  </div>
                  <div class="insight-item">
                    <span class="insight-icon">🎯</span>
                    <span>Risk factors: {{getRiskFactors()}}</span>
                  </div>
                  <div class="insight-item">
                    <span class="insight-icon">📈</span>
                    <span>Historical comparison: {{getHistoricalInsight()}}</span>
                  </div>
                </div>
              </div>

              <div class="recommended-actions">
                <h5>Recommended Actions</h5>
                <ul class="actions-list">
                  <li>Conduct detailed investigation of vehicle ownership history</li>
                  <li>Cross-reference with other transactions by same NRIC</li>
                  <li>Verify legitimacy of business relationships</li>
                  <li>Review COE transfer timing patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .why-flagged-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .why-flagged-panel {
      background: white;
      border-radius: 12px;
      max-width: 800px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-50px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #e9ecef;
      background: #f8f9fa;
      border-radius: 12px 12px 0 0;
    }

    .panel-header h3 {
      color: #222349;
      font-size: 1.4rem;
      font-weight: 600;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #666;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .close-btn:hover {
      background: #e9ecef;
      color: #222349;
    }

    .panel-content {
      padding: 2rem;
    }

    .transaction-summary,
    .fraud-analysis {
      margin-bottom: 2rem;
    }

    .transaction-summary h4,
    .fraud-analysis h4 {
      color: #222349;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .summary-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .summary-item.full-width {
      grid-column: 1 / -1;
    }

    .summary-item .label {
      font-size: 0.85rem;
      color: #666;
      font-weight: 500;
    }

    .summary-item .value {
      font-size: 1rem;
      color: #222349;
      font-weight: 600;
    }

    .fraud-score {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .fraud-score.high-risk {
      background: #f8d7da;
      color: #721c24;
    }

    .fraud-score.medium-risk {
      background: #fff3cd;
      color: #856404;
    }

    .vehicle-plate,
    .nric {
      font-family: 'Courier New', monospace;
    }

    .analysis-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .risk-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: 8px;
      font-weight: 600;
    }

    .risk-label.high-risk {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .risk-label.medium-risk {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffeaa7;
    }

    .risk-icon {
      font-size: 1.5rem;
    }

    .explanation-text {
      color: #333;
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
    }

    .ai-insights h5,
    .recommended-actions h5 {
      color: #222349;
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
    }

    .insights-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .insight-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 6px;
      font-size: 0.9rem;
      color: #333;
    }

    .insight-icon {
      font-size: 1.1rem;
    }

    .actions-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .actions-list li {
      padding: 0.5rem 0;
      color: #333;
      font-size: 0.9rem;
      position: relative;
      padding-left: 1.5rem;
    }

    .actions-list li:before {
      content: '•';
      color: #FEC900;
      font-weight: bold;
      position: absolute;
      left: 0;
    }

    @media (max-width: 768px) {
      .why-flagged-overlay {
        padding: 10px;
        align-items: flex-start;
        padding-top: 50px;
      }

      .why-flagged-panel {
        max-height: calc(100vh - 60px);
      }

      .panel-content {
        padding: 1rem;
      }

      .summary-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WhyFlaggedPanelComponent {
  @Input() transaction: any = null;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-SG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getFraudScoreClass(score: number): string {
    if (score >= 0.8) return 'high-risk';
    if (score >= 0.6) return 'medium-risk';
    return 'low-risk';
  }

  getRiskLevel(): string {
    if (!this.transaction) return '';
    if (this.transaction.fraudScore >= 0.8) return 'High Risk';
    if (this.transaction.fraudScore >= 0.6) return 'Medium Risk';
    return 'Low Risk';
  }

  getRiskLevelClass(): string {
    if (!this.transaction) return '';
    if (this.transaction.fraudScore >= 0.8) return 'high-risk';
    if (this.transaction.fraudScore >= 0.6) return 'medium-risk';
    return 'low-risk';
  }

  getFraudExplanation(): string {
    if (!this.transaction) return '';
    
    const explanations: any = {
      'Frequent Transfers Before COE Expiry': `This NRIC (${this.transaction.nric}) has deregistered ${this.transaction.numberOfTransfers} vehicles in the last 2 months, ${this.transaction.numberOfTransfers - 1} of which were transferred right before COE expiry. This pattern suggests potential COE arbitrage activities.`,
      'Late Disposal After Deregistration': `Vehicle ${this.transaction.vehiclePlate} was disposed ${this.getDaysAfterDeregistration()} days after deregistration, which exceeds the normal disposal timeframe and may indicate deliberate delay tactics.`,
      'Commercial Vehicle Under Residential Address': `This commercial vehicle (${this.transaction.vehiclePlate}) is registered under a residential address (${this.transaction.address}), which may violate commercial vehicle regulations and suggest fraudulent registration practices.`
    };

    return explanations[this.transaction.flaggingReason] || 'Suspicious transaction pattern detected by AI fraud detection system.';
  }

  getPatternInsight(): string {
    return 'Multiple high-value transactions with similar timing patterns detected';
  }

  getRiskFactors(): string {
    if (!this.transaction) return '';
    const factors = [];
    if (this.transaction.numberOfTransfers > 3) factors.push('High transfer frequency');
    if (this.transaction.insuranceStatus === 'Expired') factors.push('Insurance issues');
    if (this.transaction.fraudScore > 0.8) factors.push('High AI confidence score');
    return factors.join(', ') || 'Standard risk profile';
  }

  getHistoricalInsight(): string {
    return '15% above average suspicious activity for this vehicle class in the past quarter';
  }

  getDaysAfterDeregistration(): number {
    if (!this.transaction) return 0;
    const deregDate = new Date(this.transaction.deregistrationDate);
    const today = new Date();
    return Math.floor((today.getTime() - deregDate.getTime()) / (1000 * 3600 * 24));
  }

  onClose() {
    this.close.emit();
  }

  onOverlayClick(event: any) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}