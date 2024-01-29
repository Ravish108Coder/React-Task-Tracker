import React, { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import TodoSearchBox from './TodoSearchBox';
uuidv4();

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([])
    const [filter, setfilter] = useState("all");

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        console.log("hello",savedTodos)
        setTodos(savedTodos);
        handleFilter(filter)
    }, []);

    const addTodo = todo => {
        const newDate = new Date().toLocaleString();
        const newTodos = [...todos, { id: uuidv4(), date:newDate, task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTodo = id => {
        setTodos(todos?.map(todo => todo.id === id ? { ...todo, date: new Date().toLocaleString(), isEditing: !todo.isEditing } : todo))
    }

    const editTask = (task, id) => {
        const newTodos = todos?.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const handleFilter = (str) => {
        setfilter(str);
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
      
        if (str === 'all') {
          console.log('Filtering: all');
          setTodos(storedTodos);
        } else if (str === 'Complete') {
          console.log('Filtering: Complete');
          const newTodos = storedTodos?.filter((todo) => todo.completed === true);
          setTodos(newTodos);
        } else if (str === 'Incomplete') {
          console.log('Filtering: Incomplete');
          const newTodos = storedTodos?.filter((todo) => todo.completed === false);
          setTodos(newTodos);
        }
      };
      
    return (
        <div className='TodoWrapper'>
            <h1>React Task Tracker</h1>
            <TodoForm addTodo={addTodo} />
            <TodoSearchBox setTodos={setTodos}/>
            <div className="filterButtons">
                <button onClick={()=>{handleFilter("all")}}>All</button>
                <button onClick={()=>{handleFilter("Complete")}}>Complete</button>
                <button onClick={()=>{handleFilter("Incomplete")}}>Incomplete</button>
            </div>
            {todos?.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} />
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} date={todo.date}/>
                )

            ))}

        </div>
    )
}
