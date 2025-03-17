import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Read' },
    { id: 2, title: '1984', author: 'George Orwell', status: '' },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', status: 'Read' },
    { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger', status: 'Want to Read' }
  ]

  constructor() { }

  persistBookList(books: Book[]) {
    localStorage["books"] = JSON.stringify(books);
  }

  getBookList(): Book[] {
    if (localStorage["books"]) {
      return JSON.parse(localStorage["books"]);
    } else {
      return this.books;
    }
  }
}
