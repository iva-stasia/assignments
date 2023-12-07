import { Calculator, calculate } from './calculator';
import { BookService } from './book-service';

const calculator = new Calculator();

calculate(calculator, 'add', 3, 6);

const bookService = new BookService();

bookService.findBook('Through the looking glass');
bookService.findAuthor('Lewis Carroll');
