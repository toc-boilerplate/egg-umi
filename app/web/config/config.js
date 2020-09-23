import path from 'path';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
// import routes from './routes'

const webRoot = path.resolve(__dirname, '..');

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dynamicImport: {
          webpackChunkName: true,
        },
        dva: {
          immer: true,
        },
        title: {
          defaultTitle: 'hello world',
        },
      },
    ],
  ],
  runtimePublicPath: true,
  disableCSSModules: true,
  cssModulesWithAffix: true,
  alias: {
    '@': webRoot,
    assets: path.join(webRoot, 'assets'),
    pages: path.join(webRoot, 'pages'),
    js: path.join(webRoot, 'assets/js'),
  },
  chainWebpack(config) {
    config.plugin('AntdDayjsWebpackPlugin').use(AntdDayjsWebpackPlugin);
    // config.plugin('Dotenv').use(Dotenv, {
    //   path: path.resolve(__dirname, '../../../.env'),
    // })
  },
};
