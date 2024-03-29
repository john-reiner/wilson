import React, { useState } from 'react'

import { ActionIcon, TextInput}  from '@mantine/core';
import { ArrowBarRight } from 'tabler-icons-react';

interface EditTitleFormProps {
    title: string
    id: string | number
    route: string
    setFetchList: React.Dispatch<React.SetStateAction<boolean>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditTitleForm({
    title,
    id,
    route,
    setFetchList,
    setEdit
}: EditTitleFormProps) {

    const [listTitle, setListTitle] = useState(title)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setListTitle(e.target.value)

    const updateList = (
        title: string,
        id: number | string,
        route: string
        ) => {
        fetch(`${route}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({list: {title}})
                })
        .then(response => response.json())
        .then(payload => {
            setFetchList(true)
            setEdit(false)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        updateList(listTitle, id, route)
    }

    return (
        <form
            style={{ width: "90%" }}
            onSubmit={(e) => handleSubmit(e)}
        >
            <TextInput
                radius="xs"
                required
                name="title"
                value={listTitle}
                onChange={handleChange}
                rightSection={
                    <ActionIcon type="submit" color={"green"}>
                        <ArrowBarRight />
                    </ActionIcon>
                }
            />                    
        </form>
    )
}
