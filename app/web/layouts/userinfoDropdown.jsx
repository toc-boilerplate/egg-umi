import { Menu, Dropdown } from 'antd'
import question from 'assets/question.svg'
import classNames from 'classnames/bind'
import { connect, useHistory, useLocation } from 'umi'
import styles from './index.module.less'
import { normalizeMobile, removeLocalInfo } from 'assets/js/utils'

const cx = classNames.bind(styles)

const UserInfoDropdown = props => {
  const { pathname } = useLocation()
  const history = useHistory()
  const { prefix = null, suffix = null, className, style } = props

  const logout = () => {
    removeLocalInfo('eastweb-loginfo')
    history.push('/account-login')
  }

  const switchAccount = () => {
    history.replace('/account-favselection')
  }

  let cls = 'userinfo-container'
  if (className) {
    cls += ` ${className}`
  }

  return (
    <div className={cx(cls)} style={style}>
      {prefix ? prefix : <img src={question} />}
      <Dropdown
        arrow
        overlay={
          <Menu>
            {pathname !== '/account-favselection' && (
              <Menu.Item onClick={switchAccount}>切换欢喜号</Menu.Item>
            )}
            <Menu.Item onClick={logout}>退出登录</Menu.Item>
          </Menu>
        }
      >
        <span style={{ padding: '0 8px' }}>
          {pathname.endsWith('favselection')
            ? normalizeMobile(props.mobile)
            : props.currentJoy?.joyName}
        </span>
      </Dropdown>
      {suffix}
    </div>
  )
}

export default connect(({ user }) => {
  return { ...user.loginfo }
})(UserInfoDropdown)
