import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-section">
      <div class="table-container">
        <div class="table-header">
          <h3>Fraudulent Transactions</h3>
          <div class="table-stats">
            <span class="stats-item">
              <strong>{{transactions.length}}</strong> flagged transactions
            </span>
            <span class="stats-item">
              <strong>{{getHighRiskCount()}}</strong> high risk
            </span>
            <button class="download-btn" (click)="downloadCSV()" *ngIf="transactions.length > 0">
              <span class="download-icon">📥</span>
              Download CSV
            </button>
          </div>
        </div>
        
        <div class="table-wrapper" [class.scroll-right]="scrollToRight">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>Vehicle Registration Number</th>
                <th>Vehicle Type</th>
                <th>Effective Ownership Date</th>
                <th>Deregistration Date</th>
                <th>Deregistration Reason</th>
                <th>Disposal Deadline</th>
                <th>Account Type</th>
                <th>Owner ID</th>
                <th>Fraud Score</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                *ngFor="let transaction of transactions; let i = index"
                [class.highlighted]="highlightedRow === i"
                class="transaction-row">
                <td class="vehicle-plate">{{transaction.vehiclePlate}}</td>
                <td>{{transaction.vehicleType}}</td>
                <td>{{formatDate(transaction.effectiveOwnershipDate)}}</td>
                <td>{{formatDate(transaction.deregistrationDate)}}</td>
                <td class="deregistration-reason">{{transaction.deregistrationReason}}</td>
                <td>{{formatDate(transaction.disposalDeadline)}}</td>
                <td class="account-type">{{transaction.accountType}}</td>
                <td class="owner-id">{{transaction.ownerId}}</td>
                <td>
                  <span class="fraud-score" [ngClass]="getFraudScoreClass(transaction.fraudScore)">
                    {{(transaction.fraudScore * 100).toFixed(0)}}%
                  </span>
                </td>
                <td class="remarks">
                  <button 
                    class="why-flagged-btn"
                    [class.highlighted-btn]="highlightedRow === i"
                    (click)="onWhyFlaggedClick(transaction)">
                    Why Flagged?
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table-section {
      padding: 2rem 0;
      background: white;
    }

    .table-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .table-header h3 {
      color: #222349;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .table-stats {
      display: flex;
      gap: 2rem;
    }

    .stats-item {
      color: #666;
      font-size: 0.9rem;
    }

    .stats-item strong {
      color: #222349;
      font-size: 1.1rem;
    }

    .download-btn {
      background: #28a745;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .download-btn:hover {
      background: #218838;
      transform: translateY(-1px);
    }

    .download-icon {
      font-size: 1rem;
    }

    .table-wrapper {
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .transactions-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
      min-width: 1800px;
    }

    .transactions-table th {
      background: #f8f9fa;
      color: #222349;
      font-weight: 600;
      padding: 1rem 0.75rem;
      text-align: left;
      border-bottom: 2px solid #dee2e6;
      white-space: nowrap;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .transactions-table td {
      padding: 0.875rem 0.75rem;
      border-bottom: 1px solid #dee2e6;
      vertical-align: middle;
    }

    .transaction-row:hover {
      background-color: #f8f9fa;
    }

    .transaction-row.highlighted {
      background-color: #fff3cd;
      border-left: 4px solid #FEC900;
    }

    .transaction-id {
      font-weight: 600;
      color: #222349;
    }

    .fraud-score {
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.8rem;
    }

    .fraud-score.high-risk {
      background: #f8d7da;
      color: #721c24;
    }

    .fraud-score.medium-risk {
      background: #fff3cd;
      color: #856404;
    }

    .fraud-score.low-risk {
      background: #d1ecf1;
      color: #0c5460;
    }

    .nric {
      font-family: 'Courier New', monospace;
      font-weight: 600;
    }

    .name {
      font-weight: 500;
    }

    .address {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .vehicle-plate {
      font-family: 'Courier New', monospace;
      font-weight: 600;
      color: #222349;
    }

    .deregistration-reason,
    .account-type {
      max-width: 150px;
      font-size: 0.8rem;
      line-height: 1.4;
    }

    .owner-id {
      font-family: 'Courier New', monospace;
      font-weight: 600;
      color: #222349;
    }

    .remarks {
      text-align: center;
    }

    .why-flagged-btn {
      background: #222349;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .why-flagged-btn:hover {
      background: #FEC900;
      color: #222349;
      transform: translateY(-1px);
    }

    .why-flagged-btn.highlighted-btn {
      background: #FEC900;
      color: #222349;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(254, 201, 0, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(254, 201, 0, 0); }
      100% { box-shadow: 0 0 0 0 rgba(254, 201, 0, 0); }
    }

    @media (max-width: 768px) {
      .table-container {
        padding: 0 1rem;
      }

      .table-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      .table-stats {
        gap: 1rem;
      }

      .download-btn {
        width: 100%;
        justify-content: center;
        margin-top: 1rem;
      }

      .transactions-table {
        font-size: 0.8rem;
      }

      .transactions-table th,
      .transactions-table td {
        padding: 0.5rem;
      }
    }
  `]
})
export class TransactionTableComponent implements OnChanges {
  @Input() transactions: any[] = [];
  @Input() highlightedRow: number = -1;
  @Output() whyFlaggedClicked = new EventEmitter<any>();
  scrollToRight: boolean = false;

  ngOnChanges() {
    // Component change detection
  }

  formatDate(dateString: string): string {
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

  getInsuranceStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '-');
  }

  getCaseStatusClass(status: string): string {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  getHighRiskCount(): number {
    return this.transactions.filter(t => t.fraudScore >= 0.8).length;
  }

  onWhyFlaggedClick(transaction: any) {
    this.whyFlaggedClicked.emit(transaction);
  }

  downloadCSV() {
    const headers = [
      'Vehicle Registration Number',
      'Vehicle Type',
      'Effective Ownership Date',
      'Deregistration Date',
      'Deregistration Reason',
      'Disposal Deadline',
      'Account Type',
      'Owner ID',
      'Fraud Score (%)',
      'Flagging Reason',
      'Fraud Explanation'
    ];

    const csvData = this.transactions.map(transaction => [
      transaction.vehiclePlate,
      transaction.vehicleType,
      this.formatDate(transaction.effectiveOwnershipDate),
      this.formatDate(transaction.deregistrationDate),
      transaction.deregistrationReason,
      this.formatDate(transaction.disposalDeadline),
      transaction.accountType,
      transaction.ownerId,
      (transaction.fraudScore * 100).toFixed(0) + '%',
      transaction.flaggingReason,
      this.getFraudExplanation(transaction)
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `fraudulent_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private getFraudExplanation(transaction: any): string {
    const explanations: any = {
      'Frequent Transfers Before COE Expiry': `This Owner ID (${transaction.ownerId}) has deregistered multiple vehicles in the last 2 months, most of which were transferred right before COE expiry. This pattern suggests potential COE arbitrage activities.`,
      'Late Disposal After Deregistration': `Vehicle ${transaction.vehiclePlate} was disposed ${this.getDaysAfterDeregistration(transaction)} days after deregistration, which exceeds the normal disposal timeframe and may indicate deliberate delay tactics.`,
      'Commercial Vehicle Under Residential Address': `This commercial vehicle (${transaction.vehiclePlate}) is registered under suspicious circumstances, which may violate commercial vehicle regulations and suggest fraudulent registration practices.`
    };

    return explanations[transaction.flaggingReason] || 'Suspicious transaction pattern detected by AI fraud detection system.';
  }

  private getDaysAfterDeregistration(transaction: any): number {
    const deregDate = new Date(transaction.deregistrationDate);
    const today = new Date();
    return Math.floor((today.getTime() - deregDate.getTime()) / (1000 * 3600 * 24));
  }
}