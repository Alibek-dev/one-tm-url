module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  /*publicPath: process.env.NODE_ENV === 'production'
      ? '/'
      : '/privmess',*/

  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title = "Hide message";
          return args;
        })
  }
}
