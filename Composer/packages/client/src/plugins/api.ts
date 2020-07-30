interface IAPI {
  page?: PageAPI;
  publish: PublishAPI;
  storage?: StorageAPI;
}

interface StorageAPI {}

interface PageAPI {}

interface PublishConfig {
  [key: string]: any;
}

interface PublishAPI {
  setConfigIsValid: (valid: boolean) => void;
  setPublishConfig: (config: PublishConfig) => void;
  useConfigBeingEdited: (() => PublishConfig[]) | (() => void);
}

function disabledSetPublishConfig() {
  console.error('setPublishConfig() cannot be used at this moment.');
}

function disabledSetConfigIsValid() {
  console.error('setConfigIsValid() cannot be used at this moment.');
}

function disabledUseConfigBeingEdited() {
  console.error('useConfigBeingEdited() cannot be used at this moment.');
}

class API implements IAPI {
  publish: PublishAPI;

  constructor() {
    this.publish = {
      setConfigIsValid: disabledSetConfigIsValid,
      setPublishConfig: disabledSetPublishConfig,
      useConfigBeingEdited: disabledUseConfigBeingEdited,
    };
  }

  public disableSetConfigIsValid() {
    this.publish.setConfigIsValid = disabledSetConfigIsValid;
  }

  public disableSetPublishConfig() {
    this.publish.setPublishConfig = disabledSetPublishConfig;
  }

  public disableUseConfigBeingEdited() {
    this.publish.useConfigBeingEdited = disabledUseConfigBeingEdited;
  }
}

export const PluginAPI = new API();
