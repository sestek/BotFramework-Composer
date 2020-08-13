import { useCallback, useState, FC } from 'react';
import * as React from 'react';
import { getAccessToken } from '@bfc/client-plugin-lib';

import { root } from './styles';

export const PVADialog: FC = () => {
  const [token, setToken] = useState('');
  const login = useCallback(async () => {
    const token = await getAccessToken({
      clientId: 'ce48853e-0605-4f77-8746-d70ac63cc6bc',
      scopes: ['96ff4394-9197-43aa-b393-6a41652e21f8/.default'],
    }); // this function would manage expiry and storage on the composer side
    setToken(token);
    // use token to call APIs
  }, []);

  return (
    <div style={root}>
      <h1>PVA Plugin</h1>
      {
        <button disabled={!!token} onClick={login}>
          Login
        </button>
      }
      <p>Your token will appear here:</p>
      <textarea value={token}></textarea>
    </div>
  );
};
