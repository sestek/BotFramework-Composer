// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import ReactDOM from 'react-dom';
import formatMessage from 'format-message';
import { CacheProvider } from '@emotion/core';
import createCache from '@emotion/cache';
import './index.css';

import { App } from './App';
import { StoreProvider } from './store';

formatMessage.setup({
  missingTranslation: 'ignore',
});

const emotionCache = createCache({
  // @ts-ignore
  nonce: window.__nonce__,
});

(window as any).botsToBeLoaded = {
  name: 'MeetingVirtualAssistant',
  workspace: '/Users/srravich/Desktop/samples/MeetingVirtualAssistant/',
  skills: [
    {
      manifest: {
        name: 'americas',
        description: 'Production manifest for remote skill in americas',
        workspace: 'https://SkillBot-dev.scm.azurewebsites.net/wwwroot/manifests/us/SkillBot-manifest.json',
      },
    },
    {
      manifest: {
        name: 'default',
        description: 'Local manifest file',
        workspace:
          '/Users/srravich/Desktop/samples/RoomSchedulerSkill/manifest/RoomSchedulerSkill-2-1-preview-1-manifest.json',
      },
    },
    {
      manifest: {
        name: 'default',
        description: 'Local manifest file',
        workspace: '/Users/srravich/Desktop/samples/CalendarSkill/manifest/CalendarSkill-2-1-preview-1-manifest.json',
      },
    },
  ],
};

ReactDOM.render(
  <CacheProvider value={emotionCache}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </CacheProvider>,
  document.getElementById('root')
);
