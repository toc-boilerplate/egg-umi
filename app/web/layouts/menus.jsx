import { Menu } from 'antd'
import React, { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation, NavLink } from 'react-router-dom'
import menuConfig from './menuConfig'
import { connect } from 'dva'

const { SubMenu } = Menu

const getChildren = (menus, { history, location, selectedKeys, openKeys }) => {
  return menus.map(item => {
    const {
      children,
      path,
      key,
      title,
      icon: defaultIcon = null,
      selectedIcon = null,
    } = item
    let icon = null
    if (
      selectedIcon &&
      ((!children && selectedKeys.includes(key)) || openKeys.includes(key))
    ) {
      icon = React.createElement(selectedIcon)
    } else if (defaultIcon) {
      icon = React.createElement(defaultIcon)
    }
    if (Array.isArray(children)) {
      return React.createElement(SubMenu, {
        key: key || path || title,
        icon,
        children: getChildren(children, { history, location }),
        title,
      })
    }

    return React.createElement(Menu.Item, {
      children: React.createElement(NavLink, {
        to: path,
        children: [title],
        className: 'link-active',
      }),
      key: key || path || title,
      title,
      icon,
    })
  })
}

const getKeys = (menuConfig, pathname, selectedKeys = [], openKeys = [], selectedItems = new Map()) => {
  if (!menuConfig || !menuConfig.length) return

  let key
  for (let item of menuConfig) {
    if (item.path === pathname) {
      selectedKeys.push(item.key)
      selectedItems.set(item.key, item)
      return item.key
    }
    key = getKeys(item.children, pathname, selectedKeys, openKeys, selectedItems)
    if (key) {
      openKeys.push(item.key)
    }
  }
  return key
}

const AppMenus = (props) => {
  const history = useHistory()
  const location = useLocation()

  const [selectedKeys, setSelectedKeys] = useState([])
  const [openKeys, setOpenKeys] = useState([])
  const rootSubmenuKeys = useRef(menuConfig.map(item => item.key))
  const selectedItemsRef = useRef(new Map())

  useEffect(() => {
    const sKeys = []
    const oKeys = []
    getKeys(menuConfig, location.pathname, sKeys, oKeys, selectedItemsRef.current)
    setSelectedKeys(sKeys)
    setOpenKeys(oKeys)
    props.dispatch({
      type: 'user/setData',
      field: 'currentPosition',
      payload: selectedItemsRef.current.get(sKeys[0])?.title
    })
  }, [location.pathname])

  const onOpenChange = keys => {
    // keys: [0]- close [1]- open
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.current.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return React.createElement(Menu, {
    children: getChildren(menuConfig, {
      history,
      location,
      selectedKeys,
      openKeys,
    }),
    mode: 'inline',
    theme: 'dark',
    openKeys,
    selectedKeys,
    onOpenChange,
    onSelect: ({ item }) => {
      props.dispatch({
        type: 'user/setData',
        field: 'currentPosition',
        payload: item.props.title
      })
    }
  })
}

export default connect(({ user }) => {
  return { currentPosition: user.currentPosition }
})(AppMenus)
