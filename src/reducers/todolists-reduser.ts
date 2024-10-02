import {FilterValuesType, TodolistType} from '../App';

import {v1} from 'uuid';

export type removeTodolistAT = {
    type: 'REMOVE TODOLIST'
    payload: {
        todolistId: string
    }
}
export type addTodolistAT = {
    type: 'ADD TODOLIST'
    payload: {
        title: string
    }
}
export type changeTodolistFilterAT = {
    type: 'CHANGE TODOLIST FILTER'
    payload: {
        newFilterValue: FilterValuesType
        todolistId: string
    }
}
export type changeTodolistTitleAT = {
    type: 'CHANGE TODOLIST TITLE'
    payload: {
        newTitle: string
        todolistId: string
    }
}

type ActionsTypes = removeTodolistAT | addTodolistAT | changeTodolistFilterAT | changeTodolistTitleAT


export const todolostsReducer = (todolists: Array<TodolistType>, actions: ActionsTypes): Array<TodolistType> => {
    switch (actions.type) {
        case 'REMOVE TODOLIST':
            const {todolistId} = actions.payload
            return todolists.filter(tl => tl.id !== todolistId)

        case 'ADD TODOLIST':
            const {title} = actions.payload
            const newTodo: TodolistType = {
                id: v1(),
                title: title,
                filter: 'all'
            }
            return [...todolists, newTodo]

        case 'CHANGE TODOLIST FILTER':
            const {newFilterValue} = actions.payload
            return todolists.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} : tl)

        case 'CHANGE TODOLIST TITLE':
            const {newTitle} = actions.payload
            return todolists.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} : tl)

        default:
            return todolists
    }


}