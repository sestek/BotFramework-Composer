import { ComposerGlobalName } from './constants';

/** Renders a react component within a Composer plugin surface. */
export function render(component: React.ReactElement) {
  window[ComposerGlobalName].render(component);
}
