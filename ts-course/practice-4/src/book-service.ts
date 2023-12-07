type BookCoverType = 'paperback' | 'hardcover';

enum BookGenres {
    FICTION = 'Fiction',
    MYSTERY = 'Mystery',
    SCIENCE_FICTION = 'Science Fiction',
    FANTASY = 'Fantasy',
    ROMANCE = 'Romance',
    HORROR = 'Horror',
    THRILLER = 'Thriller',
    NON_FICTION = 'Non-Fiction',
    BIOGRAPHY = 'Biography',
    HISTORY = 'History',
    POETRY = 'Poetry',
}

enum Messages {
    BOOK_NOT_FOUND = 'Book not found. Try another title.',
    AUTHOR_NOT_FOUND = 'Author not found. Try another name.',
}

interface IBook {
    title: string;
    author: IAuthor;
    publicationDate: Date;
    publisher: string;
    length: number;
    language: string;
    cover: BookCoverType;
    genres: BookGenres[];
}

interface IAuthor {
    firstName: string;
    surnameName: string;
    bornDate: Date;
    deathDate: Date | null;
    origin: string;
    books: IBook[];
}

interface IBookService {
    _books: IBook[];
    _authors: IAuthor[];
    addBook: (book: IBook) => void;
    addAuthor: (author: IAuthor) => void;
    removeBook: (book: IBook) => void;
    removeAuthor: (author: IAuthor) => void;
    findBook: (title: string) => IBook | Messages.BOOK_NOT_FOUND;
    findAuthor: (name: string) => IAuthor | Messages.AUTHOR_NOT_FOUND;
}

class BookService implements IBookService {
    _books: IBook[] = [];
    _authors: IAuthor[] = [];

    addBook(bookToAdd: IBook): void {
        if (this._books.includes(bookToAdd)) return;

        this._books.push(bookToAdd);
    }

    addAuthor(authorToAdd: IAuthor): void {
        if (this._authors.includes(authorToAdd)) return;

        this._authors.push(authorToAdd);
    }

    removeBook(bookToRemove: IBook): void {
        this._books = this._books.filter((book) => book !== bookToRemove);
    }

    removeAuthor(authorToRemove: IAuthor): void {
        this._authors = this._authors.filter(
            (author) => author !== authorToRemove
        );
    }

    findBook(title: string): IBook | Messages.BOOK_NOT_FOUND {
        const book: IBook | undefined = this._books.find(
            (book) => book.title.toLowerCase() === title.toLowerCase()
        );

        return book || Messages.BOOK_NOT_FOUND;
    }

    findAuthor(name: string): IAuthor | Messages.AUTHOR_NOT_FOUND {
        const author: IAuthor | undefined = this._authors.find(
            (author) =>
                `${author.firstName} ${author.surnameName}`.toLowerCase() ===
                name.toLowerCase()
        );

        return author || Messages.AUTHOR_NOT_FOUND;
    }
}

export { BookService };
