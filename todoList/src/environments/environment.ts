// src/environments/environment.ts


export const environment = {
  production: false,
  auth: {
    domain: 'dev-hrvjkf4e5d0e5cy8.us.auth0.com',
    clientId: 'dAlseuOkify6vrrre5Zq9uMrllFW6GGX',
    redirectUri: window.location.origin,
    audience: '',
  },
  dev: {
    serverUrl: 'http://localhost:4200',
  },
};
