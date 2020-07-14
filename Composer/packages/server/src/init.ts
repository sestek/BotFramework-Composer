// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolve } from 'path';

import { start } from './server';

// TODO: clean this up --> ensureEnvVar(__VAR_NAME__, __DEFAULT__); ?
if (process.env.COMPOSER_EXTENSION_DATA === undefined) {
  process.env.COMPOSER_EXTENSION_DATA = resolve(__dirname, '../extension-manifest.json');
}
if (process.env.COMPOSER_BUILTIN_PLUGINS_FOLDER === undefined) {
  process.env.COMPOSER_BUILTIN_PLUGINS_FOLDER = resolve(__dirname, '../../../plugins');
}

start().catch((err) => {
  console.error('Error occurred while starting server: ', err);
});
