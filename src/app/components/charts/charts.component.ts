import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="charts-section">
      <div class="charts-container">
        <div class="charts-header">
          <h3>Fraud Detection Analytics</h3>
          <p>Monthly trends and account type distribution of suspicious transactions</p>
        </div>
        
        <div class="charts-grid">
          <!-- Monthly Trends Bar Chart -->
          <div class="chart-card">
            <div class="chart-header">
              <h4>Monthly Suspicious Transaction Trends (2025)</h4>
            </div>
            <div class="bar-chart-container">
              <div class="bar-chart">
                <div class="chart-bars">
                  <div 
                    *ngFor="let item of chartData.monthlyTrends; let i = index" 
                    class="bar-wrapper">
                    <div 
                      class="bar" 
                      [style.height.%]="getBarHeight(item.count)"
                      [style.background-color]="getBarColor(i)">
                    </div>
                    <span class="bar-value">{{item.count}}</span>
                    <span class="bar-label">{{item.month}}</span>
                  </div>
                </div>
                <div class="chart-y-axis">
                  <div class="y-axis-label" *ngFor="let tick of getYAxisTicks()">{{tick}}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Types Pie Chart -->
          <div class="chart-card">
            <div class="chart-header">
              <h4>Suspicious Transactions by Account Type</h4>
            </div>
            <div class="pie-chart-container">
              <div class="pie-chart">
                <div class="chart-center">
                  <span class="chart-total">{{getTotalAccountTypes()}}</span>
                  <span class="chart-label">Total</span>
                </div>
                <svg viewBox="0 0 200 200" class="pie-svg">
                  <circle
                    *ngFor="let segment of getAccountTypeSegments(); let i = index"
                    [attr.cx]="100"
                    [attr.cy]="100"
                    [attr.r]="80"
                    [attr.stroke]="getAccountTypeColor(i)"
                    [attr.stroke-width]="20"
                    [attr.stroke-dasharray]="segment.circumference + ' ' + (503 - segment.circumference)"
                    [attr.stroke-dashoffset]="segment.offset"
                    fill="transparent"
                    [attr.transform]="'rotate(-90 100 100)'"
                  />
                </svg>
              </div>
              <div class="chart-legend">
                <div 
                  *ngFor="let item of chartData.accountTypes; let i = index" 
                  class="legend-item">
                  <span class="legend-color" [style.background-color]="getAccountTypeColor(i)"></span>
                  <span class="legend-label">{{item.label}}</span>
                  <span class="legend-value">{{item.value}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .charts-section {
      padding: 2rem 0;
      background: white;
    }

    .charts-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .charts-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .charts-header h3 {
      color: #222349;
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .charts-header p {
      color: #666;
      font-size: 1rem;
      margin: 0;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .chart-card {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      border: 1px solid #e9ecef;
    }

    .chart-header h4 {
      color: #222349;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 1.5rem 0;
      text-align: center;
    }

    /* Bar Chart Styles */
    .bar-chart-container {
      height: 300px;
      position: relative;
    }

    .bar-chart {
      display: flex;
      height: 100%;
      position: relative;
    }

    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      flex: 1;
      height: 250px;
      padding: 0 20px 40px 40px;
      position: relative;
    }

    .bar-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      max-width: 60px;
    }

    .bar {
      width: 100%;
      min-height: 4px;
      border-radius: 4px 4px 0 0;
      transition: all 0.3s ease;
      position: relative;
    }

    .bar:hover {
      opacity: 0.8;
      transform: translateY(-2px);
    }

    .bar-value {
      font-size: 0.8rem;
      font-weight: 600;
      color: #222349;
      margin-top: 4px;
    }

    .bar-label {
      font-size: 0.8rem;
      color: #666;
      margin-top: 8px;
      font-weight: 500;
    }

    .chart-y-axis {
      position: absolute;
      left: 0;
      top: 0;
      height: 250px;
      width: 40px;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      padding: 0 0 40px 0;
    }

    .y-axis-label {
      font-size: 0.7rem;
      color: #666;
      text-align: right;
      padding-right: 8px;
    }

    /* Pie Chart Styles */
    .pie-chart-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }

    .pie-chart {
      position: relative;
      width: 200px;
      height: 200px;
    }

    .pie-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .chart-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .chart-total {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: #222349;
    }

    .chart-label {
      font-size: 0.9rem;
      color: #666;
    }

    .chart-legend {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
    }

    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .legend-label {
      flex: 1;
      color: #333;
      font-weight: 500;
    }

    .legend-value {
      color: #222349;
      font-weight: 600;
      min-width: 30px;
      text-align: right;
    }

    @media (max-width: 1200px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .charts-container {
        padding: 0 1rem;
      }

      .pie-chart-container {
        flex-direction: column;
        gap: 1.5rem;
      }

      .chart-legend {
        width: 100%;
        max-width: 300px;
      }

      .bar-chart-container {
        height: 250px;
      }

      .chart-bars {
        height: 200px;
        padding: 0 10px 30px 30px;
      }

      .chart-y-axis {
        height: 200px;
        width: 30px;
      }
    }
  `]
})
export class ChartsComponent {
  @Input() chartData: any = { monthlyTrends: [], accountTypes: [] };

  barColors = ['#222349', '#FEC900', '#28a745', '#dc3545', '#6f42c1', '#fd7e14', '#17a2b8', '#6c757d', '#343a40'];
  accountTypeColors = ['#222349', '#FEC900', '#28a745', '#dc3545'];

  getBarColor(index: number): string {
    return this.barColors[index % this.barColors.length];
  }

  getAccountTypeColor(index: number): string {
    return this.accountTypeColors[index % this.accountTypeColors.length];
  }

  getBarHeight(count: number): number {
    const maxCount = Math.max(...this.chartData.monthlyTrends.map((item: any) => item.count));
    return Math.max((count / maxCount) * 100, 8); // Minimum 8% height for visibility
  }

  getYAxisTicks(): number[] {
    const maxCount = Math.max(...this.chartData.monthlyTrends.map((item: any) => item.count));
    const step = Math.ceil(maxCount / 4); // Use 4 steps instead of 5 for better scaling
    return Array.from({ length: 5 }, (_, i) => i * step);
  }

  getTotalAccountTypes(): number {
    return this.chartData.accountTypes.reduce((sum: number, item: any) => sum + item.value, 0);
  }

  getAccountTypeSegments(): any[] {
    const total = this.getTotalAccountTypes();
    if (total === 0) return [];

    let offset = 0;
    return this.chartData.accountTypes.map((item: any) => {
      const percentage = item.value / total;
      const circumference = percentage * 503; // 2 * π * 80
      const segment = {
        circumference,
        offset
      };
      offset -= circumference;
      return segment;
    });
  }
}