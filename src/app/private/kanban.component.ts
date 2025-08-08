import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivateLayoutComponent } from './private-layout.component';

interface KanbanTask {
  id: number;
  title: string;
  description?: string;
}

interface KanbanColumn {
  name: string;
  color: string;
  tasks: KanbanTask[];
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule, PrivateLayoutComponent],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})

export class KanbanComponent {
  isAuthenticated = true; // TODO: Replace with real auth logic

  onSignOut() {
    // TODO: Implement sign out logic
    this.isAuthenticated = false;
    window.location.href = '/';
  }
  columns: KanbanColumn[] = [
    { name: 'To Do', color: 'bg-light', tasks: [] },
    { name: 'In Progress', color: 'bg-primary text-white', tasks: [] },
    { name: 'Review', color: 'bg-warning text-dark', tasks: [] },
    { name: 'Done', color: 'bg-success text-white', tasks: [] }
  ];
  dragTask: KanbanTask | null = null;
  dragFromIdx: number | null = null;

  showModal = false;
  modalTaskTitle = '';
  modalTaskDescription = '';
  editingTask: KanbanTask | null = null;
  editingColIdx: number | null = null;

  kanbanColumns = [
    { key: 'title', label: 'Title', visible: true },
    { key: 'description', label: 'Description', visible: true },
    { key: 'column', label: 'Column', visible: true }
  ];
  sortKeys: { key: string, asc: boolean }[] = [{ key: 'column', asc: true }];
  selectedRows: Set<number> = new Set();

  getAllTasks() {
    const tasks: Array<any> = [];
    this.columns.forEach((col, colIdx) => {
      col.tasks.forEach(task => tasks.push({ ...task, column: col.name, colIdx }));
    });
    return tasks;
  }

  getFilteredSortedTasks() {
    let tasks = this.getAllTasks();
    // No search for now, but could add if needed
    tasks = [...tasks];
    tasks.sort((a, b) => {
      for (const sort of this.sortKeys) {
        let v1 = a[sort.key] || '';
        let v2 = b[sort.key] || '';
        if (v1 < v2) return sort.asc ? -1 : 1;
        if (v1 > v2) return sort.asc ? 1 : -1;
      }
      return 0;
    });
    return tasks;
  }

  sortBy(key: string, event?: MouseEvent) {
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
  }

  toggleColumn(col: any) {
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
    this.getFilteredSortedTasks().forEach(task => this.selectedRows.add(task.id));
  }

  clearSelection() {
    this.selectedRows.clear();
  }

  downloadCSV(selectedOnly = false) {
    const visibleCols = this.kanbanColumns.filter(c => c.visible);
    const headers = visibleCols.map(c => c.label);
    const tasks = this.getFilteredSortedTasks();
    const rows = (selectedOnly ? tasks.filter(t => this.selectedRows.has(t.id)) : tasks)
      .map(task => visibleCols.map(c => '"' + (task[c.key] || '').replace(/"/g, '""') + '"'));
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kanban-tasks.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  copySelectedToClipboard() {
    const visibleCols = this.kanbanColumns.filter(c => c.visible);
    const headers = visibleCols.map(c => c.label);
    const tasks = this.getFilteredSortedTasks();
    const rows = tasks.filter(t => this.selectedRows.has(t.id))
      .map(task => visibleCols.map(c => task[c.key]));
    const text = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(text);
  }

  constructor() {
    this.loadFromStorage();
  }

  openAddModal() {
    this.editingTask = null;
    this.editingColIdx = null;
    this.modalTaskTitle = '';
    this.modalTaskDescription = '';
    this.showModal = true;
  }

  openEditModal(task: KanbanTask, colIdx: number) {
    this.editingTask = { ...task };
    this.editingColIdx = colIdx;
    this.modalTaskTitle = task.title;
    this.modalTaskDescription = task.description || '';
    this.showModal = true;
  }

  addOrUpdateTaskFromModal() {
    if (!this.modalTaskTitle.trim()) return;
    if (this.editingTask && this.editingColIdx !== null) {
      // Edit mode
      const col = this.columns[this.editingColIdx];
      const idx = col.tasks.findIndex(t => t.id === this.editingTask!.id);
      if (idx > -1) {
        col.tasks[idx] = {
          ...col.tasks[idx],
          title: this.modalTaskTitle.trim(),
          description: this.modalTaskDescription.trim()
        };
      }
    } else {
      // Add mode
      this.columns[0].tasks.push({
        id: Date.now(),
        title: this.modalTaskTitle.trim(),
        description: this.modalTaskDescription.trim()
      });
    }
    this.closeModal();
    this.saveToStorage();
  }

  closeModal() {
    this.showModal = false;
    this.modalTaskTitle = '';
    this.modalTaskDescription = '';
    this.editingTask = null;
    this.editingColIdx = null;
  }

  moveTask(task: KanbanTask, fromIdx: number, toIdx: number) {
    this.columns[fromIdx].tasks = this.columns[fromIdx].tasks.filter(t => t.id !== task.id);
    this.columns[toIdx].tasks.push(task);
    this.saveToStorage();
  }

  deleteTask(task: KanbanTask, colIdx: number) {
    this.columns[colIdx].tasks = this.columns[colIdx].tasks.filter(t => t.id !== task.id);
    this.saveToStorage();
  }

  // Drag and drop handlers
  onDragStart(task: KanbanTask, fromIdx: number) {
    this.dragTask = task;
    this.dragFromIdx = fromIdx;
  }

  onDrop(toIdx: number) {
    if (this.dragTask != null && this.dragFromIdx != null && toIdx !== this.dragFromIdx) {
      this.moveTask(this.dragTask, this.dragFromIdx, toIdx);
    }
    this.dragTask = null;
    this.dragFromIdx = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  saveToStorage() {
    localStorage.setItem('fusionops_kanban', JSON.stringify(this.columns));
  }

  loadFromStorage() {
    const data = localStorage.getItem('fusionops_kanban');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length === 4) {
          this.columns = parsed;
        }
      } catch {}
    }
  }
}
