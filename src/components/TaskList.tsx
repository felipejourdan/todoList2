import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare, FiEdit } from 'react-icons/fi'
import { FaRegCheckSquare } from 'react-icons/fa'

interface Task {
  id: number
  title: string
  isComplete: boolean
  isEditing: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [editedTask, setEditedTask] = useState('')

  function handleCreateNewTask() {
    const newTaskToAdd = {
      id: Math.floor(Math.random() * 100),
      title: newTaskTitle,
      isComplete: false,
      isEditing: false
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

  function handleEditTask(id: number) {
    const taskListToEdit = tasks.map(task =>
      task.id === id ? { ...task, isEditing: !task.isEditing } : task
    )
    const taskToEdit = tasks.filter(task => task.id === id)

    setTasks(taskListToEdit)
    setEditedTask(taskToEdit[0].title)
  }

  function handleEditedTask(id: number) {
    const taskListEdited = tasks.map(task =>
      task.id === id ? { ...task, title: editedTask, isEditing: false } : task
    )

    setTasks(taskListEdited)
    setEditedTask('')
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
                {task.isEditing === false ? (
                  <p>{task.title}</p>
                ) : (
                  <div>
                    <input
                      type="text"
                      onChange={e => setEditedTask(e.target.value)}
                      value={editedTask}
                    />
                  </div>
                )}
              </div>
              {task.isEditing === false ? (
                <div>
                  <button
                    type="button"
                    data-testid="remove-task-button"
                    onClick={() => handleEditTask(task.id)}
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    type="button"
                    data-testid="remove-task-button"
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    <FiTrash size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    data-testid="remove-task-button"
                    onClick={() => handleEditedTask(task.id)}
                  >
                    <FaRegCheckSquare size={16} />
                  </button>
                  <button
                    type="button"
                    data-testid="remove-task-button"
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    <FiTrash size={16} />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}
