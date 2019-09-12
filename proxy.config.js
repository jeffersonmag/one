const proxy = [{
  context: '/autenticacao',
  target: 'https://autenticador.rbc.com.br:10720/autenticador/v1/TServerMetodoToken/Token',
  pathRewrite: {
    '^/autenticacao': ''
  }
},
{
  context: '/one',
  target: 'http://www.rbc.com.br',
  pathRewrite: {
    '^/one': ''
  }
}
];
module.exports = proxy;
