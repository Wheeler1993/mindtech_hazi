import { Routes } from '@angular/router';
import { BookListComponent } from './features/book-list/book-list.component';
import { CreateBookComponent } from './features/create-book/create-book.component';

export const routes: Routes = [
    { path: '', component: BookListComponent },
    { path: 'create', component: CreateBookComponent }
];
