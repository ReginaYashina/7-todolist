import { useState, KeyboardEvent, ChangeEvent } from "react"
import { FilterValuesType } from "./App"
import { Button } from "./Button"
import { TodolistHeader } from "./TodolistHeader"
import { TodolistBody } from "./TodolistBody"
import {TodolistSx} from './Todolist.styles';
import {Box} from '@mui/material';


type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType

    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

    removeTodolist: (todolistId: string) => void
    changeTodolistFilter: (newFilterValue: FilterValuesType, todolistId: string) => void
    changeTodolistTitle:(newTitle: string, todolistId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist = ({
    tasks,
    title,
    filter,
    todolistId,
    addTask,
    removeTask,
    changeTaskTitle,
    changeTaskStatus,
    removeTodolist,
    changeTodolistTitle,
    changeTodolistFilter,
}: TodolistPropsType) => {

    const [collapsed, setCollapsed] = useState(false)

    const setTodolistNewTitle = (newTitle: string) => changeTodolistTitle(newTitle, todolistId)

    return (
        <Box sx={TodolistSx}>
            <TodolistHeader
                title={title}
                isCollapsed={collapsed}
                toggleVeiwMode={() => setCollapsed(!collapsed)}
                removeTodolist={() => removeTodolist(todolistId)}
                changeTodolistTitle={setTodolistNewTitle}
            />
            {!collapsed &&
                <TodolistBody
                    tasks={tasks}
                    filter={filter}
                    todolistId={todolistId}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}
                    changeTodolistFilter={changeTodolistFilter}
                />
            }
        </Box>
    )
}