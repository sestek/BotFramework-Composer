import * as React from 'react';
import { useCallback, useState } from 'react';

const Main: React.FC<{}> = (props) => {
  const [text, setText] = useState('');

  const onInputChange = useCallback((ev) => {
    setText(ev.target.value);
  }, []);

  return (
    <div>
      <h1>This is a plugin react app!</h1>
      <input type="text" onChange={onInputChange} placeholder="Type something in here"></input>
      <h2>{text}</h2>
    </div>
  );
};

window['Composer'].render(<Main />);
