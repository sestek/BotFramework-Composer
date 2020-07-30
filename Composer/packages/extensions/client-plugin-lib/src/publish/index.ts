import { ComposerGlobalName } from '../common/constants';

interface PublishConfig {
  [key: string]: any;
}

export function setPublishConfig(config: PublishConfig) {
  window[ComposerGlobalName].setPublishConfig(config);
}

export function setConfigIsValid(valid: boolean) {
  window[ComposerGlobalName].setConfigIsValid(valid);
}

export function useConfigBeingEdited(): PublishConfig[] | undefined[] {
  return window[ComposerGlobalName].useConfigBeingEdited();
}
