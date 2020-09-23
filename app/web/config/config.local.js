export default {
  proxy: {
    '/api': {
      // target: 'http://127.0.0.1:7001/',
      target: 'http://testing.data.api.lmops.com:10080',
      // target: 'http://192.168.115.78:8099/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
      headers: {
        'x-forwarded-for': '127.0.0.1',
      },
    },
  },
  chainWebpack(config) {
    config.plugin('define').tap(args => {
      const env = args[0]
      const newEnv = {
        ...env['process.env'],
        axiosBaseURL: JSON.stringify('http://127.0.0.1:8001/api'),
      }

      return [{ ...env, 'process.env': newEnv }]
    })
  },
}
