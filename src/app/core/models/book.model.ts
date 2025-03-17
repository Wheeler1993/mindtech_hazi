export interface Book {
    id: number;
    title: string;
    author: string;
    status: BookStatus;
}

export type BookStatus = '' | 'Read' | 'Want to Read';