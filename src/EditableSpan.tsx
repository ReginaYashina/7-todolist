import { ChangeEvent, useState } from "react"


type EditableSpanPropsType = {
    title: string
    changeItemTitle: (newTitle: string) => void
}

export const EditableSpan = ({ title, changeItemTitle }: EditableSpanPropsType) => {

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
            ? <input
                value={titleInputValue}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeSetTitleInputValueHandler}

            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}