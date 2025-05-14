const API_BASE_URL = 'http://localhost:3001/api';

const getAuthHeader = () => {
  // Hardcoded token for testing
  return { 'Authorization': 'Bearer test-token-123' };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: 'Failed to parse error response' };
    }
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
      url: response.url
    });
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
};

export const api = {
  // Board endpoints
  async getBoards() {
    const response = await fetch(`${API_BASE_URL}/boards`, {
      headers: {
        ...getAuthHeader()
      }
    });
    return handleResponse(response);
  },

  async createBoard(data: { name: string; userId: string }) {
    console.log('Creating board with data:', data);
    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({
        name: data.name,
        userId: data.userId
      }),
    });
    return handleResponse(response);
  },

  async updateBoard(boardId: string, data: { name: string }) {
    console.log('Updating board:', { boardId, data });
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ title: data.name }),
    });
    return handleResponse(response);
  },

  async deleteBoard(boardId: string) {
    console.log('Deleting board:', boardId);
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader()
      },
    });
    return handleResponse(response);
  },

  // Task endpoints
  async getTasks(boardId: string) {
    const response = await fetch(`${API_BASE_URL}/tasks/boards/${boardId}/tasks`, {
      headers: {
        ...getAuthHeader()
      }
    });
    return handleResponse(response);
  },

  async createTask(boardId: string, data: {
    title: string;
    description: string;
    status: string;
    priority: string;
  }) {
    console.log('Creating task with data:', { boardId, ...data });
    const response = await fetch(`${API_BASE_URL}/tasks/boards/${boardId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async updateTask(taskId: string, data: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async deleteTask(taskId: string) {
    console.log('Deleting task:', taskId);
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader()
      },
    });
    return handleResponse(response);
  },
};