import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number
  title: string
  isComplete: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleCreateNewTask() {
    const newTaskToAdd = {
      id: Math.floor(Math.random() * 100),
      title: newTaskTitle,
      isComplete: false
    }

    if (newTaskTitle === '' || newTaskTitle === null) {
      window.alert('Você deve preecher uma nova task')
    } else {
      setTasks([...tasks, newTaskToAdd])
      setNewTaskTitle('')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskListUpdated = tasks.map(task =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    )

    setTasks(taskListUpdated)
  }

  function handleRemoveTask(id: number) {
    const newTaskList = tasks.filter(task => task.id != id)
    setTasks(newTaskList)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={e => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}
