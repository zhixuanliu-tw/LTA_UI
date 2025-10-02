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
          <div class="filter-group date-range-group">
            <div class="date-range-inputs">
              <div class="date-input-wrapper">
                <label for="startDate" class="date-label">Start Date</label>
                <input 
                  id="startDate"
                  type="date"
                  [(ngModel)]="filters.startDate"
                  (change)="onFilterChange()"
                  class="date-input">
              </div>
              <div class="date-input-wrapper">
                <label for="endDate" class="date-label">End Date</label>
                <input 
                  id="endDate"
                  type="date"
                  [(ngModel)]="filters.endDate"
                  (change)="onFilterChange()"
                  class="date-input">
              </div>
            </div>
          </div>

          <div class="filter-group">
            <label for="vehicleType">Vehicle Type</label>
            <select 
              id="vehicleType"
              [(ngModel)]="filters.vehicleType"
              (change)="onFilterChange()"
              class="filter-select">
              <option value="all">All Types</option>
              <option value="Motor Car">Motor Car</option>
              <option value="Taxi">Taxi</option>
              <option value="Scooter">Scooter</option>
              <option value="Bus">Bus</option>
              <option value="Lorry">Lorry</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="deregistrationReason">Deregistration Reason</label>
            <select 
              id="deregistrationReason"
              [(ngModel)]="filters.deregistrationReason"
              (change)="onFilterChange()"
              class="filter-select">
              <option value="all">All Reasons</option>
              <option value="Direct Exported">Direct Exported</option>
              <option value="Export Zone">Export Zone</option>
              <option value="Scrapped">Scrapped</option>
              <option value="Apply PARF">Apply PARF</option>
              <option value="Stolen">Stolen</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="accountType">Account Type</label>
            <select 
              id="accountType"
              [(ngModel)]="filters.accountType"
              (change)="onFilterChange()"
              class="filter-select">
              <option value="all">All Types</option>
              <option value="Company">Company</option>
              <option value="Business">Business</option>
              <option value="Singapore NRIC">Singapore NRIC</option>
              <option value="Foreign Identification">Foreign Identification</option>
            </select>
          </div>
        </div>

        <div class="filter-actions">
          <button class="clear-filters-btn" (click)="clearFilters()">
            Clear All Filters
          </button>
          <div class="results-count">
            <span class="count-text">Use filters to refine your search</span>
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
      grid-template-columns: 2fr 1fr 1fr 1fr;
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

    .date-range-group {
      grid-column: span 1;
    }

    .date-range-inputs {
      display: flex;
      gap: 1rem;
    }

    .date-input-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .date-label {
      color: #666;
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }

    .date-input {
      padding: 10px 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 0.9rem;
      background: white;
      transition: all 0.3s ease;
    }

    .date-input:focus {
      outline: none;
      border-color: #FEC900;
      box-shadow: 0 0 0 2px rgba(254, 201, 0, 0.2);
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

    .filter-select:hover,
    .date-input:hover {
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

    @media (max-width: 1200px) {
      .filter-grid {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .date-range-group {
        grid-column: span 2;
      }
    }

    @media (max-width: 768px) {
      .filter-container {
        padding: 0 1rem;
      }

      .filter-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .date-range-group {
        grid-column: span 1;
      }

      .date-range-inputs {
        flex-direction: column;
        gap: 0.5rem;
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
      startDate: '',
      endDate: '',
      vehicleType: 'all',
      deregistrationReason: 'all',
      accountType: 'all'
    };
    this.filtersChanged.emit(this.filters);
  }
}