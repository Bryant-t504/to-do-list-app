import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Plus, Trash2, Check, Pencil, X, CheckCircle2 } from "lucide-react"
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-muted"
      >
        <CheckCircle2 className="size-10 text-muted-foreground" />
      </motion.div>
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-2 text-xl font-semibold text-foreground"
      >
        No tasks yet
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-sm text-muted-foreground"
      >
        Add your first task above to get started. Stay organized and accomplish
        more!
      </motion.p>
    </motion.div>
  )
}

interface TaskItemProps {
  task: Task
  index: number
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
}

function TaskItem({ task, index, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const y = useSpring(mouseY, { damping: 30, stiffness: 200 })
  const rotateX = useTransform(y, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(x, [-0.5, 0.5], ["-3deg", "3deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

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
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.9, filter: "blur(10px)" }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`relative flex items-center gap-4 rounded-xl border p-5 backdrop-blur-sm transition-all duration-300 ${
          task.completed 
            ? "border-border/30 bg-secondary/30" 
            : "border-border/50 bg-card/50 hover:border-border hover:bg-card"
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="size-6 rounded-lg border-2 transition-all duration-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
          />
        </motion.div>

        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 border-none bg-transparent p-0 text-foreground shadow-none focus-visible:ring-0 text-base"
            autoFocus
          />
        ) : (
          <motion.span
            layout
            className={`flex-1 text-base transition-all duration-300 ${
              task.completed
                ? "text-muted-foreground line-through"
                : "text-foreground"
            }`}
          >
            {task.text}
          </motion.span>
        )}

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            {isEditing ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleEdit}
                    className="size-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    <Check className="size-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => {
                      setEditText(task.text)
                      setIsEditing(false)
                    }}
                    className="size-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    <X className="size-4" />
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setIsEditing(true)}
                    className="size-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    <Pencil className="size-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete(task.id)}
                    className="size-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Completion checkmark animation */}
        <AnimatePresence>
          {task.completed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <div className="size-2 rounded-full bg-emerald-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([])
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
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <section id="app" className="relative py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-accent/10 blur-[150px]"
        />
      </div>

      <div className="mx-auto max-w-2xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-8 sm:p-10 backdrop-blur-xl shadow-2xl shadow-background/50"
        >
          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-foreground">My Tasks</h2>
              <p className="mt-2 text-muted-foreground">
                {completedCount} of {totalCount} completed
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-muted"
            >
              <span className="text-2xl font-bold text-foreground">
                {totalCount - completedCount}
              </span>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mb-10 h-2 overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]"
              style={{
                animation: progress > 0 ? "gradient 3s ease-in-out infinite" : "none"
              }}
            />
          </div>

          {/* Add task input */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 flex gap-4"
          >
            <div className="relative flex-1">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-14 rounded-xl border-border/50 bg-secondary/50 px-5 text-foreground text-base placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={addTask}
                size="lg"
                className="h-14 rounded-xl px-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300"
                disabled={!newTask.trim()}
              >
                <Plus className="size-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Task list */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {tasks.length === 0 ? (
                <EmptyState />
              ) : (
                tasks.map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    index={index}
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
    </section>
  )
}
