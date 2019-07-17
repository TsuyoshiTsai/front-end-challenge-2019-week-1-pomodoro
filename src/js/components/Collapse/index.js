import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Collapsible from './components/Collapsible'
import Panel, { propTypes as PanelPropTypes } from './components/Panel'

// Style
import styles from './style.module.scss'

// Variables / Fuctions
const cx = classnames.bind(styles)

export const propTypes = {
  activeIdentifies: PropTypes.arrayOf(PanelPropTypes.identify),
  defaultActiveIdentifies: PropTypes.arrayOf(PanelPropTypes.identify),
  isAccordion: PropTypes.bool,
  onCollapse: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {}

function Collapse (props) {
  const {
    activeIdentifies: propsIdentifies,
    defaultActiveIdentifies,
    isAccordion,
    onCollapse: propsOnCollapse,
    className,
    children,
    ...restProps
  } = props

  const hasPropsOnCollapse = typeof propsOnCollapse === 'function'
  const hasPropsIdentifies = Array.isArray(propsIdentifies)
  const [activeIdentifies, setIdentifies] = useState(defaultActiveIdentifies || propsIdentifies || [])

  useEffect(() => {
    if (hasPropsIdentifies) {
      setIdentifies(propsIdentifies)
    }
  }, [hasPropsIdentifies, propsIdentifies])

  // Private Methods
  const handleCollapse = (event, newIdentifies) => {
    setIdentifies(newIdentifies)

    if (hasPropsOnCollapse) {
      propsOnCollapse(event, newIdentifies)
    }
  }

  // Events
  const onCollapse = (event, identify) => {
    let newIdentifies = null

    if (activeIdentifies.includes(identify)) {
      newIdentifies = activeIdentifies.filter(activeIdentify => activeIdentify !== identify)
    } else {
      newIdentifies = isAccordion ? [identify] : [...activeIdentifies, identify]
    }

    handleCollapse(event, newIdentifies)
  }

  return (
    <div className={cx('collapse', className)} {...restProps}>
      {React.Children.map(children, (child, index) => {
        const identify = child.props.identify || String(index)

        return React.cloneElement(child, {
          identify,
          onCollapse: event => onCollapse(event, identify),
          isCollapsed: !activeIdentifies.includes(identify),
        })
      })}
    </div>
  )
}

Collapse.propTypes = propTypes
Collapse.defaultProps = defaultProps

Collapse.Collapsible = Collapsible
Collapse.Panel = Panel

export default Collapse
