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
          <h3>Fraud Detection Summary</h3>
          <p>Overview of flagged transactions and suspicious patterns</p>
        </div>
        
        <div class="charts-grid">
          <!-- Vehicle Class Distribution Chart -->
          <div class="chart-card">
            <div class="chart-header">
              <h4>Flagged Transactions by Vehicle Class</h4>
            </div>
            <div class="pie-chart-container">
              <div class="pie-chart" #vehicleChart>
                <div class="chart-center">
                  <span class="chart-total">{{getTotalVehicles()}}</span>
                  <span class="chart-label">Total</span>
                </div>
                <svg viewBox="0 0 200 200" class="pie-svg">
                  <circle
                    *ngFor="let segment of getVehicleSegments(); let i = index"
                    [attr.cx]="100"
                    [attr.cy]="100"
                    [attr.r]="80"
                    [attr.stroke]="getColor(i)"
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
                  *ngFor="let item of chartData.vehicleClass; let i = index" 
                  class="legend-item">
                  <span class="legend-color" [style.background-color]="getColor(i)"></span>
                  <span class="legend-label">{{item.label}}</span>
                  <span class="legend-value">{{item.value}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Flagging Reasons Distribution Chart -->
          <div class="chart-card">
            <div class="chart-header">
              <h4>Suspicious Reason Category Distribution</h4>
            </div>
            <div class="pie-chart-container">
              <div class="pie-chart">
                <div class="chart-center">
                  <span class="chart-total">{{getTotalReasons()}}</span>
                  <span class="chart-label">Cases</span>
                </div>
                <svg viewBox="0 0 200 200" class="pie-svg">
                  <circle
                    *ngFor="let segment of getReasonSegments(); let i = index"
                    [attr.cx]="100"
                    [attr.cy]="100"
                    [attr.r]="80"
                    [attr.stroke]="getReasonColor(i)"
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
                  *ngFor="let item of chartData.flaggingReasons; let i = index" 
                  class="legend-item">
                  <span class="legend-color" [style.background-color]="getReasonColor(i)"></span>
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
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
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

    @media (max-width: 768px) {
      .charts-container {
        padding: 0 1rem;
      }

      .charts-grid {
        grid-template-columns: 1fr;
      }

      .pie-chart-container {
        flex-direction: column;
        gap: 1.5rem;
      }

      .chart-legend {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class ChartsComponent {
  @Input() chartData: any = { vehicleClass: [], flaggingReasons: [] };

  colors = ['#222349', '#FEC900', '#28a745', '#dc3545', '#6f42c1', '#fd7e14'];
  reasonColors = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71', '#9b59b6', '#1abc9c'];

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  getReasonColor(index: number): string {
    return this.reasonColors[index % this.reasonColors.length];
  }

  getTotalVehicles(): number {
    return this.chartData.vehicleClass.reduce((sum: number, item: any) => sum + item.value, 0);
  }

  getTotalReasons(): number {
    return this.chartData.flaggingReasons.reduce((sum: number, item: any) => sum + item.value, 0);
  }

  getVehicleSegments(): any[] {
    const total = this.getTotalVehicles();
    if (total === 0) return [];

    let offset = 0;
    return this.chartData.vehicleClass.map((item: any) => {
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

  getReasonSegments(): any[] {
    const total = this.getTotalReasons();
    if (total === 0) return [];

    let offset = 0;
    return this.chartData.flaggingReasons.map((item: any) => {
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