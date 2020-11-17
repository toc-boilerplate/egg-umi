import iconHome from 'assets/icon_home.svg'
import iconHomeDark from 'assets/icon_home_dark.svg'
import iconContent from 'assets/icon_content.svg'
import iconContentDark from 'assets/icon_content_dark.svg'
import iconAnalysis from 'assets/icon_analysis.svg'
import iconAnalysisDark from 'assets/icon_analysis_dark.svg'
import iconAccount from 'assets/icon_account.svg'
import iconAccountDark from 'assets/icon_account_dark.svg'

const iconStyle = {
  width: '25px',
  verticalAlign: '-6px',
  marginRight: '20px',
}

export default [
  {
    title: '首页',
    key: 'home',
    path: '/',
    icon: () => <img style={iconStyle} src={iconHomeDark} />,
    selectedIcon: () => <img style={iconStyle} src={iconHome} />,
  },
  {
    title: '内容管理',
    key: 'content',
    icon: () => <img style={iconStyle} src={iconContentDark} />,
    selectedIcon: () => <img style={iconStyle} src={iconContent} />,
    children: [
      {
        title: '新闻管理',
        path: '/content/news',
        key: 'news',
      },
    ],
  },
  {
    title: '统计分析',
    key: 'statistics',
    icon: () => <img style={iconStyle} src={iconAnalysisDark} />,
    selectedIcon: () => <img style={iconStyle} src={iconAnalysis} />,
    children: [
      {
        title: '新闻分析',
        path: '/statistics/news',
        key: 'news',
      },
      {
        title: '粉丝分析',
        path: '/statistics/fans',
        key: 'fans',
      },
    ],
  },
  {
    title: '账号管理',
    key: 'accmanagement',
    icon: () => <img style={iconStyle} src={iconAccountDark} />,
    selectedIcon: () => <img style={iconStyle} src={iconAccount} />,
    children: [
      {
        title: '账号信息',
        path: '/accmanagement/info',
        key: 'info',
      },
    ],
  },
]
