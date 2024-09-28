import {ChangeEvent, useState} from "react"
import {TextField} from '@mui/material';


type EditableSpanPropsType = {
    title: string
    changeItemTitle: (newTitle: string) => void
    classes?: string
}

export const EditableSpan = ({title, changeItemTitle, classes}: EditableSpanPropsType) => {

    const [titleInputValue, setTitleInputValue] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        changeItemTitle(titleInputValue)
        setEditMode(false)
    }
    const onChangeSetTitleInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInputValue(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                variant={'standard'}
                value={titleInputValue}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeSetTitleInputValueHandler}

            />
            : <span
                onDoubleClick={onEditMode}
                className={classes}>{title}</span>
    )
}