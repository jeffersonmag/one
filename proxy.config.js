/*const proxy = [{
  context: '/autenticacao',
  target: 'https://autenticador.rbc.com.br:10720/autenticador/v1/TServerMetodoToken/Token',
  pathRewrite: {
    '^/autenticacao': ''
  }
}
];*/

const proxy = [
  {
    context: '/api',
    target: 'https://api.cobco.com.br:10740',
    pathRewrite: {'^/api' : ''}
  }
];

module.exports = proxy;