import { isElectron } from './electronUtil';

interface OAuthConfig {
  clientId: string;
  redirectUri?: string;
  scopes: string[];
}

interface OAuthTokens {
  accessToken?: string;
  idToken?: string;
}

export class OAuthClient {
  private config: OAuthConfig;
  private tokens: OAuthTokens;
  private id: number;
  private static clientId = 0;

  constructor(config: OAuthConfig) {
    this.config = { redirectUri: 'bfcomposer://oauth', ...config };
    this.tokens = {};
    // assign an id to the client so we can route responses back to the right one from the main process
    this.id = OAuthClient.clientId++;
  }

  /** Logs in the current user and retrieves an id token from Azure */
  public async login(): Promise<void> {
    // we need to perform a login request
    if (isElectron()) {
      return new Promise((resolve, reject) => {
        const { ipcRenderer } = window;
        ipcRenderer.on('oauth-login-complete', (_ev, idToken: string, id: number) => {
          if (id === this.id) {
            // make sure the auth request originated from this client instance
            this.tokens.idToken = idToken;
            resolve();
          }
        });
        ipcRenderer.on('oauth-login-error', (_ev, error, id) => {
          if (id === this.id) {
            console.error('There was an error while attempting to log the current user in: ', error);
            reject(error);
          }
        });
        ipcRenderer.send('oauth-start-login', this.config, this.id);
        // TODO: after some amount of time we should reject
      });
    }
    // no-op
  }

  /**
   * Retrieves an Azure access token on behalf of the current signed-in user.
   */
  public async getTokenSilently(): Promise<string | void> {
    if (isElectron()) {
      if (!this.tokens.idToken) {
        // login
        await this.login();
      }

      const { ipcRenderer } = window;
      return new Promise((resolve, reject) => {
        ipcRenderer.on('oauth-get-access-token-complete', (_ev, accessToken: string, id: number) => {
          if (id === this.id) {
            // make sure the auth request originated from this client instance
            this.tokens.accessToken = accessToken;
            resolve(accessToken);
          }
        });
        ipcRenderer.on('oauth-get-access-token-error', (_ev, error, id) => {
          if (id === this.id) {
            console.error('There was an error while attempting to silently get an access token: ', error);
            reject(error);
          }
        });
        // get an access token using the id token
        ipcRenderer.send('oauth-get-access-token', this.config, this.tokens.idToken, this.id);
        // TODO: after some amount of time we should reject
      });
    }
    // no-op
  }
}
