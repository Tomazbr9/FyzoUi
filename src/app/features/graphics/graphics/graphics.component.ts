import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { TransactionsService } from '../../../core/services/transactions.service';
import { Balance } from '../../../core/interface/balance';
import { SummaryTransaction } from '../../../core/interface/summaryTransaction';

@Component({
  selector: 'app-graphics',
  imports: [BaseChartDirective],
  templateUrl: './graphics.html',
  styleUrl: './graphics.scss'
})
export class GraphicsComponent implements OnInit {
  
  incomeAndExpenseData: ChartData<'doughnut', number[], string> = { labels: [], datasets: [] };
  expensesByCategory: ChartData<'doughnut', number[], string> = { labels: [], datasets: [] };
  revenuesByCategory: ChartData<'doughnut', number[], string> = { labels: [], datasets: [] };

  expenseCategoryLabels: string[] = []
  revenueCategoryLabels: string[] = []

  colorOfExpenseCategories: string[] = []
  colorOfRevenueCategories: string[] = []

  totalExpensesByCategory: number[] = []
  totalRevenuesByCategory: number[] = []

  balance!: Balance;
  summaryExpense: SummaryTransaction[] = []
  summaryRevenue: SummaryTransaction[] = []

  constructor(
    private transactionService: TransactionsService
  ){}

  ngOnInit(): void {
    this.loadBalance()
    this.loadSummaryExpense()
    this.loadSummaryRevenue()
      
  }

  loadBalance(): void {
    this.transactionService.getBalance().subscribe({
      next: (data: Balance) => {
        this.balance = data;
        this.generateRevenueAndExpenseGraph()
      },
      error: (error) => console.error("Error returning balance: ", error) 
    })
  }

  loadSummaryExpense(): void {
    this.transactionService.getExpensesByCategory().subscribe({
      next: (data: SummaryTransaction[]) => {
        this.summaryExpense = data
        this.summaryExpense.forEach(data => (
          this.expenseCategoryLabels.push(data.categoryName),
          this.colorOfExpenseCategories.push(data.color),
          this.totalExpensesByCategory.push(data.total)
        ));
        this.generateExpenseChartByCategory()
      },
      error: (error) => console.error("Error returning summary expenses: ", error) 
    })
  }

  loadSummaryRevenue(): void {
    this.transactionService.getRevenuesByCategory().subscribe({
      next: (data: SummaryTransaction[]) => {
        this.summaryRevenue = data
        this.summaryRevenue.forEach(data => (
          this.revenueCategoryLabels.push(data.categoryName),
          this.colorOfRevenueCategories.push(data.color),
          this.totalRevenuesByCategory.push(data.total)
        ));
        this.generateRevenueChartByCategory()
      },
      error: (error) => console.error("Error returning summary expenses: ", error) 
    })
  }

  generateRevenueAndExpenseGraph(): void {

    this.incomeAndExpenseData = {
      labels: [
        'Receitas',
        'Despesas',
      ],
      datasets: [{
        label: 'R$',
        data: [this.balance.totalRevenue, this.balance.totalExpense],
        backgroundColor: [
          'rgb(22, 163, 74)',
          'rgb(220, 38, 38)',
        ],
        hoverOffset: 4
      }]
    };

  }

  generateExpenseChartByCategory(): void {
    this.expensesByCategory = {
      labels: this.expenseCategoryLabels,
      datasets: [{
        label: 'R$',
        data: this.totalExpensesByCategory,
        backgroundColor: this.colorOfExpenseCategories,
        hoverOffset: 4
      }]
    };
  }

  generateRevenueChartByCategory(): void {
    this.revenuesByCategory = {
      labels: this.revenueCategoryLabels,
      datasets: [{
        label: 'R$',
        data: this.totalRevenuesByCategory,
        backgroundColor: this.colorOfRevenueCategories,
        hoverOffset: 4
      }]
    };
  }
}
