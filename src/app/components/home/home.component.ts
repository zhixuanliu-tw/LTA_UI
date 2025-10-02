import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { ChartsComponent } from '../charts/charts.component';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
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
    WhyFlaggedPanelComponent
  ],
  template: `
    <app-header></app-header>
    
    <main class="main-content">
      <!-- Upload Section - Always visible -->
      <div class="upload-section">
        <div class="upload-container">
          <div class="upload-area" (click)="triggerFileInput()">
            <input 
              #fileInput 
              type="file" 
              accept=".csv" 
              style="display: none" 
              (change)="onFileSelected($event)">
            <div class="upload-icon">📁</div>
            <p>Upload CSV file for fraud analysis</p>
            <button class="upload-btn">Choose File</button>
          </div>
          <div class="upload-status" *ngIf="uploadedFileName">
            <span class="status-icon">✅</span>
            <span class="status-text">{{uploadedFileName}} uploaded successfully</span>
          </div>
        </div>
      </div>

      <!-- Filter Panel - Always visible -->
      <app-filter-panel 
        [filters]="filters"
        (filtersChanged)="onFiltersChanged($event)">
      </app-filter-panel>
      
      <!-- Charts and Table - Only visible after upload -->
      <div *ngIf="hasData">
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

      <!-- No Data Message -->
      <div *ngIf="!hasData" class="no-data-message">
        <div class="no-data-content">
          <div class="no-data-icon">📊</div>
          <h3>No Data Available</h3>
          <p>Please upload a CSV file to view fraud analysis results</p>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 80px);
      padding: 0;
    }

    .upload-section {
      background: #f8f9fa;
      padding: 2rem 0;
      border-bottom: 1px solid #e9ecef;
    }

    .upload-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .upload-area {
      display: flex;
      align-items: center;
      gap: 1rem;
      border: 2px dashed #FEC900;
      border-radius: 8px;
      padding: 1rem 2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      background: white;
    }

    .upload-area:hover {
      border-color: #222349;
      background: #fefefe;
    }

    .upload-icon {
      font-size: 2rem;
    }

    .upload-area p {
      color: #666;
      font-size: 1rem;
      margin: 0;
    }

    .upload-btn {
      background: #FEC900;
      color: #222349;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .upload-btn:hover {
      background: #222349;
      color: #FEC900;
    }

    .upload-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #d4edda;
      color: #155724;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      border: 1px solid #c3e6cb;
    }

    .status-icon {
      font-size: 1.2rem;
    }

    .status-text {
      font-weight: 500;
    }

    .no-data-message {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 2rem;
    }

    .no-data-content {
      text-align: center;
      max-width: 400px;
    }

    .no-data-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .no-data-content h3 {
      color: #222349;
      font-size: 1.5rem;
      margin: 0 0 1rem 0;
    }

    .no-data-content p {
      color: #666;
      font-size: 1rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      .upload-container {
        padding: 0 1rem;
        flex-direction: column;
        align-items: stretch;
      }

      .upload-area {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem;
      }
    }
  `]
})
export class HomeComponent {
  hasData: boolean = false;
  uploadedFileName: string = '';
  
  selectedTransaction: any = null;
  highlightedRow: number = -1;
  
  filters = {
    startDate: '',
    endDate: '',
    vehicleType: 'all',
    deregistrationReason: 'all',
    accountType: 'all'
  };

  mockTransactions = [
    {
      vehiclePlate: 'SBA1234A',
      vehicleType: 'Motor Car',
      effectiveOwnershipDate: '2023-08-15',
      deregistrationDate: '2024-01-15',
      deregistrationReason: 'Direct Exported',
      disposalDeadline: '2024-02-15',
      accountType: 'Singapore NRIC',
      ownerId: 'S12***67A',
      fraudScore: 0.92,
      flaggingReason: 'Frequent Transfers Before COE Expiry'
    },
    {
      vehiclePlate: 'SBB5678B',
      vehicleType: 'Motorcycle',
      effectiveOwnershipDate: '2023-09-20',
      deregistrationDate: '2024-01-14',
      deregistrationReason: 'Scrapped',
      disposalDeadline: '2024-02-14',
      accountType: 'Company',
      ownerId: 'C34***89B',
      fraudScore: 0.78,
      flaggingReason: 'Late Disposal After Deregistration'
    },
    {
      vehiclePlate: 'SCC9012C',
      vehicleType: 'Lorry',
      effectiveOwnershipDate: '2023-07-10',
      deregistrationDate: '2024-01-13',
      deregistrationReason: 'Apply PARF',
      disposalDeadline: '2024-02-13',
      accountType: 'Business',
      ownerId: 'B56***12C',
      fraudScore: 0.85,
      flaggingReason: 'Commercial Vehicle Under Residential Address'
    }
  ];

  filteredTransactions = [...this.mockTransactions];

  chartData = {
    monthlyTrends: [
      { month: 'Jan', count: 45 },
      { month: 'Feb', count: 52 },
      { month: 'Mar', count: 38 },
      { month: 'Apr', count: 61 },
      { month: 'May', count: 47 },
      { month: 'Jun', count: 55 },
      { month: 'Jul', count: 42 },
      { month: 'Aug', count: 58 },
      { month: 'Sep', count: 49 }
    ],
    accountTypes: [
      { label: 'Singapore NRIC', value: 45 },
      { label: 'Company', value: 30 },
      { label: 'Business', value: 20 },
      { label: 'Foreign Identification', value: 5 }
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
      this.uploadedFileName = file.name;
      // Simulate file processing
      setTimeout(() => {
        this.hasData = true;
        this.applyFilters();
      }, 1000);
    }
  }

  onFiltersChanged(newFilters: any) {
    this.filters = newFilters;
    this.applyFilters();
  }

  applyFilters() {
    if (!this.hasData) return;

    // Apply filters to transactions
    this.filteredTransactions = this.mockTransactions.filter(transaction => {
      // Date range filter
      if (this.filters.startDate && this.filters.endDate) {
        const transactionDate = new Date(transaction.effectiveOwnershipDate);
        const startDate = new Date(this.filters.startDate);
        const endDate = new Date(this.filters.endDate);
        if (transactionDate < startDate || transactionDate > endDate) {
          return false;
        }
      }

      // Vehicle type filter
      if (this.filters.vehicleType !== 'all' && transaction.vehicleType !== this.filters.vehicleType) {
        return false;
      }

      // Deregistration reason filter
      if (this.filters.deregistrationReason !== 'all' && transaction.deregistrationReason !== this.filters.deregistrationReason) {
        return false;
      }

      // Account type filter
      if (this.filters.accountType !== 'all' && transaction.accountType !== this.filters.accountType) {
        return false;
      }

      return true;
    });

    // Update chart data based on filtered transactions
    this.updateChartData();
  }

  updateChartData() {
    // Update account types chart based on filtered data
    const accountTypeCounts: any = {};
    
    this.filteredTransactions.forEach(transaction => {
      accountTypeCounts[transaction.accountType] = (accountTypeCounts[transaction.accountType] || 0) + 1;
    });

    this.filteredChartData = {
      ...this.chartData,
      accountTypes: Object.keys(accountTypeCounts).map(key => ({
        label: key,
        value: accountTypeCounts[key]
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