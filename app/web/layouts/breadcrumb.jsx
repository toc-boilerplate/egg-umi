import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import menuConfig from './menuConfig'
import iconPosition from 'assets/icon_position.svg'

const getBreadcrumbName = (config, keys, index = 0) => {
  if (!config) return []
  const target =
    config.find(item => new RegExp(`^${item.key}`, 'i').test(keys[index])) ?? {}
  let names = []
  if (target.title) {
    names.push(target.title)
  }
  const nextNames = getBreadcrumbName(target.children, keys, index + 1)
  names = [...names, nextNames]
  return names
}

const AppBreadcrumb = () => {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  const names = getBreadcrumbName(menuConfig, segments)

  const paths = []
  let current = '/'
  let i = 0
  for (; i < segments.length - 1; ++i) {
    current += segments[i]
    paths.push({
      path: current,
      name: names[i],
    })
  }
  current += segments[i]

  return (
    <>
      <span style={{ marginLeft: 'auto' }}>
        <img src={iconPosition} />
        当前位置：
      </span>
      <Breadcrumb>
        {paths.map(info => {
          return (
            <Breadcrumb.Item key={info.path}>
              <span to={info.path}>{info.name}</span>
            </Breadcrumb.Item>
          )
        })}
        <Breadcrumb.Item key={current}>
          {names[names.length - 1]}
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
}

export default AppBreadcrumb
