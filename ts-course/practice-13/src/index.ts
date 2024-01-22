interface ITodoList {
  addNote: (note: TodoNote) => void;
  removeNote: (noteId: string) => void;
  editNote: (noteId: string, title?: string, content?: string) => void;
  getNoteInfo: (noteId: string) => ITodoNoteInfo;
  getAllNotes: () => ITodoNoteInfo[];
  markNoteAsCompleted: (noteId: string) => void;
  getTotalNotesNum: () => number;
  getUncompletedNotesNum: () => number;
}

interface ISearchableTodoList extends ITodoList {
  searchNotes: (query: string, field?: keyof TodoNote) => TodoNote[];
}

interface ISortableTodoList extends ITodoList {
  sortNotesByStatus: () => TodoNote[];
  sortNotesByCreationDate: () => TodoNote[];
}

type TodoNoteStatus = "completed" | "uncompleted";

interface ITodoNoteInfo {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  editedAt: Date;
  status: TodoNoteStatus;
}

interface ITodoNote {
  markAsCompleted: () => void;
  edit: (title?: string, content?: string) => void;
}

class TodoList implements ITodoList {
  protected notes: TodoNote[] = [];

  addNote(note: TodoNote): void {
    this.notes.push(note);
  }

  removeNote(noteId: string): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  editNote(noteId: string, title?: string, content?: string): void {
    const [noteToEdit] = this.notes.filter((note) => note.id === noteId);
    noteToEdit.edit(title, content);
  }

  getNoteInfo(noteId: string): ITodoNoteInfo {
    const [noteToShow] = this.notes.filter((note) => note.id === noteId);
    return noteToShow.noteInfo;
  }

  getAllNotes(): ITodoNoteInfo[] {
    return this.notes.map((note) => note.noteInfo);
  }

  markNoteAsCompleted(noteId: string): void {
    const [noteToMark] = this.notes.filter((note) => note.id === noteId);
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
  searchNotes(query: string, field?: keyof TodoNote): TodoNote[] {
    if (!query.trim()) return this.notes;

    let foundNotes: TodoNote[];

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
  sortNotesByStatus(): TodoNote[] {
    const sortedNotes = [...this.notes].sort((a, b) => (a.status === b.status ? 0 : a.status ? 1 : -1));
    return sortedNotes;
  }

  sortNotesByCreationDate(): TodoNote[] {
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

  get noteInfo(): ITodoNoteInfo {
    return {
      id: this._id,
      title: this._title,
      content: this._content,
      createdAt: this._createdAt,
      editedAt: this._editedAt,
      status: this._status,
    };
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

  edit(title?: string, content?: string): void {
    if (title) {
      this._title = title;
      this._editedAt = new Date();
    }

    if (content) {
      this._content = content;
      this._editedAt = new Date();
    }
  }
}

class TodoNoteWithEditingConfirmation extends TodoNote {
  private confirmEditing(): boolean {
    const isConfirmed = confirm("Please confirm the editing of the note.");
    return isConfirmed;
  }

  override edit(title?: string, content?: string): void {
    const isConfirmed = this.confirmEditing();

    if (isConfirmed) {
      super.edit(title, content);
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
