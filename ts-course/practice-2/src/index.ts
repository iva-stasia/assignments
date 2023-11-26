interface Lecturer {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: string;
  courses: string[];
  contacts: string[];
}

type GroupStatus = "studying" | "graduated";

type StudentGrade = [string, number];

type StudentVisit = [string, boolean];

class School {
  _areas: Area[] = [];
  _lecturers: Lecturer[] = [];

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(area: Area): void {
    const areaIndex = this._areas.indexOf(area);
    if (areaIndex === -1) return;
    this._areas.splice(areaIndex, 1);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: Lecturer): void {
    const lecturerIndex = this._lecturers.indexOf(lecturer);
    if (lecturerIndex === -1) return;
    this._areas.splice(lecturerIndex, 1);
  }
}

class Area {
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(level: Level): void {
    const levelIndex = this._levels.indexOf(level);
    if (levelIndex === -1) return;
    this._levels.splice(levelIndex, 1);
  }
}

class Level {
  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(group: Group): void {
    const groupIndex = this._groups.indexOf(group);
    if (groupIndex === -1) return;
    this._groups.splice(groupIndex, 1);
  }
}

class StudentArray extends Array {
  toSorted(comparator: (a: Student, b: Student) => number): Student[] {
    const sortedStudents = [...this].sort(comparator);

    return sortedStudents;
  }
}

class Group {
  _area: Area;
  _status: GroupStatus;
  _directionName: string;
  _levelName: string;
  _students: StudentArray = new StudentArray();

  constructor(
    area: Area,
    status: GroupStatus,
    directionName: string,
    levelName: string
  ) {
    this._area = area;
    this._status = status;
    this._directionName = directionName;
    this._levelName = levelName;
  }

  get area(): Area {
    return this._area;
  }

  get status(): GroupStatus {
    return this._status;
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  get students(): Student[] {
    return this._students;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    const studentIndex = this._students.indexOf(student);
    if (studentIndex === -1) return;
    this._students.splice(studentIndex, 1);
  }

  setStatus(status: GroupStatus): void {
    this._status = status;
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted(
      (a: Student, b: Student) =>
        b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

const area = new Area("areaName");

const group = new Group(area, "studying", "dirName", "levelName");

console.log(group);

class Student {
  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: StudentGrade[] = [];
  _visits: StudentVisit[] = [];

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(workName: string, mark: number): void {
    this._grades.push([workName, mark]);
  }

  setVisit(lesson: string, present: boolean): void {
    this._visits.push([lesson, present]);
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(
      Object.fromEntries(this._grades)
    );

    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) /
      gradeValues.length;

    const attendancePercentage: number =
      (this._visits.filter(([_lesson, present]: StudentVisit) => present)
        .length /
        this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
