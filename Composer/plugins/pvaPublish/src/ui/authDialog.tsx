import { useCallback, useEffect, useMemo, useState, FC } from 'react';
import * as React from 'react';

import { col, row, root } from './styles';
import { AuthClient } from './authClient';

const tenants = ['Tenant 1', 'Tenant 2'];
const envsDefault = ['Env 1', 'Env 2', 'Env 3'];
const botsDefault = ['Bot 1', 'Bot 2', 'Bot 3', 'Bot 4'];

export const PVADialog: FC = () => {
  const [token, setToken] = useState('');
  const [tenant, setTenant] = useState(tenants[0]);
  const [env, setEnv] = useState('');
  const [envs, setEnvs] = useState([]);
  const [bot, setBot] = useState('');
  const [bots, setBots] = useState([]);
  const [fetchingEnvs, setFetchingEnvs] = useState(false);
  const [fetchingBots, setFetchingBots] = useState(false);
  const login = useCallback(async () => {
    const accessToken = await AuthClient.getInstance().getToken();
    setToken(accessToken);
  }, []);

  const tenantSelected = useMemo(() => {
    return tenant !== '';
  }, [tenant]);

  const envSelected = useMemo(() => {
    return env !== '';
  }, [env]);

  const botSelected = useMemo(() => {
    return bot !== '';
  }, [bot]);

  // fake async loading when selecting from dropdown
  useEffect(() => {
    setFetchingEnvs(true);
    setTimeout(() => {
      setFetchingEnvs(false);
      setEnvs(envsDefault);
      setEnv(envsDefault[0]);
    }, 2000);
  }, [tenant]);
  useEffect(() => {
    if (envSelected) {
      setFetchingBots(true);
      setTimeout(() => {
        setFetchingBots(false);
        setBots(botsDefault);
        setBot[botsDefault[1]];
      }, 2000);
    }
  }, [envSelected, fetchingEnvs]);

  const updateTenant = useCallback((ev) => {
    setTenant(ev.target.value);
  }, []);

  const updateEnv = useCallback((ev) => {
    setEnv(ev.target.value);
  }, []);

  const updateBot = useCallback((ev) => {
    setBot(ev.target.value);
  }, []);

  const getEnvDropdown = useMemo(() => {
    if (fetchingEnvs) {
      return <p>Fetching envs...</p>;
    }
    return (
      <div style={row}>
        <label htmlFor={'env-select'}>Select a bot environment:</label>
        <select disabled={!tenantSelected} value={env} id={'env-select'} onChange={updateEnv}>
          {envs.map((env) => (
            <option key={env} value={env}>
              {env}
            </option>
          ))}
        </select>
      </div>
    );
  }, [fetchingEnvs, envs]);

  const getBotDropdown = useMemo(() => {
    if (envSelected && fetchingBots) {
      return <p>Fetching bots...</p>;
    }
    if (envSelected && !fetchingBots) {
      return (
        <div style={row}>
          <label htmlFor={'bot-select'}>Select a bot:</label>
          <select disabled={!envSelected} value={bot} id={'bot-select'} onChange={updateBot}>
            {bots.map((bot) => (
              <option key={bot} value={bot}>
                {bot}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return null;
  }, [fetchingBots, fetchingEnvs, bots]);

  return (
    <div style={root}>
      <h1>PVA Plugin</h1>
      {/* {token && <p style={{ overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>token: {token}</p>}
      <button onClick={login}>Login</button> */}
      <div style={col}>
        <div style={row}>
          <label htmlFor={'tenant-select'}>Select a tenant:</label>
          <select value={tenant} id={'tenant-select'} onChange={updateTenant}>
            {tenants.map((tenant) => (
              <option key={tenant} value={tenant}>
                {tenant}
              </option>
            ))}
          </select>
        </div>
        {getEnvDropdown}
        {getBotDropdown}
        <div style={row}>
          <button disabled={!(tenantSelected && envSelected && botSelected)} type="button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
