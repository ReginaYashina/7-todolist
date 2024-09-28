import {SxProps} from '@mui/material';

export const TodolistSx: SxProps = {
    backgroundColor: '#1de9b636',
    border: '2px solid darkslategrey',
    borderRadius: '5px',
    padding: '15px'
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    fontWeight: isDone ? 'normal' : 'bold',
    opacity: isDone ? 0.5 : 1,
    textDecoration: isDone ? ' line-through' : 'none'
})
