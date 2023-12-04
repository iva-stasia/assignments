const BadgeSize = {
    single: '4x3',
    double: '4x6',
};

const Print = {
    standard: 'color',
    fast: 'zpl',
};

enum BadgeColorTypesEnum {
    COLOR = 'color',
    MONO = 'mono',
}

type BadgeSizeType = keyof typeof BadgeSize;
type PrintType = keyof typeof Print;

type BadgeType = `${BadgeSizeType}_${PrintType}`;

interface Grade {
    workName: string;
    mark: number;
}

interface Visit {
    lesson: string;
    present: boolean;
}

class Student {
    badgeTypeMap = new Map<BadgeType, BadgeColorTypesEnum>([
        ['single_fast', BadgeColorTypesEnum.COLOR],
        ['single_standard', BadgeColorTypesEnum.COLOR],
        ['double_fast', BadgeColorTypesEnum.MONO],
        ['double_standard', BadgeColorTypesEnum.MONO],
    ]);

    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: Grade[] = [];
    _visits: Visit[] = [];

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    setGrade(grade: Grade): void {
        this._grades.push(grade);
    }

    setVisit(visit: Visit): void {
        this._visits.push(visit);
    }

    getPerformanceRating(): number {
        const gradeValues: number[] = this._grades.map(
            (grade: Grade) => grade.mark
        );

        if (!gradeValues.length) return 0;

        const averageGrade: number =
            gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) /
            gradeValues.length;
        const attendancePercentage: number =
            (this._visits.filter((visit: Visit) => visit.present).length /
                this._visits.length) *
            100;

        return (averageGrade + attendancePercentage) / 2;
    }
}
