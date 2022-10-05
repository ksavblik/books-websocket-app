import dayjs from 'dayjs';
type DateField = Date | dayjs.Dayjs | string;

export interface Book {
  id: number;
  title: string;
  author: string;
  price?: string;
  publishDate?: DateField | null;
  createdAt: DateField;
  updatedAt: DateField;
  updated?: boolean;
  deleted?: boolean;
}

export interface CreateBook {
  title: string;
  author: string;
  price?: string;
  publishDate?: DateField | null;
}

export interface UpdateBook {
  id: number;
  title?: string;
  author?: string;
  price?: string;
  publishDate?: DateField | null;
  updatedAt: DateField;
}

export interface ErrorDetails {
  error?: string;
  statusCode?: string;
}