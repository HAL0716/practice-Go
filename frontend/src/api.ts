export type Task = {
  ID: number;
  title: string;
  completed: boolean;
};

const API_URL = 'http://localhost:8080/tasks';

export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await response.json();
  } catch (error) {
    console.error('fetchTasks error:', error);
    throw error;
  }
}

export async function createTask(title: string): Promise<Task> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false }),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return await response.json();
  } catch (error) {
    console.error('createTask error:', error);
    throw error;
  }
}

export async function updateTask(id: number): Promise<Task> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return await response.json();
  } catch (error) {
    console.error('updateTask error:', error);
    throw error;
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.error('deleteTask error:', error);
    throw error;
  }
}
