import { useState } from "react";
const TodoSearchBox = ({ setTodos }) => {
    const [value, setValue] = useState('');
    
    const filterSearch = (e) => {
        var query = e.target.value;
        console.log(query)
        const storedTodos = JSON.parse(localStorage.getItem('todos'))
        const newTodos = storedTodos.filter((todo) => (todo.task.toLowerCase().indexOf(query.toLowerCase()) !== -1))
        setTodos(newTodos)
    }
    return (
        <div>
            <div className="TodoForm">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={filterSearch} className="todo-input" placeholder='Search Task here' />
            </div>
        </div>
    )
}

export default TodoSearchBox
