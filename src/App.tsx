import { useEffect, useState } from 'react';

const App = () => {
    const [text, setText] = useState<string>('');
    useEffect(() => {
        (async () => {
            const { text } = await (await fetch(`http://localhost:7071/api/todos`)).json();
            setText(text);
        })();
    }, []);
    return (
        <div id="name">{text}</div>
    );
}

export default App;