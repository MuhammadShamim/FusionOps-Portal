import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrivateLayoutComponent } from './private-layout.component';
import { AuthService } from '../services/auth.service';

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
  imports: [FormsModule, CommonModule, PrivateLayoutComponent]
})
export class NotesComponent {
  auth$;

  areAllNotesSelected(): boolean {
    const notes = this.getFilteredSortedNotes();
    return notes.length > 0 && notes.every(n => this.selectedRows.has(n.id));
  }

  getVisibleNotesColspan(): number {
    return this.columns.filter(c => c.visible).length + 2;
  }

  onSignOut() {
    this.authService.signOut();
    window.location.href = '/';
  }

  notes: Note[] = [];
  search = '';
  sortKeys: { key: keyof Note, asc: boolean }[] = [{ key: 'created', asc: false }];
  editingNote: Note | null = null;
  showModal = false;
  modalTitle = '';
  modalContent = '';
  columns: { key: keyof Note, label: string, visible: boolean }[] = [
    { key: 'title', label: 'Title', visible: true },
    { key: 'content', label: 'Content', visible: true },
    { key: 'created', label: 'Created', visible: true }
  ];
  selectedRows: Set<number> = new Set();

  downloadCSV(selectedOnly = false) {
    const visibleCols = this.columns.filter(c => c.visible);
    const headers = visibleCols.map(c => c.label);
    const notes = this.getFilteredSortedNotes();
    const rows = (selectedOnly ? notes.filter(n => this.selectedRows.has(n.id)) : notes)
      .map(n => visibleCols.map(c => {
        if (c.key === 'title' || c.key === 'content') return '"' + (n[c.key] as string || '').replace(/"/g, '""') + '"';
        return n[c.key];
      }));
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  copySelectedToClipboard() {
    const visibleCols = this.columns.filter(c => c.visible);
    const headers = visibleCols.map(c => c.label);
    const notes = this.getFilteredSortedNotes();
    const rows = notes.filter(n => this.selectedRows.has(n.id))
      .map(n => visibleCols.map(c => n[c.key]));
    const text = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(text);
  }

  toggleColumn(col: { key: keyof Note, label: string, visible: boolean }) {
    col.visible = !col.visible;
  }

  toggleRowSelection(id: number) {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }

  selectAllOnPage() {
    this.getFilteredSortedNotes().forEach(n => this.selectedRows.add(n.id));
  }

  clearSelection() {
    this.selectedRows.clear();
  }

  sortBy(key: keyof Note, event?: MouseEvent) {
    if (event && event.shiftKey) {
      const idx = this.sortKeys.findIndex(s => s.key === key);
      if (idx > -1) {
        this.sortKeys[idx].asc = !this.sortKeys[idx].asc;
      } else {
        this.sortKeys.push({ key, asc: true });
      }
    } else {
      if (this.sortKeys.length === 1 && this.sortKeys[0].key === key) {
        this.sortKeys[0].asc = !this.sortKeys[0].asc;
      } else {
        this.sortKeys = [{ key, asc: true }];
      }
    }
    this.sortNotes();
  }

  sortNotes() {
    this.notes.sort((a, b) => {
      for (const sort of this.sortKeys) {
        let v1 = a[sort.key];
        let v2 = b[sort.key];
        if (typeof v1 === 'string' && typeof v2 === 'string') {
          v1 = v1.toLowerCase();
          v2 = v2.toLowerCase();
        }
        if (v1 < v2) return sort.asc ? -1 : 1;
        if (v1 > v2) return sort.asc ? 1 : -1;
      }
      return 0;
    });
  }

  getFilteredSortedNotes() {
    let filtered = this.notes;
    if (this.search.trim()) {
      const s = this.search.toLowerCase();
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(s) ||
        n.content.toLowerCase().includes(s) ||
        n.created.toLowerCase().includes(s)
      );
    }
    filtered = [...filtered];
    filtered.sort((a, b) => {
      for (const sort of this.sortKeys) {
        let v1 = a[sort.key];
        let v2 = b[sort.key];
        if (typeof v1 === 'string' && typeof v2 === 'string') {
          v1 = v1.toLowerCase();
          v2 = v2.toLowerCase();
        }
        if (v1 < v2) return sort.asc ? -1 : 1;
        if (v1 > v2) return sort.asc ? 1 : -1;
      }
      return 0;
    });
    return filtered;
  }

  constructor(public authService: AuthService) {
    this.auth$ = this.authService.auth$;
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


  addNoteFromModal() {
    if (!this.modalTitle.trim() && !this.modalContent.trim()) return;
    const note: Note = {
      id: Date.now(),
      title: this.modalTitle.trim(),
      content: this.modalContent.trim(),
      created: new Date().toISOString()
    };
    this.notes.push(note);
    this.saveNotes();
    this.closeModal();
  }

  openEditModal(note: Note) {
    this.editingNote = { ...note };
    this.modalTitle = note.title;
    this.modalContent = note.content;
    this.showModal = true;
  }

  updateNoteFromModal() {
    if (!this.editingNote) return;
    const idx = this.notes.findIndex(n => n.id === this.editingNote!.id);
    if (idx > -1) {
      this.notes[idx] = {
        ...this.editingNote,
        title: this.modalTitle.trim(),
        content: this.modalContent.trim()
      };
      this.saveNotes();
    }
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.editingNote = null;
    this.modalTitle = '';
    this.modalContent = '';
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.saveNotes();
  }

}