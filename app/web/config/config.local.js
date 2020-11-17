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
  define: {
    'process.env.axiosBaseURL': 'https://api-verify.unionledger.com.cn:8443',
  },
}
