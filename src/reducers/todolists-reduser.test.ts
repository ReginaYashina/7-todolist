import {TodolistType} from '../App';
import {v1} from 'uuid';
import {addTodolistAT, changeTodolistTitleAT, todolostsReducer} from './todolists-reduser'

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action: addTodolistAT= {
        type: 'ADD TODOLIST',
        payload: {
            title: 'New Todolist',
        },
    }
    const endState = todolostsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(action.payload.title)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action:changeTodolistTitleAT = {
        type: 'CHANGE TODOLIST TITLE',
        payload: {
            todolistId: todolistId2,
            newTitle: 'New Todolist',
        },
    }
    const endState = todolostsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.newTitle)
})