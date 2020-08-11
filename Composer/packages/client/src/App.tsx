// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { Fragment } from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import { Header } from './components/Header';
import { Announcement } from './components/AppComponents/Announcement';
import { MainContainer } from './components/AppComponents/MainContainer';
import { OAuthClient } from './utils/oauthClient';

initializeIcons(undefined, { disableWarnings: true });

const btn = document.createElement('button');
btn.style.position = 'absolute';
btn.style.top = '0';
btn.style.width = '50px';
btn.style.height = '50px';
btn.onclick = () => {
  const client = new OAuthClient({
    clientId: 'ce48853e-0605-4f77-8746-d70ac63cc6bc',
    scopes: ['96ff4394-9197-43aa-b393-6a41652e21f8/.default'],
    redirectUri: 'bfcomposer://oauth',
  });
  client.getTokenSilently();
};
document.body.appendChild(btn);

// useEffect(() => {
//   onboardingSetComplete(onboardingState.getComplete());
//   actions.fetchPlugins();
// }, []);

export const App: React.FC = () => {
  return (
    <Fragment>
      <Announcement />
      <Header />
      <MainContainer />
    </Fragment>
  );
};
