import { useCallback, useState, FC } from 'react';
import * as React from 'react';

import { root } from './styles';
import { AuthClient } from './authClient';

export const PVADialog: FC = () => {
  const [token, setToken] = useState('');
  const login = useCallback(async () => {
    const accessToken = await AuthClient.getInstance().getToken();
    setToken(accessToken);
  }, []);

  return (
    <div style={root}>
      <h1>PVA Auth</h1>
      {token && <p style={{ overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>token: {token}</p>}
      <button onClick={login}>Login</button>
    </div>
  );
};
