import { Menu } from 'antd';
import NavLink from 'umi/navlink';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import menuConfig from './menuConfig';

const { SubMenu } = Menu;

const getChildren = (menus, { history, location }) => {
  return menus.map((item) => {
    const { children, path, key, title } = item;
    let icon = item.icon || null;
    if (icon) {
      icon = React.createElement(icon);
    }
    if (Array.isArray(children)) {
      return React.createElement(SubMenu, {
        key: key || path || title,
        icon,
        children: getChildren(children, { history, location }),
        title,
        // onTitleClick({ key }) {
        //   history.push(key);
        // },
      });
    }

    return React.createElement(Menu.Item, {
      children: React.createElement(NavLink, {
        to: path,
        children: [title],
      }),
      key: key || path || title,
      title,
      icon,
      className: location.pathname.startsWith(path)
        ? 'ant-menu-item-selected'
        : '',
    });
  });
};

const AppMenus = () => {
  const history = useHistory();
  const location = useLocation();
  return React.createElement(Menu, {
    children: getChildren(menuConfig, { history, location }),
    mode: 'inline',
    theme: 'dark',
  });
};

export default AppMenus;
