import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"


type AddItemFormPropsType = {
   addItem: (title: string) => void
   maxItemLength: number
}

export const AddItemForm = ({
    addItem,
    maxItemLength
}: AddItemFormPropsType) => {
    //state
    const [titleInputValue, setTitleInputValue] = useState("")
    const [inputError, setInputError] = useState<boolean>(false)

    const onClickAddItemHandler = () => {
        const trimmedTitle = titleInputValue.trim()
        if (!isInputBtnDisabled && !userErrorLengthMessge && trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setInputError(true)
        }
        setTitleInputValue("")
    }

    const onKeyEnterDownAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItemHandler()
        }
    }
    const onChangeSetTitleInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setTitleInputValue(e.currentTarget.value)
    }
    //local variables
    const isInputBtnDisabled = !titleInputValue
    const userLengthMessage = `There are  ${maxItemLength - titleInputValue.length} characters left to enter `
    const userErrorLengthMessge = titleInputValue.length > maxItemLength
    return (
        <div>
            <input
                value={titleInputValue}
                onChange={onChangeSetTitleInputValueHandler}
                onKeyDown={onKeyEnterDownAddItemHandler}
                className={inputError ? "input-error" : undefined}
            />
            <Button
                title="+"
                disabled={isInputBtnDisabled || userErrorLengthMessge}
                onClickHandler={onClickAddItemHandler}
            />
            {isInputBtnDisabled && !inputError && <div>Max length item title is {maxItemLength} charters</div>}
            {(!isInputBtnDisabled && !userErrorLengthMessge && !inputError) && <div>{userLengthMessage}</div>}
            {userErrorLengthMessge && <div style={{ color: "red" }}>Task title is too long</div>}
            {inputError && <div style={{ color: "red" }}>Title is required</div>}
        </div>
    )
}