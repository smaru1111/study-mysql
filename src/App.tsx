import { useEffect, useState } from 'react';
import './App.css';
import { hover } from '@testing-library/user-event/dist/hover';

type TodoItem = {
    id: number;
    title: string;
    complete: boolean;
}

const App = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>([]); // Todoリストの状態を管理
    const [inputValue, setInputValue] = useState<string>(""); // inputのvalueを管理
    console.log("inputValue: "+inputValue);
    // 初回レンダリング時にAPIコールを行う
    // データ一覧表示
    useEffect(() => {
        (async function () {
        // APIコール
            const todoItems = await fetch(`/api/getAllData`);
            const json = await todoItems.json();
            console.log(json); 
            setTodoList(json);
        })();
    }, []);

    // Todoリストにデータを追加する関数
    const addData = async (inputValue: string) => {
        // APIコール
        await fetch(`/api/addData`, {
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

    // Todoリストからデータを削除する関数
    const deleteData = async (id: number) => {
        // APIコール
        console.log("delete_id: "+id);
        
        await fetch(`/api/deleteData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        // Todoリストを更新
        (async function () {
        // APIコール
            const todoItems = await fetch(`/api/getAllData`);
            const json = await todoItems.json();
            console.log(json);
            setTodoList(json);
        })();
    };

    // データを更新する関数
    const updateData = async (id: number, title: string, complete: boolean) => {
        // APIコール
        await fetch(`/api/updateData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, title: title, complete: complete }),
        });
        // Todoリストを更新
        (async function () {
        // APIコール
            const todoItems = await fetch(`/api/getAllData`);
            const json = await todoItems.json();
            console.log(json);
            setTodoList(json);
        })();
    };


    
    return (
        <div className='body-container'>
            <h1>Todo App</h1>
            <h3>使用技術</h3>
            <p>React / typescript / Azure Static Web App / Azure Functions / Azure Database for MySQL</p>
            <a href="https://github.com/smaru1111/study-mysql" style={{color: "gray"}}>GitHubリポジトリ</a>
            <div className='input-container'>
                {/* バリデーションも実装 */}
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="タスクを入力してください" />
                {/* 追加ボタンを押すと、addData関数が走る */}
                <button onClick={() => addData(inputValue)}>追加</button>
            </div>
            <div className='todoList-container'>
                <div className='todo'>
                    <h2>Todo</h2>
                    <ul>
                        {/* Todoリストを表示 */}
                        {todoList.map((todoItem) => {
                            if (!todoItem.complete) {
                                return (
                                    <li key={todoItem.id} className='todo-item'>
                                        <input type="checkbox" checked={todoItem.complete} onChange={(e) => updateData(todoItem.id, todoItem.title, e.target.checked)} />
                                        <span>{todoItem.title}</span>
                                        <button onClick={() => deleteData(todoItem.id)}>削除</button>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
                <div className='complete'>
                    <h2>Complete</h2>
                    <ul className='todoList-complete'>
                        {/* Todoリストを表示 */}
                        {todoList.map((todoItem) => {
                            if (todoItem.complete) {
                                return (
                                    <li key={todoItem.id} className='todo-item'>
                                        <input type="checkbox" checked={todoItem.complete} onChange={(e) => updateData(todoItem.id, todoItem.title, e.target.checked)} />
                                        <span>{todoItem.title}</span>
                                        <button onClick={() => deleteData(todoItem.id)}>削除</button>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;