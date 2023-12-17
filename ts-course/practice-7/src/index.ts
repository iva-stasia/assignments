// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання.
// Наприклад, тип значення для кожного ключа може бути число | рядок.

interface IBill {
  [service: string]: number | string;
}

// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями.
// Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи.

interface IManipulator {
  [operation: string]: (...rest: any[]) => any;
}

// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву.
// Ключі повинні бути числами, а значення - певного типу.

interface IContents {
  [index: number]: string;
}

// Створіть інтерфейс з певними властивостями та індексною сигнатурою.
// Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.

interface IDictionary {
  language: string;
  [word: string]: string;
}

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.

interface IStudentAverageGradeList {
  [studentName: string]: number;
}

interface IGroupAverageGradeList extends IStudentAverageGradeList {
  groupAverageGrade: number;
}

// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє,
// чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).

type requiredType = "string" | "number";

function checkObjectValuesType(
  obj: IBill,
  keys: string[],
  requiredType: requiredType
): boolean {
  const result = keys.every(
    (key) => obj.hasOwnProperty(key) && typeof obj[key] === requiredType
  );

  return result;
}
