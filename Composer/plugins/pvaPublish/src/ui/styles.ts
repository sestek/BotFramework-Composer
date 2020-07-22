// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CSSProperties } from 'react';

export const root: CSSProperties = {
  position: 'relative',
  backgroundColor: 'white',
  padding: 32,
};

export const row: CSSProperties = {
  display: 'flex',
  flexFlow: 'row nowrap',
};

export const col: CSSProperties = {
  display: 'flex',
  flexFlow: 'column nowrap',
};
