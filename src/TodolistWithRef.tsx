import { useRef } from "react"
import { FilterValuesType } from "./App"
import { Button } from "./Button"
import { log } from "console"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist = ({
    tasks,
    title,
    addTask,
    removeTask,
    changeFilter
}: TodolistPropsType) => {

    const inputRef = useRef<HTMLInputElement>(null)




    const tasksList: Array<JSX.Element> = tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <Button title="x" onClickHandler={() => removeTask(task.id)} />
            </li>
        )
    })


    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>

                <input ref={inputRef} />
                <Button title="+" onClickHandler={() => {
                    if (inputRef.current) {
                        addTask(inputRef.current.value)
                        inputRef.current.value = ""
                    }
                }} />
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button title="All" onClickHandler={() => changeFilter("all")} />
                <Button title="Active" onClickHandler={() => changeFilter("active")} />
                <Button title="Completed" onClickHandler={() => changeFilter("completed")} />
            </div>
        </div>
    )
}