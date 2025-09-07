import { type Task } from '../api';

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
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
