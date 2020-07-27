import { ComposerGlobalName } from '../common/constants';

interface PublishConfig {
  [key: string]: any;
}

export function submitPublishConfig(config: PublishConfig) {
  window[ComposerGlobalName].submitPublishConfig(config);
}
