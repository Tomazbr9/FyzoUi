import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TransactionsService } from '../../../core/services/transactions.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe(data => {
      console.log(data);
    });
  }

}
