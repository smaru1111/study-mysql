import { useEffect, useState } from 'react';
import './App.css';

type TodoItem = {
    id: number;
    title: string;
    completed: boolean;
}

const App = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>([]); // Todoリストの状態を管理
    const [inputValue, setInputValue] = useState<string>(""); // inputのvalueを管理
    console.log("inputValue: "+inputValue);
    // 初回レンダリング時にAPIコールを行う
    useEffect(() => {
        (async function () {
        // APIコール
            const todoItems = await fetch(`/api/getAllData`);
            const json = await todoItems.json();
            console.log(json); 
            setTodoList(json);
        })();
    }, []);

    const addData = async (inputValue: string) => {
        // APIコール
        const res = await fetch(`/api/addData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: inputValue }),
        });
        // Todoリストを更新
        (async function () {
        // APIコール
            const todoItems = await fetch(`/api/getAllData`);
            const json = await todoItems.json();
            console.log(json); 
            setTodoList(json);
        })();
        // inputのvalueを空にする
        setInputValue("");
    };
    
    return (
        <div className='body-container'>
            <h1>Todo App</h1>
            <div className='input-container'>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                {/* 追加ボタンを押すと、addData関数が走る */}
                <button onClick={() => addData(inputValue)}>追加</button>
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