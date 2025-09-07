import { type Task } from '../api';
import TaskItem from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
};

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
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
