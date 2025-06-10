import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon>analytics</mat-icon>
      <span style="margin-left: 8px;">データ分析ダッシュボード</span>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'data-analysis-frontend';
}