import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book, BookStatus } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import { Router } from '@angular/router';

interface CreateBookForm {
  title: string;
  author: string;
  status: BookStatus;
}

@Component({
  selector: 'app-create-book',
  imports: [ReactiveFormsModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {
  form: FormGroup;

  bookStatuses: BookStatus[] = ['Read', 'Want to Read'];
  constructor(private formBuilder: FormBuilder, private bookServie: BookService, private router: Router) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      status: ''
    })
  }

  onSubmit() {
    const books = this.bookServie.getBookList();
    const newBook: Book = {
      id: Math.random(),
      title: this.form.value.title,
      author: this.form.value.author,
      status: this.form.value.status
    }
    books.push(newBook);

    this.bookServie.persistBookList(books);

    this.router.navigate(['']);
  }
}
