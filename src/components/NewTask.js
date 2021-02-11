import React, { useState } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'


export default function NewTask(props) {
    
    const [name, setName] = useState('')
    const [errors, setErrors] = useState('')

    const handleChange = e => setName(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`https://wilson-rails.herokuapp.com/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('wilsonUserToken')
            },
            body: JSON.stringify({
                name: name,
                goal_id: props.clickedGoalid
            })
        })
        .then(response => response.json())
        .then(task => {
            if (!task.error) {
                props.handleNewTaskId(task.id)
                setName('')
                setErrors('')         
                props.onHide()
            } else {
                setErrors(readableError(task.exception))
            }
        })
    }

    const readableError = error => {
        let errorArray = error.split(':')
        let untrimmedError = errorArray[errorArray.length - 1]
        let wellGroomedError = untrimmedError.trim().slice(0, -1)
        return wellGroomedError
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Task:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Task" name={'task'} value={name} onChange={handleChange} />
                    </Form.Group>
                    <div className="button-error-container">
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                        <div className='error' >{errors}</div>                        
                    </div>
                </Form>
            </Modal.Body>               
        </Modal>
    )
}