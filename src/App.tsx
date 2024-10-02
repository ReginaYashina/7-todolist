import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Container, createTheme, CssBaseline, Grid2, Paper, Switch, ThemeProvider} from '@mui/material';
import {teal, yellow} from '@mui/material/colors';

export type FilterValuesType = "all" | "active" | "completed"

//C
//R  (view mode, filter, sort, search, pagination, )
//U
//D

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

export function App() {

    //BLL:

    const todolistId_1 = v1() // "43KG-LROGRGKLG-0549034904KDGFKLKL-DFSKD"
    const todolistId_2 = v1()

    const [isDarkMode, setIsDarkMode ] = useState(false)

    const [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {
                "id": todolistId_1,// "43KG-LROGRGKLG-0549034904KDGFKLKL-DFSKD"
                "title": "What to learn",
                "filter": "all",
            },
            {
                id: todolistId_2,
                title: "What to buy",
                filter: "all",
            },
        ]
    )
    const [tasks, setTasks] = useState<TasksStateType>({
            [todolistId_1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS/TS", isDone: false},
            ],
            [todolistId_2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: true},
                {id: v1(), title: "Meat", isDone: false},
                {id: v1(), title: "Meat", isDone: false},
            ],
        }
    )
    // tasks
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: TasksStateType = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(nextState)
    }

    const removeTask = (taskId: string, todolistId: string) => {
        const nextState: TasksStateType = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(nextState)
    }

    const changeTaskStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
        const nextState: TasksStateType = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatus} : t)
        }
        setTasks(nextState)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const nextState: TasksStateType = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        }
        setTasks(nextState)
    }

    // todolists
    const changeTodolistFilter = (newFilterValue: FilterValuesType, todolistId: string) => {
        const nextState: Array<TodolistType> =
            todolists.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} : tl)
        setTodolists(nextState)
    }
    const removeTodolist = (todolistId: string) => {
        const nextState: Array<TodolistType> =
            todolists.filter(tl => tl.id !== todolistId)
        setTodolists(nextState)
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const newTodo: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        const nextState: Array<TodolistType> = [...todolists, newTodo]
        setTodolists(nextState)

        const nextTasksState: TasksStateType = {...tasks, [newTodo.id]: []}
        setTasks(nextTasksState)
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        const nextState: Array<TodolistType> =
            todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl)
        setTodolists(nextState)
    }


    const todolistsComponents: Array<JSX.Element> = todolists.map((tl: TodolistType) => {

        let filteredTasks: Array<TaskType> = tasks[tl.id]
        if (tl.filter === "active") {
            filteredTasks = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            filteredTasks = tasks[tl.id].filter(t => t.isDone === true)
        }

        return (
            <Grid2  key={tl.id}>
                <Paper>
                    <Todolist
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tl.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTodolistFilter={changeTodolistFilter}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid2>


        )
    })

    const theme = createTheme({
        palette:{
            primary: yellow,
            secondary: teal,
            mode: isDarkMode ? 'dark' : 'light'
        },
    })



    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position="static">
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Box>
                            <Switch onChange={()=>{setIsDarkMode(!isDarkMode)}}/>
                            <Button color="inherit">Login</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid2 container sx={{m: '20px 0'}}>
                        <AddItemForm
                            addItem={addTodolist}
                            maxItemLength={20}
                        />
                    </Grid2>
                    <Grid2
                        container
                        spacing={3}>
                        {todolistsComponents}
                    </Grid2>
                </Container>
            </div>
        </ThemeProvider>

    );
}


