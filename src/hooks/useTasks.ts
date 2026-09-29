import { useEffect, useState } from 'react';
import type { Task } from '../types';

const STORAGE_KEY = 'react-checklist:v1';
const initialTasks: Task[] = [
  { id: 'welcome-1', text: 'Запустить свой React-проект', completed: true },
  { id: 'welcome-2', text: 'Добавить первое дело', completed: false },
  { id: 'welcome-3', text: 'Сделать маленький шаг к большой цели', completed: false },
];

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false;
  const task = value as Record<string, unknown>;
  return typeof task.id === 'string' && typeof task.text === 'string'
    && task.text.trim().length > 0 && task.text.length <= 200 && typeof task.completed === 'boolean';
}

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return initialTasks;
    const parsed: unknown = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.every(isTask)
      && new Set(parsed.map(task => task.id)).size === parsed.length) return parsed;
  } catch { /* Повреждённые или недоступные данные заменяются примерами. */ }
  return initialTasks;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); setStorageError(false); }
    catch { setStorageError(true); }
  }, [tasks]);

  const addTask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 200) return;
    setTasks(current => [...current, { id: crypto.randomUUID(), text: trimmed, completed: false }]);
  };
  const editTask = (id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 200) return;
    setTasks(current => current.map(task => task.id === id ? { ...task, text: trimmed } : task));
  };
  const toggleTask = (id: string) => setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  const deleteTask = (id: string) => setTasks(current => current.filter(task => task.id !== id));
  return { tasks, storageError, addTask, editTask, toggleTask, deleteTask };
}
