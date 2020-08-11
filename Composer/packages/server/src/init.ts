// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolve } from 'path';

import { start } from './server';
import { setEnvDefault } from './utility/setEnvDefault';

// TODO: make sure that these are configured correctly in the Electron prod env
setEnvDefault('COMPOSER_EXTENSION_DATA', resolve(__dirname, '../extension-manifest.json'));
setEnvDefault('COMPOSER_BUILTIN_PLUGINS_DIR', resolve(__dirname, '../../../plugins'));
setEnvDefault('COMPOSER_REMOTE_PLUGINS_DIR', resolve(__dirname, '../../..'));

start().catch((err) => {
  console.error('Error occurred while starting server: ', err);
});
