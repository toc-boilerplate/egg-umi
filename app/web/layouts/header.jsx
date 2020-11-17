import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import UserInfoDropdown from './userinfoDropdown'

const { Header } = Layout

const AppHeader = props => {
  return (
    <Header style={{ padding: 0 }}>
      <div className="layout-header-container">
              <Link to="/" className="logo-link" />
        {props.children ? (
          props.children
        ) : (
          <div className="layout-content-block">
            <div className="left">
              基于区块链的互联网内容版权平台
            </div>
            <div className="right">
              <UserInfoDropdown />
            </div>
          </div>
        )}
      </div>
    </Header>
  )
}

export default AppHeader
