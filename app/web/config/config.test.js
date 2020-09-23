export default {
  hash: true,
  publicPath: '',
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
  },
  chainWebpack(config) {
    config.plugin('define').tap(args => {
      const env = args[0]
      const newEnv = {
        ...env['process.env'],
        axiosBaseURL: JSON.stringify('http://testing.data.api.lmops.com:10080'),
      }

      return [{ ...env, 'process.env': newEnv }]
    })
  },
}
