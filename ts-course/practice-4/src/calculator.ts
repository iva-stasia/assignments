interface ICalculator {
    add: (num1: number, num2: number) => number;
    subtract: (num1: number, num2: number) => number;
    multiply: (num1: number, num2: number) => number;
    divide: (num1: number, num2: number) => number;
}

type Operations = keyof ICalculator;

class Calculator implements ICalculator {
    add(num1: number, num2: number): number {
        return num1 + num2;
    }

    subtract(num1: number, num2: number): number {
        return num1 - num2;
    }

    multiply(num1: number, num2: number): number {
        return num1 * num2;
    }

    divide(num1: number, num2: number): number | never {
        if (num2 === 0) {
            throw new Error('Division by zero');
        }

        return num1 / num2;
    }
}

function calculate(
    calculator: Calculator,
    operation: Operations,
    num1: number,
    num2: number
): number | never {
    return calculator[operation](num1, num2);
}

export { Calculator, calculate };
