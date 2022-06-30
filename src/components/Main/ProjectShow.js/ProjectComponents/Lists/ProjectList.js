import React, {useState, useEffect} from 'react'
import { List, ThemeIcon, Paper, Title, Divider, Grid, TextInput, ActionIcon, Group, Stack } from '@mantine/core';
import { CircleCheck, CircleDashed, ArrowBarDown } from 'tabler-icons-react';
import Task from './Task';

export default function ProjectList(props) {

    const [tasks, setTasks] = useState(props.tasks);

    const [listTask, setListTask] = useState({
        content: "",
        completed: false,
        list_id: props.listId
    });

    const handleChange = e => setListTask({...listTask, [e.target.name]: e.target.value})

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:3001/api/v2/tasks/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
                },
                body: JSON.stringify({task: listTask})
                })
        .then(response => response.json())
        .then(payload => {
            if (payload.status === "created") {
                setListTask({
                    content: "",
                    completed: false,
                    list_id: props.listId
                })
                setTasks([...tasks, payload.message] )
            }
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    const renderTasks = () => {
        if (tasks.length > 0) {
            return tasks.map(task => {
                return <Task 
                            taskId={task.id}
                            key={task.id}
                            content={task.content}
                            completed={task.completed}
                        />
            })
        }
    }
    
    return (
        <Grid.Col md={6}>
            <Paper shadow="xs" p="sm">
                <Title order={3}>{props.title}</Title>
                <Divider my="sm" />
                <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                        <CircleCheck size={16} />
                    </ThemeIcon>
                    }
                >
                    <Paper shadow="md" radius="xs" p="sm" withBorder>
                        <List.Item
                            icon={
                                <ThemeIcon size={24} radius="xl">
                                    <CircleDashed size={16} />
                                </ThemeIcon>
                            }
                        >  
                            <form onSubmit={handleSubmit}>
                                <Stack>
                                    <Group position="apart">
                                        <TextInput
                                            placeholder="List Item..."
                                            radius="xs"
                                            required
                                            name="content"
                                            value={listTask.content}
                                            onChange={handleChange}
                                        />
                                        <ActionIcon type="submit" color={"green"}>
                                            <ArrowBarDown />
                                        </ActionIcon>
                                    </Group>
                                </Stack>
                            </form>
                        </List.Item>
                    </Paper>
                    {renderTasks()}
                </List>
            </Paper>                    
        </Grid.Col>
    )
}
