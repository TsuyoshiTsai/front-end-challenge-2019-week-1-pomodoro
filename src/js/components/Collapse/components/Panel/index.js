import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Collapsible, { propTypes as CollapsiblePropTypes } from '../Collapsible'
import Content, { propTypes as ContentPropTypes } from './components/Content'
import Header, { propTypes as HeaderPropTypes } from './components/Header'

// Style
import styles from './style.module.scss'

// Variables / Fuctions
const cx = classnames.bind(styles)

export const propTypes = {
  identify: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onCollapse: PropTypes.func,
  isCollapsible: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  header: HeaderPropTypes.children,
  headerProps: PropTypes.shape(HeaderPropTypes),
  collapsibleProps: PropTypes.shape(CollapsiblePropTypes),
  contentProps: PropTypes.shape(ContentPropTypes),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  contentPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  isCollapsible: true,
  contentPadding: '0 40px 20px 40px',
}

function Panel (props) {
  const {
    onCollapse,
    isCollapsible,
    isCollapsed,
    header,
    headerProps = {},
    collapsibleProps = {},
    contentProps = {},
    width,
    height,
    padding,
    contentPadding,
    style,
    className,
    children,
    ...restProps
  } = props

  return (
    <div className={cx('collapse-panel', className)} style={{ ...style, width, height, padding }} {...restProps}>
      <Header isCollapsible={isCollapsible} isCollapsed={isCollapsed} onClick={isCollapsible ? onCollapse : null} {...headerProps}>
        {header}
      </Header>
      {isCollapsible && (
        <Collapsible isCollapsed={isCollapsed} {...collapsibleProps}>
          <Content {...contentProps} style={{ padding: contentPadding, ...contentProps.style }}>
            {children}
          </Content>
        </Collapsible>
      )}
    </div>
  )
}

Panel.propTypes = propTypes
Panel.defaultProps = defaultProps

export default Panel
