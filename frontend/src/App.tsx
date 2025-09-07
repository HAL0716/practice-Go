import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'GoでAPIを作る', completed: false },
    { id: 2, title: 'ReactのUIを実装する', completed: true },
    { id: 3, title: 'Dockerで環境を整える', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">タスク管理</h1>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 bg-white rounded shadow">
            <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</span>
            <button
              onClick={() => toggleTask(task.id)}
              className={`px-3 py-1 rounded text-white ${task.completed ? 'bg-green-500' : 'bg-blue-500'}`}
            >
              {task.completed ? '未完了にする' : '完了にする'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
