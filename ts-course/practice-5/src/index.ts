interface IShape {
  readonly name: string;
  readonly color: string;
  calculateArea: () => number | null;
}

interface ICircle extends IShape {
  radius: number;
}

interface ITriangle extends IShape {
  base: number;
  height: number;
}

interface IPrintable extends IShape {
  print: () => string;
}

interface IRectangle extends IPrintable {
  sideA: number;
  sideB: number;
}

interface ISquare extends IPrintable {
  side: number;
}

class Shape implements IShape {
  constructor(public readonly name: string, public readonly color: string) {}

  calculateArea(): number | null {
    return null;
  }
}

class Circle extends Shape implements ICircle {
  constructor(name: string, color: string, public radius: number) {
    super(name, color);
  }

  override calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Triangle extends Shape implements ITriangle {
  constructor(
    name: string,
    color: string,
    public base: number,
    public height: number
  ) {
    super(name, color);
  }

  override calculateArea(): number {
    return (this.base * this.height) / 2;
  }
}

class Rectangle extends Shape implements IRectangle {
  private readonly formula = "length * width";

  constructor(
    name: string,
    color: string,
    public sideA: number,
    public sideB: number
  ) {
    super(name, color);
  }

  override calculateArea(): number {
    return this.sideA * this.sideB;
  }

  print(): string {
    return this.formula;
  }
}

class Square extends Shape implements ISquare {
  private readonly formula = "side * side";

  constructor(name: string, color: string, public side: number) {
    super(name, color);
  }

  override calculateArea(): number {
    return this.side * this.side;
  }

  print(): string {
    return this.formula;
  }
}
