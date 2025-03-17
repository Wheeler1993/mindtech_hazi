import { Component, computed, signal } from '@angular/core';
import { Book, BookStatus } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  statusFilter = signal<BookStatus>('');

  bookStatuses: BookStatus[] = ['Read', 'Want to Read'];
  constructor(private bookService: BookService, private router: Router) {
    this.books.set(this.bookService.getBookList());
  }

  saveBooks() {
    this.bookService.persistBookList(this.books());
  }

  navigateToAddNewBook() {
    this.router.navigate(['create']);
  }

  deleteBook(id: number) {
    const updatedBooks = this.books().filter(book => book.id !== id);
    this.books.set(updatedBooks);
    this.saveBooks();
  }
}
