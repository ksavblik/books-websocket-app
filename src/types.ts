export interface Book {
  id: number;
  title: string;
  author: string;
  price?: string;
  publishDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  updated?: boolean;
  deleted?: boolean;
}

export interface CreateBook {
  id?: number;
  title?: string;
  author?: string;
  price?: string;
  publishDate?: Date;
}

export interface UpdateBook {
  title?: string;
  author?: string;
  price?: string;
  publishDate?: Date;
  updatedAt: Date;
}

export interface ErrorDetails {
  error?: string;
  statusCode?: string;
}