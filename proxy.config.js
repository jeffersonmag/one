const proxy = [{
  context: '/autenticacao',
  target: 'https://autenticador.rbc.com.br:10720/autenticador/v1/TServerMetodoToken/Token',
  pathRewrite: {
    '^/autenticacao': ''
  }
}
];
module.exports = proxy;
