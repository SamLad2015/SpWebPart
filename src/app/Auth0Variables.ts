export interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'xC5sAMd5cLKZDYnMo7xPaW2PrV5vQZwp',
  domain: 'technoverse.eu.auth0.com',
  callbackURL: 'https://localhost:4321/temp/workbench.html'
};
