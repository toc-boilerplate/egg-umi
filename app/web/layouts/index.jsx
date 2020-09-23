import React, { useState, useEffect } from 'react'
import { Layout, Menu, Button, ConfigProvider, Dropdown } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/es/locale/zh_CN'
import classNames from 'classnames/bind'
import 'antd/dist/antd.less'
import { connect } from 'dva'
import AppMenus from './menus'
import AppBreadcrumb from './breadcrumb'
import Login from './login'
import styles from './index.module.less'

const cx = classNames.bind(styles)

const { Header, Sider, Content } = Layout
const AppLayout = props => {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (props.token) {
      props.dispatch({
        type: 'user/getUserinfo',
      })
    }
  }, [props.token])

  if (!props.token) {
    return <Login />
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ height: '100%', minWidth: '1024px' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={cx('logo')}>
            <span>hello world</span>
          </div>
          <AppMenus />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0 }}>
            <div className={cx('header-container')}>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: () => setCollapsed(prev => !prev),
                }
              )}
              <div className={cx('right')}>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        onClick={() => {
                          props.dispatch({
                            type: 'user/logout',
                          })
                          props.history.replace('/')
                        }}
                      >
                        退出
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                  placement="topCenter"
                  arrow
                >
                  <Button type="text">{props.nickname || 'test'}</Button>
                </Dropdown>
                <Dropdown
                  trigger={['click']}
                  arrow
                  overlay={
                    <Menu>
                      <Menu.Item>
                        {/* <a href="mailto:support@unionledger.com.cn"> */}
                        support@test.com
                        {/* </a> */}
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <CustomerServiceOutlined />
                </Dropdown>
              </div>
            </div>
          </Header>
          <AppBreadcrumb />
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default connect(({ user }) => {
  let token = user?.loginfo?.access_token
  if (!token) {
    token = localStorage.getItem('token')
  }
  return { token, ...user.userinfo }
})(AppLayout)
