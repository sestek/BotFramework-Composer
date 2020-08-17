import { useCallback, useEffect, useMemo, useState, FC } from 'react';
import * as React from 'react';
import { getAccessToken } from '@bfc/client-plugin-lib';

import { root, button, dropdown, label } from './styles';

const API_VERSION = '1';

export interface BotEnvironment {
  id: string;
  displayName: string;
  primarySecurityGroupId: string;
  default: boolean;
  url: string;
  expiration: string;
  expiringInDays: number;
  locationId: string;
  locationDisplayName: string;
  environmentSku: string;
  isLiteSku: boolean;
  isTeamsLinked: boolean;
}

export interface Bot {
  id: string;
  aadTenantId: string;
  name: string;
  region: {
    id: string;
    displayName: string;
    primarySecurityGroupId: string;
    default: boolean;
    url: string;
    expiration: string;
    expiringInDays: number;
    locationId: string;
    locationDisplayName: string;
    environmentSku: string;
    isLiteSku: boolean;
    isTeamsLinked: boolean;
  };
  regionId: string;
  cdsBotId: string;
  users: {
    botId: string;
    aadUserId: string;
    role: number;
  }[];
  provisioningStatus: number;
  isManaged: boolean;
  isCustomizable: boolean;
  language: string;
  languageCode: number;
  almMigrationState: string;
  requiresFlowRegistration: boolean;
  lastPublishedVersion: string;
}

function fetchProxy(url, options) {
  return fetch(`/api/proxy/${encodeURIComponent(url)}`, {
    method: 'POST',
    body: JSON.stringify(options),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const PVADialog: FC = () => {
  const [token, setToken] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [envs, setEnvs] = useState<BotEnvironment[]>([]);
  const [env, setEnv] = useState<string>(null);
  const [bots, setBots] = useState<Bot[]>([]);

  // async ui
  const [loggingIn, setLoggingIn] = useState(false);
  const [fetchingEnvironments, setFetchingEnvironments] = useState(false);
  const [fetchingBots, setFetchingBots] = useState(false);

  const login = useCallback(async () => {
    setLoggingIn(true);
    const token = await getAccessToken({
      clientId: 'ce48853e-0605-4f77-8746-d70ac63cc6bc',
      scopes: ['96ff4394-9197-43aa-b393-6a41652e21f8/.default'],
    }); // this function would manage expiry and storage on the composer side
    setLoggingIn(false);
    setToken(token);
    // use token to call APIs
  }, []);

  const pvaHeaders = useMemo(() => {
    if (token && tenantId) {
      return {
        Authorization: `Bearer ${token}`,
        'X-CCI-TenantId': tenantId,
        'X-CCI-Routing-TenantId': tenantId,
      };
    }
  }, [tenantId, token]);

  useEffect(() => {
    if (token) {
      // parse the jwt token to extract the tenant id
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      const tenantId = decodedPayload.tid;
      console.log('got tenant id from jwt: ', tenantId);
      setTenantId(tenantId);
    }
  }, [token]);

  useEffect(() => {
    if (tenantId) {
      // get environments for tenant id
      const url = `https://bots.sdf.customercareintelligence.net/api/botmanagement/v${API_VERSION}/environments`;
      const fetchEnvs = async () => {
        const headers = pvaHeaders;
        setFetchingEnvironments(true);
        const res = await fetchProxy(url, { method: 'GET', headers });
        const envs = await res.json();
        console.log('got envs: ', envs);
        setFetchingEnvironments(false);
        setEnvs(envs);
      };
      fetchEnvs();
    }
  }, [tenantId, token, pvaHeaders]);

  const onSelectEnv = useCallback((event) => {
    console.log('selected environment: ', event.target.value);
    setEnv(event.target.value);
  }, []);

  useEffect(() => {
    if (env) {
      // get bots for environment
      const url = `https://bots.sdf.customercareintelligence.net/api/botmanagement/v${API_VERSION}/environments/${encodeURIComponent(
        env
      )}/bots`;
      const fetchBots = async () => {
        const headers = pvaHeaders;
        setFetchingBots(true);
        const res = await fetchProxy(url, { method: 'GET', headers });
        const bots = await res.json();
        console.log('got bots: ', bots);
        setFetchingBots(false);
        setBots(bots);
      };
      fetchBots();
    }
  }, [env, pvaHeaders]);

  const showLoggedInUI = useMemo(() => {
    return !!token && !!tenantId;
  }, [tenantId, token]);

  return (
    <div style={root}>
      <h1 style={{ marginTop: 0 }}>PVA Plugin</h1>
      {!showLoggedInUI && (
        <button style={button} onClick={login}>
          Login
        </button>
      )}
      <p>Your token will appear here:</p>
      <textarea value={token}></textarea>
      {showLoggedInUI && !!envs.length && (
        <>
          <label style={label}>Environment:</label>
          <select style={dropdown} onChange={onSelectEnv}>
            {envs.map((env) => (
              <option key={env.id} value={env.id}>
                {env.displayName}
              </option>
            ))}
          </select>
          <label style={label}>Bot:</label>
          <select style={dropdown}>
            {bots.map((bot) => (
              <option key={bot.id} value={bot.id}>
                {bot.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};
