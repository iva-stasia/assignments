class School {
  directions: string[] = [];

  addDirection(direction: string): void {
    this.directions.push(direction);
  }
}

class Direction {
  private _name: string;
  levels: string[] = [];

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: string): void {
    this.levels.push(level);
  }
}

class Level {
  private _name: string;
  private _program: string;
  groups: string[] = [];

  constructor(name: string, program: string) {
    this._name = name;
    this._program = program;
  }

  get name(): string {
    return this._name;
  }

  get program(): string {
    return this._program;
  }

  addGroup(group: string): void {
    this.groups.push(group);
  }
}

class Student {
  private grades: Record<string, number> = {};
  private attendance: boolean[] = [];
  private firstName: string;
  private lastName: string;
  private birthYear: number;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: string, grade: number): void {
    this.grades[subject] = grade;
  }

  markAttendance(present: boolean): void {
    this.attendance.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage =
      (this.attendance.filter((present) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

class Group {
  private _students: Student[] = [];
  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  get students(): Student[] {
    return this._students;
  }

  set students(student: Student) {
    this._students.push(student);
  }

  showPerformance(): Student[] {
    const sortedStudents = [...this.students].sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );

    return sortedStudents;
  }
}
