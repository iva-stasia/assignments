// Вам потрібно створити умовний тип, що служить для встановлення типу, що повертається з функції.
// Як параметр типу повинен обов'язково виступати функціональний тип.

type FuncReturnType<T extends Function> = T extends (...args: any[]) => infer U ? U : never;

// Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром (або задовільним)
// та повертає кортеж, де перше значення - це тип, що функція повертає, а другий - тип її параметру

type FuncTypes<T extends (param: any) => any> = T extends (param: infer P) => infer R ? [R, P] : never;

// Створіть тип, який об'єднує властивості двох об'єктів тільки в тому випадку, якщо їхні значення мають спільний тип.
// Наприклад: { a: number; b: string } та { b: string; c: boolean } => { b: string; }

type CombinedType<T, U> = {
  [K in keyof T as K extends keyof U ? (T[K] extends U[K] ? K : never) : never]: T[K];
};
