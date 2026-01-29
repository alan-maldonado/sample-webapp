<script setup>
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: 'Setup Playwright', status: 'completed' },
  { id: 2, title: 'Configure Percy', status: 'in-progress' },
  { id: 3, title: 'Write E2E Tests', status: 'pending' },
  { id: 4, title: 'Run Visual Tests', status: 'pending' },
])

const newTask = ref('')

function addTask() {
  if (newTask.value.trim()) {
    tasks.value.push({
      id: Date.now(),
      title: newTask.value,
      status: 'pending'
    })
    newTask.value = ''
  }
}

function toggleStatus(task) {
  const statuses = ['pending', 'in-progress', 'completed']
  const currentIndex = statuses.indexOf(task.status)
  task.status = statuses[(currentIndex + 1) % statuses.length]
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Task Manager Pro</h1>
      <p class="subtitle">Powered by Visual Regression Testing</p>
    </header>

    <main class="main">
      <section class="add-task">
        <input
          v-model="newTask"
          type="text"
          placeholder="Add a new task..."
          class="task-input"
          data-testid="task-input"
          @keyup.enter="addTask"
        />
        <button class="btn btn-primary" data-testid="add-task-btn" @click="addTask">
          Add Task
        </button>
      </section>

      <section class="task-list" data-testid="task-list">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="task-card"
          :class="task.status"
          :data-testid="`task-${task.id}`"
        >
          <div class="task-content">
            <span class="task-title">{{ task.title }}</span>
            <span class="status-badge" :class="task.status">
              {{ task.status }}
            </span>
          </div>
          <div class="task-actions">
            <button
              class="btn btn-small"
              :data-testid="`toggle-${task.id}`"
              @click="toggleStatus(task)"
            >
              Toggle
            </button>
            <button
              class="btn btn-small btn-danger"
              :data-testid="`delete-${task.id}`"
              @click="deleteTask(task.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </section>

      <section class="stats" data-testid="stats">
        <div class="stat-card">
          <span class="stat-number">{{ tasks.filter(t => t.status === 'completed').length }}</span>
          <span class="stat-label">Completed</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ tasks.filter(t => t.status === 'in-progress').length }}</span>
          <span class="stat-label">In Progress</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ tasks.filter(t => t.status === 'pending').length }}</span>
          <span class="stat-label">Pending</span>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Made with Vue 3 + Vite | Visual Testing by Percy</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
  min-height: 100vh;
}

.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  opacity: 0.9;
}

.main {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.add-task {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.task-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.task-input:focus {
  outline: none;
  border-color: #0ea5e9;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
  color: white;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background: #f1f5f9;
  color: #475569;
}

.btn-danger {
  background: #fee2e2;
  color: #dc2626;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-card.completed {
  border-left-color: #22c55e;
  background: #f0fdf4;
}

.task-card.in-progress {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.task-card.pending {
  border-left-color: #94a3b8;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.task-title {
  font-weight: 500;
  color: #1e293b;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.completed {
  background: #dcfce7;
  color: #166534;
}

.status-badge.in-progress {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.pending {
  background: #f1f5f9;
  color: #64748b;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #0ea5e9;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
}

.footer {
  text-align: center;
  color: white;
  margin-top: 2rem;
  opacity: 0.8;
}
</style>
