import { useEffect, useState } from 'react';

const App = () => {
    const [text, setText] = useState("aaaa");
    useEffect(() => {
        (async function () {
          // APIコール
          const { text } = await( await fetch(`/api/HttpTrigger1`)).json();
          setText(text);
        })();
      });
    console.log(text);
    
    return (
        <div id="name">{text}</div>
    );
}

export default App;