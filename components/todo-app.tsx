"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Check, Pencil, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: string
  text: string
  completed: boolean
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-secondary">
        <Check className="size-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        No tasks yet
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Add your first task above to get started. Stay organized and accomplish
        more!
      </p>
    </motion.div>
  )
}

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
}

function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim())
    } else {
      setEditText(task.text)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit()
    } else if (e.key === "Escape") {
      setEditText(task.text)
      setIsEditing(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all duration-200 hover:border-border hover:bg-card"
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="size-5 rounded-md border-2 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
      />

      {isEditing ? (
        <Input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 border-none bg-transparent p-0 text-foreground shadow-none focus-visible:ring-0"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 text-sm transition-all duration-200 ${
            task.completed
              ? "text-muted-foreground line-through"
              : "text-foreground"
          }`}
        >
          {task.text}
        </span>
      )}

      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleEdit}
              className="size-8 text-muted-foreground hover:text-foreground"
            >
              <Check className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setEditText(task.text)
                setIsEditing(false)
              }}
              className="size-8 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsEditing(true)}
              className="size-8 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(task.id)}
              className="size-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </>
        )}
      </div>
    </motion.div>
  )
}

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Review project requirements", completed: true },
    { id: "2", text: "Design user interface mockups", completed: false },
    { id: "3", text: "Set up development environment", completed: false },
  ])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          text: newTask.trim(),
          completed: false,
        },
      ])
      setNewTask("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const editTask = (id: string, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  return (
    <section id="app" className="relative py-24">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-8 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">My Tasks</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {completedCount} of {totalCount} completed
              </p>
            </div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-secondary">
              <span className="text-lg font-semibold text-foreground">
                {totalCount - completedCount}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : "0%",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full rounded-full bg-primary"
            />
          </div>

          {/* Add task input */}
          <div className="mb-6 flex gap-3">
            <Input
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-xl border-border/50 bg-secondary/50 px-4 py-6 text-foreground placeholder:text-muted-foreground focus-visible:border-border focus-visible:ring-0"
            />
            <Button
              onClick={addTask}
              size="lg"
              className="rounded-xl px-6"
              disabled={!newTask.trim()}
            >
              <Plus className="size-5" />
            </Button>
          </div>

          {/* Task list */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {tasks.length === 0 ? (
                <EmptyState />
              ) : (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Floating action button for mobile */}
      <Button
        onClick={() => {
          const input = document.querySelector<HTMLInputElement>(
            'input[placeholder="Add a new task..."]'
          )
          input?.focus()
        }}
        size="lg"
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full shadow-lg md:hidden"
      >
        <Plus className="size-6" />
      </Button>
    </section>
  )
}
