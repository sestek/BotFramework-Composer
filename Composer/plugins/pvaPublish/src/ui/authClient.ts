import { UserAgentApplication } from 'msal';

const loginRequest = {
  //scopes: ['AppCatalog.ReadWrite.All', 'Application.Read.All', 'Organization.Read.All', 'User.Read.All'],
  scopes: ['user.read'],
};

let instance: AuthClient;
export class AuthClient {
  private msalInstance: UserAgentApplication;
  constructor() {
    this.msalInstance = new UserAgentApplication({
      auth: {
        authority: 'https://login.microsoftonline.com/organizations/',
        //clientId: '96e79a33-6cb3-477c-ab91-6cfa0870e121',
        clientId: '6de30efc-46c2-46b1-8999-19b8bb31d242',
        redirectUri: 'http://localhost:3000/oauth',
      },
    });
  }
  public static getInstance(): AuthClient {
    if (!instance) {
      instance = new AuthClient();
    }
    return instance;
  }
  public async getToken() {
    if (this.msalInstance.getAccount()) {
      // we are logged in
      console.log('logged in');
      try {
        const tokenInfo = await this.msalInstance.acquireTokenSilent(loginRequest);
        await this.msalInstance.acquireTokenSilent(loginRequest);
        console.log('got token: ', tokenInfo);
        return tokenInfo.accessToken;
      } catch (e) {
        console.error('Failed to get token when already logged in: ', e);
        const loginInfo = await this.msalInstance.loginPopup(loginRequest);
        console.log('Successfully logged in: ', loginInfo);
        const tokenInfo = await this.msalInstance.acquireTokenSilent(loginRequest);
        console.log('got token: ', tokenInfo);
        return tokenInfo.accessToken;
      }
    } else {
      // we need to login
      console.log('need to login, showing login popup');
      try {
        const loginInfo = await this.msalInstance.loginPopup(loginRequest);
        console.log('Successfully logged in: ', loginInfo);
        const tokenInfo = await this.msalInstance.acquireTokenSilent(loginRequest);
        console.log('got token: ', tokenInfo);
        return tokenInfo.accessToken;
      } catch (e) {
        console.error('Got some error while logging in and getting token: ', e);
      }
    }
    return '';
  }
}
