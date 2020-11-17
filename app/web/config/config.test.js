export default {
  hash: true,
  publicPath: '',
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
  },
  define: {
    'process.env.axiosBaseURL': 'https://api-verify.unionledger.com.cn:8443'
  },
}
