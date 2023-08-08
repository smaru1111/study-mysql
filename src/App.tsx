import { useEffect, useState } from 'react';
import './App.css';

type TodoItem = {
    id: number;
    title: string;
    completed: boolean;
}

const App = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    useEffect(() => {
        (async function () {
        // APIコール
            const todoItems = await fetch(`/api/getAllData`);
            const json = await todoItems.json();
            console.log(json); 
            setTodoList(json);
        })();
    }, []);
    console.log("aaa"+todoList);
    
    return (
        <div className='body-container'>
            <h1>Todo App</h1>
            <div className='input-container'>
                <input type="text" />
                <button>追加</button>
            </div>
            <ul className="todo-list">
                {todoList.map((item, index) => (
                    <li key={index} className='todo-item'>
                        <p>{item.title}</p>
                        <button>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;