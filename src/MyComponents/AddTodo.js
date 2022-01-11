import {React, useState} from 'react';
// import validator from 'validator';

export const AddTodo = ({addTodo, myStyle, showAlert}) => {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");

    const submit =(e) => {
        e.preventDefault();
        
        if(title.length!==0 && desc.length!==0){
            showAlert("Todo created successfully.","success");
            addTodo(title,desc);
            document.getElementById("todoForm").reset();
        }
        else{
            showAlert("Title or description cannot be blank","danger");
        }
    }

    return (
        <div className="container" style={myStyle}>
            <h3 className='text-center my-3'>Add TODOs</h3>
            <form id='todoForm' onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">TODO Title</label>
                    <input type="text" required className="form-control" onChange={(e)=>setTitle(e.target.value.trim())} id="title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">TODO Description</label>
                    <textarea className="form-control" required id="desc" onChange={(e)=>setDesc(e.target.value.trim())} rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-success">Add TODO</button>
            </form>
        </div>
    )
}
