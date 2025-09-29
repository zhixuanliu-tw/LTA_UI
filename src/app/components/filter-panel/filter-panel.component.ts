import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-panel">
      <div class="filter-container">
        <h3 class="filter-title">Filter Transactions</h3>
        
        <div class="filter-grid">
          <div class="filter-group">
            <label for="dateRange">Date Range</label>
            <select 
              id="dateRange"
              [(ngModel)]="filters.dateRange"
              (change)="onFilterChange()"
              class="filter-select">
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="vehicleClass">Vehicle Class</label>
            <select 
              id="vehicleClass"
              [(ngModel)]="filters.vehicleClass"
              (change)="onFilterChange()"
              class="filter-select">
              <option value="all">All Classes</option>
              <option value="Cars">Cars</option>
              <option value="Motorcycles">Motorcycles</option>
              <option value="Lorries">Lorries</option>
              <option value="Buses">Buses</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="transactionType">Transaction Type</label>
            <select 
              id="transactionType"
              [(ngModel)]="filters.transactionType"
              (change)="onFilterChange()"
              class="filter-select">
              <option value="all">All Types</option>
              <option value="deregistration">Deregistration</option>
              <option value="transfer">Vehicle Transfer</option>
              <option value="disposal">Disposal</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="flaggingReason">Flagging Reason</label>
            <select 
              id="flaggingReason"
              [(ngModel)]="filters.flaggingReason"
              (change)="onFilterChange()"
              class="filter-select">
              <option value="all">All Reasons</option>
              <option value="Frequent Transfers Before COE Expiry">Frequent Transfers Before COE Expiry</option>
              <option value="Late Disposal After Deregistration">Late Disposal After Deregistration</option>
              <option value="Commercial Vehicle Under Residential Address">Commercial Vehicle Under Residential Address</option>
              <option value="Multiple Transfers Same NRIC">Multiple Transfers Same NRIC</option>
            </select>
          </div>
        </div>

        <div class="filter-actions">
          <button class="clear-filters-btn" (click)="clearFilters()">
            Clear All Filters
          </button>
          <div class="results-count">
            <span class="count-text">Showing filtered results</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filter-panel {
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      padding: 1.5rem 0;
    }

    .filter-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .filter-title {
      color: #222349;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 1.5rem 0;
    }

    .filter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
    }

    .filter-group label {
      color: #222349;
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .filter-select {
      padding: 10px 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 0.9rem;
      background: white;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .filter-select:focus {
      outline: none;
      border-color: #FEC900;
      box-shadow: 0 0 0 2px rgba(254, 201, 0, 0.2);
    }

    .filter-select:hover {
      border-color: #222349;
    }

    .filter-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #dee2e6;
    }

    .clear-filters-btn {
      background: transparent;
      color: #222349;
      border: 1px solid #222349;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .clear-filters-btn:hover {
      background: #222349;
      color: white;
    }

    .results-count {
      display: flex;
      align-items: center;
    }

    .count-text {
      color: #666;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .filter-container {
        padding: 0 1rem;
      }

      .filter-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .filter-actions {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .clear-filters-btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class FilterPanelComponent {
  @Input() filters: any = {};
  @Output() filtersChanged = new EventEmitter<any>();

  onFilterChange() {
    this.filtersChanged.emit(this.filters);
  }

  clearFilters() {
    this.filters = {
      dateRange: 'all',
      vehicleClass: 'all',
      transactionType: 'all',
      flaggingReason: 'all'
    };
    this.filtersChanged.emit(this.filters);
  }
}