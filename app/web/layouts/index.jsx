import React, { useState, useEffect } from 'react'
import { Layout, ConfigProvider } from 'antd'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/es/locale/zh_CN'
import { connect } from 'dva'
import { useLocation, NavLink } from 'react-router-dom'
import AppMenus from './menus'
import AppBreadcrumb from './breadcrumb'
import AppHeader from './header'
import AppUserinfoDropdown from './userinfoDropdown'
import 'antd/dist/antd.less'
import './layouts.less'
import classNames from 'classnames/bind'
import logoWhite from 'assets/logo-white.svg'
import blurBg from 'assets/gaussian-blur-bg.png'
import bg from 'assets/bg.png'
import { getLocalInfo } from 'assets/js/utils'

const cx = classNames.bind()

const { Sider, Content } = Layout

const AppLayout = props => {
  const location = useLocation()
  const [collapsed] = useState(false)
  const backRef = JSON.parse(sessionStorage.getItem('eastweb-route') || '[]')

  useEffect(() => {
    const unlisten = props.history.listen(({ pathname }) => {
      if (!backRef[1] || !backRef[1].startsWith('/media')) {
        backRef[0] = backRef[1]
        backRef[1] = pathname
        sessionStorage.setItem('eastweb-route', JSON.stringify(backRef))
      }
    })
    return () => {
      unlisten()
    }
  }, [])

  const token =
    props.loginfo?.access_token || props.loginfo?.jwtToken?.access_token
  useEffect(() => {
    if (token) {
      props.dispatch({
        type: 'user/fetchTags',
      })
    }
  }, [token])

  useEffect(() => {
    props.dispatch({
      type: 'user/setData',
      field: 'loginfo',
      payload: getLocalInfo(),
    })
  }, [])

  if (location.pathname.startsWith('/account')) {
    return (
      <div
        className="layout-account"
        style={{
          backgroundImage: `url(${
            location.pathname.endsWith('favselection') ? blurBg : bg
          })`,
        }}
      >
        <div className="header-block" style={{ alignItems: 'flex-start' }}>
          <img src={logoWhite} />
          {location.pathname.indexOf('login') === -1 ? (
            <AppUserinfoDropdown />
          ) : null}
        </div>
        {props.children}
      </div>
    )
  }

  if (location.pathname.startsWith('/authing')) {
    return (
      <div className="layout-authing">
        <AppHeader />
        <div className="layout-content">{props.children}</div>
      </div>
    )
  }

  if (location.pathname.startsWith('/media')) {
    const {
      query: { id },
    } = location
    return (
      <div className="app-framework">
        <div className="app-header">
          <AppHeader>
            <div className="layout-header-action">
              <span
                className="back"
                onClick={() => props.history.push('/content/news')}
              />
              {id ? (
                <span
                  className={cx(
                    'action-link',
                    location.pathname === '/media-article'
                      ? 'action-link-active'
                      : ''
                  )}
                >
                  文章
                </span>
              ) : (
                <NavLink
                  activeClassName="action-link-active"
                  className="action-link"
                  to="/media-article"
                >
                  文章
                </NavLink>
              )}
              {id ? (
                <span
                  className={cx(
                    'action-link',
                    location.pathname === '/media-video'
                      ? 'action-link-active'
                      : ''
                  )}
                >
                  视频
                </span>
              ) : (
                <NavLink
                  activeClassName="action-link-active"
                  className="action-link"
                  to="/media-video"
                >
                  视频
                </NavLink>
              )}
            </div>
          </AppHeader>
        </div>
        {props.children}
      </div>
    )
  }

  const isHome = props.history.location.pathname === '/'
  console.log('============', props.children)
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ height: '100%', minWidth: '1024px' }}>
        <AppHeader />
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <AppMenus />
          </Sider>
          <Layout>
            {props.currentPosition && !isHome ? (
              <div className="breadcrumb-wrapper">
                <span className="current-position">
                  {props.currentPosition}
                </span>
                <AppBreadcrumb />
              </div>
            ) : null}
            <Content
              className="main-with-side"
              style={{ paddingTop: isHome ? 50 : 0 }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default connect(({ user }) => {
  return {
    loginfo: user.loginfo,
    currentPosition: user.currentPosition,
  }
})(AppLayout)
