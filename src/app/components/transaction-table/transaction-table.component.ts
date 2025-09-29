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
          </div>
        </div>
        
        <div class="table-wrapper" [class.scroll-right]="scrollToRight">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Fraud Score</th>
                <th>NRIC</th>
                <th>Name</th>
                <th>Address</th>
                <th>Vehicle Plate</th>
                <th>Vehicle Class</th>
                <th>Deregistration Date</th>
                <th>COE Expiry</th>
                <th>Insurance Status</th>
                <th>Number of Transfers</th>
                <th>Flagging Reason</th>
                <th>Case Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                *ngFor="let transaction of transactions; let i = index"
                [class.highlighted]="highlightedRow === i"
                class="transaction-row">
                <td class="transaction-id">{{transaction.id}}</td>
                <td>{{formatDate(transaction.date)}}</td>
                <td>
                  <span class="fraud-score" [ngClass]="getFraudScoreClass(transaction.fraudScore)">
                    {{(transaction.fraudScore * 100).toFixed(0)}}%
                  </span>
                </td>
                <td class="nric">{{transaction.nric}}</td>
                <td class="name">{{transaction.name}}</td>
                <td class="address">{{transaction.address}}</td>
                <td class="vehicle-plate">{{transaction.vehiclePlate}}</td>
                <td>{{transaction.vehicleClass}}</td>
                <td>{{formatDate(transaction.deregistrationDate)}}</td>
                <td>{{formatDate(transaction.coeExpiry)}}</td>
                <td>
                  <span class="insurance-status" [ngClass]="getInsuranceStatusClass(transaction.insuranceStatus)">
                    {{transaction.insuranceStatus}}
                  </span>
                </td>
                <td class="transfers-count">{{transaction.numberOfTransfers}}</td>
                <td class="flagging-reason">{{transaction.flaggingReason}}</td>
                <td>
                  <span class="case-status" [ngClass]="getCaseStatusClass(transaction.caseStatus)">
                    {{transaction.caseStatus}}
                  </span>
                </td>
                <td class="actions">
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

    .insurance-status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .insurance-status.active {
      background: #d4edda;
      color: #155724;
    }

    .insurance-status.expired {
      background: #f8d7da;
      color: #721c24;
    }

    .transfers-count {
      text-align: center;
      font-weight: 600;
      color: #222349;
    }

    .flagging-reason {
      max-width: 250px;
      font-size: 0.8rem;
      line-height: 1.4;
    }

    .case-status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .case-status.under-investigation {
      background: #fff3cd;
      color: #856404;
    }

    .case-status.pending-review {
      background: #d1ecf1;
      color: #0c5460;
    }

    .case-status.high-priority {
      background: #f8d7da;
      color: #721c24;
    }

    .actions {
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
}