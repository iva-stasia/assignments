// 1. Напишіть функцію isString, яка перевірятиме, чи є передане значення рядком.
// Потім використовуйте її для звуження типу змінної.

function isString(value: string | number | boolean): value is string {
  return typeof value === "string";
}

// 2. У вас є масив з елементами різних типів. Напишіть функцію, яка приймає цей масив і фільтрує його так,
// щоб у підсумку в ньому залишилися тільки рядки. Використовуйте захисника типу для цього завдання.

function filterToStrings(array: (string | number | boolean)[]): string[] {
  return array.filter((element): element is string => isString(element));
}

// 3. У вас є об'єкт, який може містити довільні властивості. Напишіть функцію, яка приймає цей об'єкт
// і повертає значення однієї з властивостей, якщо воно існує і має певний тип.

interface Obj {
  [key: string]: any;
}

function getObjStringProperty(obj: Obj, property: string): string | undefined {
  if (property in obj && isString(obj.property)) {
    return obj.property;
  }
}

// 4. Створіть кілька захисників типу, кожен з яких перевіряє певний аспект об'єкта
// (наприклад, наявність певної властивості або її тип). Потім напишіть функцію,
// яка використовує цих захисників у комбінації для звуження типу об'єкта до більш конкретного типу.

interface Stone {
  type: string;
}

interface Bird {
  breed: string;
  fly: () => void;
}

interface Fish {
  breed: string;
  swim: () => void;
}

function isStone(natureObj: Bird | Fish | Stone): natureObj is Stone {
  return "type" in natureObj;
}

function isBird(animal: Bird | Fish): animal is Bird {
  return "fly" in animal;
}

function makeObjFly(animal: Bird | Fish | Stone): void {
  if (!isStone(animal) && isBird(animal)) {
    animal.fly();
  }
}

// 5. У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок або число).
// Напишіть функцію, яка приймає цю змінну і виконує довільні операції, специфічні для кожного з типів.

function manipulate(value: string | number): string {
  if (isString(value)) {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}

// 6. Створіть захисник типу, який перевірятиме, чи є передане значення функцією.
// Потім напишіть функцію, яка використовує цей гард для звуження типу змінної і викликає передану функцію,
// якщо вона існує.

function isFunction(value: string | number | Function): value is Function {
  return typeof value === "function";
}

function callFunction(func: string | number | Function): void {
  if (isFunction(func)) {
    func();
  }
}

// 7. Створіть класи з ієрархією успадкування і потім напишіть функцію, яка використовує захисник типу
// для звуження типу об'єктів, що базуються на цій ієрархії.

class Candy {
  constructor(public manufacturer: string) {}
}

class ChocolateCandy extends Candy {
  constructor(
    manufacturer: string,
    public readonly chocolateType: "dark | milk | white"
  ) {
    super(manufacturer);
  }
}

function isChocolateCandy(
  candy: Candy | ChocolateCandy
): candy is ChocolateCandy {
  return candy instanceof ChocolateCandy && "chocolateType" in candy;
}

function showDetails(candy: Candy | ChocolateCandy): void {
  if (isChocolateCandy(candy)) {
    console.log(
      "manufacturer: ",
      candy.manufacturer,
      "chocolate: ",
      candy.chocolateType
    );
  } else {
    console.log("manufacturer: ", candy.manufacturer);
  }
}
