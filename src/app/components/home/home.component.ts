import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { ChartsComponent } from '../charts/charts.component';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { WhyFlaggedPanelComponent } from '../why-flagged-panel/why-flagged-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HeaderComponent, 
    FilterPanelComponent, 
    ChartsComponent, 
    TransactionTableComponent, 
    ChatbotComponent,
    WhyFlaggedPanelComponent
  ],
  template: `
    <app-header></app-header>
    
    <main class="main-content">
      <!-- Wireframe 1: Default View -->
      <div *ngIf="currentView === 'default'" class="upload-section">
        <div class="upload-container">
          <div class="upload-instructions">
            <h2>Upload dataset for fraud analysis</h2>
            <p>Upload your CSV file containing vehicle deregistration transactions for intelligent fraud detection analysis.</p>
          </div>
          
          <div class="upload-area" (click)="triggerFileInput()">
            <input 
              #fileInput 
              type="file" 
              accept=".csv" 
              style="display: none" 
              (change)="onFileSelected($event)">
            <div class="upload-icon">📁</div>
            <p>Click to upload CSV file</p>
            <button class="upload-btn">Choose File</button>
          </div>
        </div>
      </div>

      <!-- Wireframes 2-6: After Upload Views -->
      <div *ngIf="currentView !== 'default'">
        <div class="back-to-upload">
          <button class="back-btn" (click)="goBackToUpload()">
            ← Back to Upload
          </button>
        </div>
        
        <app-filter-panel 
          [filters]="filters"
          (filtersChanged)="onFiltersChanged($event)">
        </app-filter-panel>
        
        <app-charts 
          [chartData]="filteredChartData">
        </app-charts>
        
        <app-transaction-table 
          [transactions]="filteredTransactions"
          [highlightedRow]="highlightedRow"
          (whyFlaggedClicked)="onWhyFlaggedClicked($event)">
        </app-transaction-table>
        
        <app-why-flagged-panel
          *ngIf="selectedTransaction"
          [transaction]="selectedTransaction"
          [isVisible]="!!selectedTransaction"
          (close)="onWhyFlaggedClosed()">
        </app-why-flagged-panel>
      </div>
    </main>
    
    <app-chatbot 
      [isVisible]="currentView !== 'default'">
    </app-chatbot>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 80px);
      padding: 0;
    }

    .upload-section {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 40px 20px;
    }

    .upload-container {
      text-align: center;
      max-width: 600px;
      width: 100%;
    }

    .upload-instructions h2 {
      color: #222349;
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .upload-instructions p {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 3rem;
      line-height: 1.6;
    }

    .upload-area {
      border: 3px dashed #FEC900;
      border-radius: 12px;
      padding: 60px 40px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: #fefefe;
    }

    .upload-area:hover {
      border-color: #222349;
      background: #f8f9fa;
      transform: translateY(-2px);
    }

    .upload-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .upload-area p {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .upload-btn {
      background: #FEC900;
      color: #222349;
      border: none;
      padding: 12px 32px;
      border-radius: 6px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .upload-btn:hover {
      background: #222349;
      color: #FEC900;
      transform: translateY(-1px);
    }

    .back-to-upload {
      padding: 1rem 2rem;
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
    }

    .back-btn {
      background: transparent;
      color: #222349;
      border: 1px solid #222349;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .back-btn:hover {
      background: #222349;
      color: white;
    }

    @media (max-width: 768px) {
      .back-to-upload {
        padding: 1rem;
      }

      .upload-instructions h2 {
        font-size: 2rem;
      }

      .upload-area {
        padding: 40px 20px;
      }
    }
  `]
})
export class HomeComponent {
  currentView: string = 'default';
  
  selectedTransaction: any = null;
  highlightedRow: number = -1;
  
  filters = {
    dateRange: 'all',
    vehicleClass: 'all',
    transactionType: 'all',
    flaggingReason: 'all'
  };

  mockTransactions = [
    {
      id: 'TXN001',
      date: '2024-01-15',
      fraudScore: 0.92,
      nric: 'S12***67A',
      name: 'John Lim',
      address: '123 Marine Parade #05-01',
      vehiclePlate: 'SBA1234A',
      vehicleClass: 'Cars',
      deregistrationDate: '2024-01-15',
      coeExpiry: '2024-02-10',
      insuranceStatus: 'Active',
      numberOfTransfers: 5,
      flaggingReason: 'Frequent Transfers Before COE Expiry',
      caseStatus: 'Under Investigation'
    },
    {
      id: 'TXN002',
      date: '2024-01-14',
      fraudScore: 0.78,
      nric: 'S34***89B',
      name: 'Mary Tan',
      address: '456 Orchard Road #12-34',
      vehiclePlate: 'SBB5678B',
      vehicleClass: 'Motorcycles',
      deregistrationDate: '2024-01-14',
      coeExpiry: '2024-03-01',
      insuranceStatus: 'Expired',
      numberOfTransfers: 3,
      flaggingReason: 'Late Disposal After Deregistration',
      caseStatus: 'Pending Review'
    },
    {
      id: 'TXN003',
      date: '2024-01-13',
      fraudScore: 0.85,
      nric: 'S56***12C',
      name: 'David Wong',
      address: '789 Residential Ave #03-45',
      vehiclePlate: 'SCC9012C',
      vehicleClass: 'Lorries',
      deregistrationDate: '2024-01-13',
      coeExpiry: '2024-01-20',
      insuranceStatus: 'Active',
      numberOfTransfers: 8,
      flaggingReason: 'Commercial Vehicle Under Residential Address',
      caseStatus: 'High Priority'
    }
  ];

  filteredTransactions = [...this.mockTransactions];

  chartData = {
    vehicleClass: [
      { label: 'Cars', value: 45 },
      { label: 'Motorcycles', value: 25 },
      { label: 'Lorries', value: 30 }
    ],
    flaggingReasons: [
      { label: 'Frequent Transfers Before COE Expiry', value: 40 },
      { label: 'Late Disposal After Deregistration', value: 25 },
      { label: 'Commercial Vehicle Under Residential Address', value: 20 },
      { label: 'Multiple Transfers Same NRIC', value: 15 }
    ]
  };

  filteredChartData = { ...this.chartData };

  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Simulate file processing
      setTimeout(() => {
        this.currentView = 'after-upload';
      }, 1000);
    }
  }

  goBackToUpload() {
    this.currentView = 'default';
    this.selectedTransaction = null;
    this.highlightedRow = -1;
  }

  onFiltersChanged(newFilters: any) {
    this.filters = newFilters;
    this.applyFilters();
  }

  applyFilters() {
    // Apply filters to transactions and chart data
    this.filteredTransactions = this.mockTransactions.filter(transaction => {
      if (this.filters.vehicleClass !== 'all' && transaction.vehicleClass !== this.filters.vehicleClass) {
        return false;
      }
      if (this.filters.flaggingReason !== 'all' && transaction.flaggingReason !== this.filters.flaggingReason) {
        return false;
      }
      return true;
    });

    // Update chart data based on filtered transactions
    this.updateChartData();
  }

  updateChartData() {
    // Recalculate chart data based on filtered transactions
    const vehicleClassCounts: any = {};
    const flaggingReasonCounts: any = {};

    this.filteredTransactions.forEach(transaction => {
      vehicleClassCounts[transaction.vehicleClass] = (vehicleClassCounts[transaction.vehicleClass] || 0) + 1;
      flaggingReasonCounts[transaction.flaggingReason] = (flaggingReasonCounts[transaction.flaggingReason] || 0) + 1;
    });

    this.filteredChartData = {
      vehicleClass: Object.keys(vehicleClassCounts).map(key => ({
        label: key,
        value: vehicleClassCounts[key]
      })),
      flaggingReasons: Object.keys(flaggingReasonCounts).map(key => ({
        label: key,
        value: flaggingReasonCounts[key]
      }))
    };
  }

  onWhyFlaggedClicked(transaction: any) {
    this.selectedTransaction = transaction;
  }

  onWhyFlaggedClosed() {
    this.selectedTransaction = null;
  }
}