type TaskInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

export default function TaskInput({ value, onChange, onAdd }: TaskInputProps) {
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
