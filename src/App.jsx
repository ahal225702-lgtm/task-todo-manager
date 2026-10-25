import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({
    text: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  })
  const [filter, setFilter] = useState('All')

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  function addTask(e) {
    e.preventDefault()
    if (!task.text.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...task,
        text: task.text.trim(),
        done: false,
      },
    ])

    setTask({
      text: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
    })
  }

  function toggleTask(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const completed = tasks.filter(t => t.done).length
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0

  const visibleTasks = tasks.filter(t =>
    filter === 'All' ? true :
    filter === 'Completed' ? t.done : !t.done
  )

  return (
    <main className="app">
      <header>
        <div className="logo">✓</div>
        <span className="brand">Taskflow</span>
        <span className="tag">MY WORKSPACE</span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR DAY, ORGANIZED</p>
        <h1>Make room for<br /><span>what matters.</span></h1>
        <p className="subtitle">
          A little progress each day adds up to big results.
        </p>
      </section>

      <section className="panel">
        <form onSubmit={addTask} className="task-form">
          <input
            name="text"
            value={task.text}
            onChange={handleChange}
            placeholder="Task title"
            required
          />

          <input
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description (optional)"
          />

          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="Low">Low priority</option>
            <option value="Medium">Medium priority</option>
            <option value="High">High priority</option>
          </select>

          <label className="date-field">
            Due date
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />
          </label>

          <button type="submit">+ Add task</button>
        </form>

        <div className="progress-section">
          <div className="progress-label">
            <strong>Overall progress</strong>
            <span>{progress}%</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p>{completed} of {tasks.length} tasks completed</p>
        </div>

        <div className="toolbar">
          <h2>My tasks <span>{tasks.length}</span></h2>
          <div className="filters">
            {['All', 'Active', 'Completed'].map(f => (
              <button
                type="button"
                key={f}
                className={filter === f ? 'selected' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="task-list">
          {visibleTasks.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">✦</div>
              <h3>{tasks.length ? 'Nothing here yet' : 'A fresh start.'}</h3>
              <p>Add a task above and make today count.</p>
            </div>
          ) : visibleTasks.map(t => (
            <div className="task" key={t.id}>
              <button
                type="button"
                className={`check ${t.done ? 'checked' : ''}`}
                onClick={() => toggleTask(t.id)}
                aria-label={t.done ? 'Mark as pending' : 'Mark as completed'}
              >
                {t.done ? '✓' : ''}
              </button>

              <div className="task-details">
                <span className={t.done ? 'task-done' : ''}>
                  {t.text}
                </span>
                {t.description && <p>{t.description}</p>}
                <div className="task-meta">
                  <span className={`priority priority-${t.priority.toLowerCase()}`}>
                    {t.priority} priority
                  </span>
                  {t.dueDate && <span>Due: {t.dueDate}</span>}
                  <span>Status: {t.done ? 'Done' : 'Pending'}</span>
                </div>
              </div>

              <button
                type="button"
                className="delete"
                onClick={() => deleteTask(t.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <footer>
          {tasks.filter(t => !t.done).length} tasks remaining
          <span>Built with React</span>
        </footer>
      </section>

      <p className="bottom-note">SMALL STEPS. GREAT THINGS.</p>
    </main>
  )
}

export default App