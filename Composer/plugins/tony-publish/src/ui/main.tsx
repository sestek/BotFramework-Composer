import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';
import { root, row } from './styles';

export const Main: React.FC<{}> = (props) => {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [val3, setVal3] = useState('');
  const [ready, setReady] = useState(false);

  const updateVal1 = useCallback((ev) => {
    setVal1(ev.target.value);
  }, []);

  const updateVal2 = useCallback((ev) => {
    setVal2(ev.target.value);
  }, []);

  const updateVal3 = useCallback((ev) => {
    setVal3(ev.target.value);
  }, []);

  const handleClick = useCallback(() => {
    console.log('Submitting config to composer!');
    (window as any).Composer.publish.submitConfig({ val1, val2, val3 });
  }, [val1, val2, val3]);

  useEffect(() => {
    if (val1 && val2 && val3) {
      setReady(true);
    }
  }, [val1, val2, val3]);

  return (
    <div style={root}>
      <div style={row}>
        <label htmlFor={'val1'}>Value 1:</label>
        <input id={'val1'} placeholder={'Enter a value...'} value={val1} onChange={updateVal1}></input>
      </div>
      <div style={row}>
        <label htmlFor={'val2'}>Value 2:</label>
        <input id={'val2'} placeholder={'Enter a value...'} value={val2} onChange={updateVal2}></input>
      </div>
      <div style={row}>
        <label htmlFor={'val3'}>Value 3:</label>
        <input id={'val3'} placeholder={'Enter a value...'} value={val3} onChange={updateVal3}></input>
      </div>
      <div style={row}>
        <button disabled={!ready} onClick={handleClick} type="button">
          Submit
        </button>
      </div>
    </div>
  );
};
