interface ITodoList {
  addNote: (note: ITodoNote) => void;
  removeNote: (noteId: string) => void;
  editNote: (noteId: string, payload: ITodoNote) => void;
  getNoteInfo: (noteId: string) => ITodoNote;
  getAllNotes: () => ITodoNote[];
  markNoteAsCompleted: (noteId: string) => void;
  getTotalNotesNum: () => number;
  getUncompletedNotesNum: () => number;
}

interface ISearchableTodoList extends ITodoList {
  searchNotes: (query: string, field?: keyof ITodoNote) => ITodoNote[];
}

interface ISortableTodoList extends ITodoList {
  sortNotesByStatus: () => ITodoNote[];
  sortNotesByCreationDate: () => ITodoNote[];
}

type TodoNoteStatus = "completed" | "uncompleted";

interface ITodoNote {
  id: string;
  status: TodoNoteStatus;
  createdAt: Date;
  title: string;
  content: string;
  markAsCompleted: () => void;
  edit: (payload: ITodoNote) => void;
}

class TodoList implements ITodoList {
  protected notes: ITodoNote[] = [];

  addNote(note: ITodoNote): void {
    this.notes.push(note);
  }

  removeNote(noteId: string): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  editNote(noteId: string, payload: ITodoNote): void {
    const noteToEdit = this.notes.find((note) => note.id === noteId);

    if (!noteToEdit) throw new Error(`Incorrect note id.`);

    noteToEdit.edit(payload);
  }

  getNoteInfo(noteId: string): ITodoNote {
    const noteToShow = this.notes.find((note) => note.id === noteId);

    if (!noteToShow) throw new Error(`Incorrect note id.`);

    return noteToShow;
  }

  getAllNotes(): ITodoNote[] {
    return this.notes;
  }

  markNoteAsCompleted(noteId: string): void {
    const noteToMark = this.notes.find((note) => note.id === noteId);

    if (!noteToMark) throw new Error(`Incorrect note id.`);

    noteToMark.markAsCompleted();
  }

  getTotalNotesNum(): number {
    return this.notes.length;
  }

  getUncompletedNotesNum(): number {
    const uncompletedNotes = this.notes.filter((note) => note.status === "uncompleted");
    return uncompletedNotes.length;
  }
}

class SearchableTodoList extends TodoList implements ISearchableTodoList {
  searchNotes(query: string, field?: keyof ITodoNote): ITodoNote[] {
    if (!query.trim()) return this.notes;

    let foundNotes: ITodoNote[];

    if (field) {
      foundNotes = this.notes.filter((note) => note[field].toString().toLowerCase() === query.toLowerCase());
    } else {
      foundNotes = this.notes.filter((note) => {
        for (const value in Object.values(note)) {
          value.toString().toLowerCase() === query.toLowerCase();
        }
      });
    }

    return foundNotes;
  }
}

class SortableTodoList extends TodoList implements ISortableTodoList {
  sortNotesByStatus(): ITodoNote[] {
    const sortedNotes = [...this.notes].sort((a, b) => (a.status === b.status ? 0 : a.status ? 1 : -1));
    return sortedNotes;
  }

  sortNotesByCreationDate(): ITodoNote[] {
    const sortedNotes = [...this.notes].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return sortedNotes;
  }
}

class TodoNote implements ITodoNote {
  private readonly _id: string;
  private readonly _createdAt: Date;
  @NotEmpty
  private _title: string;
  @NotEmpty
  private _content: string;
  private _editedAt: Date;
  private _status: TodoNoteStatus;

  get id(): string {
    return this._id;
  }

  get status(): TodoNoteStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  constructor(title: string, content: string) {
    this._title = title;
    this._content = content;
    this._id = crypto.randomUUID();
    this._createdAt = new Date();
    this._editedAt = this._createdAt;
    this._status = "uncompleted";
  }

  markAsCompleted(): void {
    this._status = "completed";
  }

  edit(note: ITodoNote): void {
    Object.assign(this, note);
  }
}

class TodoNoteWithEditingConfirmation extends TodoNote {
  private confirmEditing(): boolean {
    const isConfirmed = confirm("Please confirm the editing of the note.");
    return isConfirmed;
  }

  override edit(note: ITodoNote): void {
    const isConfirmed = this.confirmEditing();

    if (isConfirmed) {
      super.edit(note);
    }
  }
}

function NotEmpty<T extends {}>(target: T, propertyKey: string | symbol): void {
  let value: string;

  Object.defineProperty(target, propertyKey, {
    get() {
      return value;
    },
    set(newValue: string) {
      if (newValue.trim().length === 0) {
        throw new Error(`${String(propertyKey).replace("_", "")} cannot be empty`);
      }

      value = newValue;
    },
    configurable: true,
    enumerable: true,
  });
}
