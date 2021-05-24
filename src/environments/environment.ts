/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  urlAutentication: 'https://serv-prod-01.ribercred.com.br:10725/autenticador/v1/TServerMetodoToken/Token',
  // urlApi: 'https://autenticador.rbc.com.br:10740/api'
  // urlApi: 'https://127.0.0.1:10740/api', // ambiente de teste
  urlApi: 'https://serv-api-01.ribercred.com.br:10740/api',
  urlToken: 'https://serv-api-01.ribercred.com.br:10740/api', // ambiente de teste
};
