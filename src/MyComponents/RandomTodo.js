import React from 'react'
import { TodoItem } from './TodoItem'

export default function RandomTodo(props) {
    let random = Math.floor(Math.random() * (props.todos.length));

    return (
        <div className="container" style={props.myStyle}>
            <h3 className='my-3 text-center'>Randomly Generated Todo</h3>
            {
                props.todos.length === 0 ?
                    "No TODOs to display" :
                    <TodoItem todo={props.todos[random]} onDelete={props.onDelete} />
            }
        </div>
    )
}
