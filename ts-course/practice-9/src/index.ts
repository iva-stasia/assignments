// Фільтрація масиву

function filterArray<T>(array: T[], condition: (item: T) => boolean): T[] {
  return array.filter(condition);
}

// Узагальнений стек

class Stack<T> {
  private elements: T[] = [];

  push(element: T): void {
    this.elements.push(element);
  }

  pop(): T | undefined {
    return this.elements.pop();
  }

  peek(): T | undefined {
    const elementsNum = this.elements.length;
    return elementsNum > 0
      ? this.elements[this.elements.length - 1]
      : undefined;
  }
}

// Узагальнений словник

class Dictionary<TKey extends string | number | symbol, TValue> {
  private dictionary: Map<TKey, TValue> = new Map<TKey, TValue>();

  set(key: TKey, value: TValue): void {
    this.dictionary.set(key, value);
  }

  get(key: TKey): TValue | undefined {
    return this.dictionary.get(key);
  }

  has(key: TKey): boolean {
    return this.dictionary.has(key);
  }
}
