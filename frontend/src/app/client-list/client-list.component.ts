import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent {
  allClients: any[] = [];
  clients: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  sortBy: string = ''; // Column to sort by
  sortDirection: string = 'asc'; // 'asc' or 'desc'
  isLoading: boolean = true; // Track loading state

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    const url = 'https://retoolapi.dev/HYd96h/data';
    this.isLoading = true; // Start loading
    this.http.get<any[]>(url).subscribe((data) => {
      this.allClients = data;
      this.totalItems = data.length;
      this.updatePageData();
      this.isLoading = false; // Stop loading after data is fetched
    });
  }

  updatePageData(): void {
    let sortedClients = [...this.allClients];

    // Sort by the selected column if specified
    if (this.sortBy) {
      sortedClients.sort((a, b) => {
        const valueA = a[this.sortBy];
        const valueB = b[this.sortBy];

        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.clients = sortedClients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePageData();
  }

  totalPageCount(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  sortTable(column: string): void {
    if (this.sortBy === column) {
      // Toggle the sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the column and default to ascending
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.updatePageData();
  }
}
