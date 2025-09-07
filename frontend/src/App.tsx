import { useEffect, useState, useCallback } from 'react';
import { createTask, deleteTask, fetchTasks, updateTask, type Task } from './api';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

// ========================
// App
// ========================
export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTasks().then(setTasks).catch(console.error);
  }, []);

  const handleAdd = useCallback(async () => {
    const title = newTitle.trim();
    if (!title) return;

    if (tasks.some((task) => task.title.trim().toLowerCase() === title.toLowerCase())) {
      alert('同じタイトルのタスクは追加できません');
      setNewTitle('');
      return;
    }

    try {
      const newTask = await createTask(title);
      setTasks([...tasks, newTask]);
      setNewTitle('');
    } catch {
      alert('タスクの追加に失敗しました');
    }
  }, [newTitle, tasks]);

  const handleToggle = useCallback(async (taskId: number) => {
    try {
      const updatedTask = await updateTask(taskId);
      setTasks((prev) => prev.map((task) => (task.ID === taskId ? updatedTask : task)));
    } catch {
      alert('タスクの更新に失敗しました');
    }
  }, []);

  const handleDelete = useCallback(async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.ID !== taskId));
    } catch {
      alert('タスクの削除に失敗しました');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">タスク管理</h1>
      <TaskInput value={newTitle} onChange={setNewTitle} onAdd={handleAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
