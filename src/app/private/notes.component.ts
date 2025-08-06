import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Note {
  id: number;
  title: string;
  content: string;
  created: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class NotesComponent {
  notes: Note[] = [];
  search = '';
  sortColumn: keyof Note = 'created';
  sortAsc = false;
  editingNote: Note | null = null;
  newTitle = '';
  newContent = '';

  constructor() {
    this.loadNotes();
  }

  loadNotes() {
    const data = localStorage.getItem('fusionops_notes');
    this.notes = data ? JSON.parse(data) : [];
    this.sortNotes();
  }

  saveNotes() {
    localStorage.setItem('fusionops_notes', JSON.stringify(this.notes));
    this.sortNotes();
  }

  addNote() {
    if (!this.newTitle.trim() && !this.newContent.trim()) return;
    const note: Note = {
      id: Date.now(),
      title: this.newTitle.trim(),
      content: this.newContent.trim(),
      created: new Date().toISOString()
    };
    this.notes.push(note);
    this.newTitle = '';
    this.newContent = '';
    this.saveNotes();
  }

  editNote(note: Note) {
    this.editingNote = { ...note };
  }

  updateNote() {
    if (!this.editingNote) return;
    const idx = this.notes.findIndex(n => n.id === this.editingNote!.id);
    if (idx > -1) {
      this.notes[idx] = { ...this.editingNote };
      this.saveNotes();
    }
    this.editingNote = null;
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveNotes();
  }

  sortBy(col: keyof Note) {
    if (this.sortColumn === col) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = col;
      this.sortAsc = true;
    }
    this.sortNotes();
  }

  sortNotes() {
    this.notes.sort((a, b) => {
      let v1 = a[this.sortColumn];
      let v2 = b[this.sortColumn];
      if (typeof v1 === 'string' && typeof v2 === 'string') {
        v1 = v1.toLowerCase();
        v2 = v2.toLowerCase();
      }
      if (v1 < v2) return this.sortAsc ? -1 : 1;
      if (v1 > v2) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  get filteredNotes() {
    if (!this.search.trim()) return this.notes;
    const s = this.search.toLowerCase();
    return this.notes.filter(n =>
      n.title.toLowerCase().includes(s) ||
      n.content.toLowerCase().includes(s) ||
      n.created.toLowerCase().includes(s)
    );
  }
}