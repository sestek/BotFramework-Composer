interface IAPI {
  page?: PageAPI;
  publish: PublishAPI;
  storage?: StorageAPI;
}

interface StorageAPI {}

interface PageAPI {}

interface PublishAPI {
  submitPublishConfig: (config: any) => Promise<void>;
}

async function disabledSumitPublishConfig() {
  console.error('submitPublishConfig() cannot be used at this moment.');
}

class API implements IAPI {
  publish: PublishAPI;

  constructor() {
    this.publish = {
      submitPublishConfig: disabledSumitPublishConfig,
    };
  }

  public disablePublishConfig() {
    this.publish.submitPublishConfig = disabledSumitPublishConfig;
  }
}

export const PluginAPI = new API();
