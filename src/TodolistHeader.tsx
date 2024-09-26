import { EditableSpan } from "./EditableSpan"
import {IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


type TodolistHeaderPropsType = {
    title: string
    removeTodolist: () => void
    toggleVeiwMode: () => void
    isCollapsed: boolean
    changeTodolistTitle: (title: string) => void
    
}

export const TodolistHeader = (props: TodolistHeaderPropsType) => {
    return (
        <h3>
            <EditableSpan title={props.title} changeItemTitle={props.changeTodolistTitle} />
            <IconButton
                size={'small'}
                onClick={props.removeTodolist}>
                <HighlightOffIcon/>
            </IconButton>
            <input
                type="checkbox"
                onChange={props.toggleVeiwMode}
                checked={props.isCollapsed}
            />
        </h3>
    )
}