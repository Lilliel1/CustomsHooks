import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const initialState = []

const init = () => {
    return JSON.parse(localStorage.getItem('todos') ) || [];
}

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos) )
  
      }, [todos])

    const handleNewTodo = (todo) => {
        const action = {
            type: "Add Todo",
            payload: todo
        }
        dispatch(action);
    } 

    const handleToggleTodo = (id) => {
        console.log(id)
        dispatch( {
            type: "Toggle Todo",
            payload: id
        })
    }
        
    const handleDeleteTodo = (id) => {
        dispatch({
            type: 'Remove Todo',
            payload: id
        });
    }

  return {
        ...todos,
        todos,
        handleNewTodo,
        handleToggleTodo,
        handleDeleteTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length
    }
  
}
