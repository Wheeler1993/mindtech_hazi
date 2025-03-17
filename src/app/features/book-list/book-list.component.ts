import { Component, computed, signal } from '@angular/core';
import { Book, BookStatus } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books = signal<Book[]>([]);
  filteredBooks = computed(() =>
    this.books().filter(b => !this.statusFilter() || b.status === this.statusFilter())
  );

  bookStatuses: BookStatus[] = ['Read', 'Want to Read'];

  statusFilterRaw: BookStatus = '';
  statusFilter = signal<BookStatus>('');


  constructor(private bookService: BookService) {
    this.books.set(this.bookService.getBookList());
  }

  filterByStatus() {
    this.statusFilter.set(this.statusFilterRaw)
  }

  saveBooks() {
    this.bookService.updateBookList(this.books());
  }

}
