export default {
  hash: true,
  publicPath: '',
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
  },
  chainWebpack(config) {
    config.plugin('define').tap((args) => {
      const env = args[0];
      const newEnv = {
        ...env['process.env'],
        axiosBaseURL: JSON.stringify(
          'https://api-verify.unionledger.com.cn:8443'
        ),
      };

      return [{ ...env, 'process.env': newEnv }];
    });
  },
};
