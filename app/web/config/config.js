import path from 'path'
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'

const webRoot = path.resolve(__dirname, '..')

export default {
  title: 'hello world',
  dva: {
    immer: true,
  },
  outputPath: '../public/',
  publicPath: '/public/',
  manifest: {
    fileName: '../../config/manifest.json',
  },
  hash: true,
  alias: {
    '@': webRoot,
    assets: path.join(webRoot, 'assets'),
    components: path.join(webRoot, 'components'),
    pages: path.join(webRoot, 'pages'),
    js: path.join(webRoot, 'assets/js'),
    hooks: path.join(webRoot, 'hooks'),
  },
  chainWebpack(config) {
    config.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin)
  },
}
