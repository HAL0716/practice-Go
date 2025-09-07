import { useEffect, useState, useCallback } from 'react';
import { createTask, deleteTask, fetchTasks, updateTask, type Task } from './api';

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

// ========================
// TaskInput
// ========================
type TaskInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

function TaskInput({ value, onChange, onAdd }: TaskInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mb-4 flex gap-2"
      role="form"
      aria-label="新しいタスク追加フォーム"
    >
      <input
        className="flex-1 p-2 border rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="新しいタスク"
        aria-label="新しいタスク入力欄"
        autoFocus
      />
      <button type="submit" className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600">
        追加
      </button>
    </form>
  );
}

// ========================
// TaskList
// ========================
type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
};

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="w-full max-w-md text-center text-gray-400">タスクがありません</div>;
  }

  return (
    <div className="w-full max-w-md space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.ID} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}

// ========================
// TaskItem
// ========================
type TaskItemProps = {
  task: Task;
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
};

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const { ID, title, completed } = task;

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded shadow">
      <span
        className={completed ? 'line-through text-gray-400' : ''}
        aria-label={completed ? '完了タスク' : '未完了タスク'}
      >
        {title}
      </span>
      <div className="flex gap-2 min-w-[200px] justify-end">
        <button
          onClick={() => onToggle(ID)}
          className={`px-3 py-1 rounded text-white ${
            completed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          aria-pressed={completed}
          aria-label={completed ? 'タスクを未完了に戻す' : 'タスクを完了にする'}
        >
          {completed ? '復元' : '完了'}
        </button>
        <button
          onClick={() => onDelete(ID)}
          className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600"
          aria-label="タスクを削除する"
        >
          削除
        </button>
      </div>
    </div>
  );
}
