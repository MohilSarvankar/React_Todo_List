import React from 'react'
import { TodoItem } from './TodoItem'
import {
    Routes,
    Route,
} from "react-router-dom";

export const Todos = (props) => {
    return (
        <div className='container my-3' style={props.myStyle}>
            <h3 className='text-center my-4'>TODOs List</h3>
            <Routes>
                <Route path="/" element={
                    props.todos.length === 0 ? "No TODOs to display" : props.todos.map((todo) => {
                        return (
                            <TodoItem todo={todo} key={todo.sno} onDelete={props.onDelete} />
                        )
                    })
                } />
                {props.todos.length === 0 ? "No TODOs to display" : props.todos.map((todo) => {
                    return (
                        <Route key={todo.sno} exact path={`${todo.sno}`} element={<TodoItem todo={todo} onDelete={props.onDelete} />} />
                    )
                })}
            </Routes>
        </div>
    )
}
