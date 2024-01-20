// Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом, який вміє приймати причину,
// через яку його не варто використовувати, і назву методу, яким його можна замінити, якщо це можливо.

function DeprecatedMethod(reason: string, replacement?: string) {
  return function <T, A extends any[], R>(
    originalMethod: (...args: A) => R,
    context: ClassMethodDecoratorContext
  ): (this: T, ...args: A) => R {
    function replacementMethod(this: T, ...args: A): R {
      console.log(
        `Method '${String(context.name)}' is deprecated due to ${reason}.${
          replacement ? ` Use method instead ${replacement}` : ""
        }`
      );
      return originalMethod.apply(this, args);
    }

    return replacementMethod;
  };
}

// Створіть декоратори поля MinLength, MaxLength та Email.
// Використайте попередню версію декораторів і зробіть так, щоб їх можно було використовувати разом.

function MinLength(minValue: number) {
  return function <T extends {}>(target: T, propertyKey: string | symbol) {
    let value: string;
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

    if (descriptor) {
      const originalSetter = descriptor.set;

      Object.defineProperty(target, propertyKey, {
        ...descriptor,
        set(newValue: string) {
          if (newValue.length < minValue) {
            throw new Error(`Value cannot be less than ${minValue}`);
          }
          if (originalSetter) {
            originalSetter.call(target, newValue);
          }
        },
      });
    } else {
      Object.defineProperty(target, propertyKey, {
        get() {
          return value;
        },
        set(newValue: string) {
          if (newValue.length < minValue) {
            throw new Error(`Value cannot be less than ${minValue}`);
          }

          value = newValue;
        },
        configurable: true,
        enumerable: true,
      });
    }
  };
}

function MaxLength(maxValue: number) {
  return function <T extends {}>(target: T, propertyKey: string | symbol) {
    let value: string;
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

    if (descriptor) {
      const originalSetter = descriptor.set;

      Object.defineProperty(target, propertyKey, {
        ...descriptor,
        set(newValue: string) {
          if (newValue.length > maxValue) {
            throw new Error(`Value cannot be more than ${maxValue}`);
          }
          if (originalSetter) {
            originalSetter.call(target, newValue);
          }
        },
      });
    } else {
      Object.defineProperty(target, propertyKey, {
        get() {
          return value;
        },
        set(newValue: string) {
          if (newValue.length > maxValue) {
            throw new Error(`Value cannot be more than ${maxValue}`);
          }

          value = newValue;
        },
        configurable: true,
        enumerable: true,
      });
    }
  };
}

function Email<T extends {}>(target: T, propertyKey: string | symbol) {
  let value: string;

  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

  if (descriptor) {
    const originalSetter = descriptor.set;

    Object.defineProperty(target, propertyKey, {
      ...descriptor,
      set(newValue: string) {
        if (!isEmailValid(newValue)) {
          throw new Error(`Invalid email address for property "${String(propertyKey)}".`);
        }
        if (originalSetter) {
          originalSetter.call(target, newValue);
        }
      },
    });
  } else {
    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newValue: string) {
        if (!isEmailValid(newValue)) {
          throw new Error(`Invalid email address for property "${String(propertyKey)}".`);
        }

        value = newValue;
      },
      configurable: true,
      enumerable: true,
    });
  }
}

function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

class User {
  @MinLength(10)
  @MaxLength(50)
  @Email
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}

const user = new User("cat@gmail.com");
