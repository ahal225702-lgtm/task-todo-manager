import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const [filter, setFilter] = useState('All')

  function addTask(e) {
    e.preventDefault()
    if (!task.trim()) return
    setTasks([...tasks, { id: Date.now(), text: task.trim(), done: false }])
    setTask('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const visibleTasks = tasks.filter(t =>
    filter === 'All' ? true : filter === 'Completed' ? t.done : !t.done
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
        <p className="subtitle">A little progress each day adds up to big results.</p>
      </section>

      <section className="panel">
        <form onSubmit={addTask} className="task-form">
          <input value={task} onChange={e => setTask(e.target.value)}
            placeholder="What needs to get done?" />
          <button type="submit">+ Add task</button>
        </form>

        <div className="toolbar">
          <h2>My tasks <span>{tasks.length}</span></h2>
          <div className="filters">
            {['All', 'Active', 'Completed'].map(f =>
              <button key={f} className={filter === f ? 'selected' : ''}
                onClick={() => setFilter(f)}>{f}</button>
            )}
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
              <button className={`check ${t.done ? 'checked' : ''}`}
                onClick={() => toggleTask(t.id)}>{t.done ? '✓' : ''}</button>
              <span className={t.done ? 'task-done' : ''}>{t.text}</span>
              <button className="delete" onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          ))}
        </div>

        <footer>{tasks.filter(t => !t.done).length} tasks remaining
          <span>Built with React</span>
        </footer>
      </section>
      <p className="bottom-note">SMALL STEPS. GREAT THINGS.</p>
    </main>
  )
}

export default App