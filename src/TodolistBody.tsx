import {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValuesType} from "./App"
import {TaskType} from "./Todolist"
import {AddItemForm} from "./AddItemForm"
import {EditableSpan} from "./EditableSpan"
import {Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {getListItemSx} from './Todolist.styles';

type ButtonFilterType = {
    title: string
    onClickHandler: () => void
    color: "secondary" | "primary" | "inherit" | "success" | "error" | "info" | "warning"
}


type TodolistBodyPropsType = {
    tasks: Array<TaskType>
    filter: FilterValuesType
    todolistId: string
    changeTodolistFilter: (newFilterValue: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const TodolistBody = ({
                                 tasks,
                                 filter,
                                 todolistId,
                                 addTask,
                                 removeTask,
                                 changeTaskTitle,
                                 changeTaskStatus,
                                 changeTodolistFilter
                             }: TodolistBodyPropsType) => {

    const buttonsData: ButtonFilterType[] = [
        {
            title: "All",
            onClickHandler: setFilterHandlerCreator("all"),
            color: filter === "all" ? "secondary" : "primary"
        },
        {
            title: "Active",
            onClickHandler: setFilterHandlerCreator("active"),
            color: filter === "active" ? "secondary" : "primary"
        },
        {
            title: "Completed",
            onClickHandler: setFilterHandlerCreator("completed"),
            color: filter === "completed" ? "secondary" : "primary"
        },
    ]

    const filterButtons: Array<JSX.Element> = buttonsData.map(btn => {
        return (
            <Button
                size={'small'}
                variant={'contained'}
                color={btn.color}
                disableElevation
                onClick={btn.onClickHandler}
                sx={{m:"0 2px"}}
            >{btn.title}</Button>
        )
    })
    const tasksList: Array<JSX.Element> = tasks.map((task: TaskType) => {
        const onClickRemoveTaskHandler = () => removeTask(task.id, todolistId)
        const onChangeTaskStatusHandler =
            (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)

        const setTaskNewTitle = (newTitle: string) => changeTaskTitle(task.id, newTitle, todolistId)
        const tasksClasses: string = task.isDone ? "task-done" : "task"

        return (
            <ListItem
                key={task.id}
                disablePadding
                divider
                secondaryAction={
                    <IconButton
                        size={'small'}
                        onClick={onClickRemoveTaskHandler}>
                        <HighlightOffIcon/>
                    </IconButton>
                }
            >

                <Checkbox
                    size={'small'}
                    color={'primary'}
                    onChange={onChangeTaskStatusHandler}
                    checked={task.isDone}>
                </Checkbox>

                {/* <span className={tasksClasses}>{task.title}</span> */}
                <EditableSpan
                    title={task.title}
                    changeItemTitle={setTaskNewTitle}
                    classes={tasksClasses}
                />

            </ListItem>
        )
    })

    function setFilterHandlerCreator(newFilterValue: FilterValuesType) {
        return () => changeTodolistFilter(newFilterValue, todolistId)
    }

    const addNewTask = (newTaskTitle: string) => {
        addTask(newTaskTitle, todolistId)
    }

    return (
        <div>
            <AddItemForm addItem={addNewTask} maxItemLength={10}/>
            <List>
                {tasksList}
            </List>
            <div>
                {filterButtons}
            </div>
        </div>
    )
}