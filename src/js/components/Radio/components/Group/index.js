import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Lib MISC
import { RadioContext } from '../../context'

// Style
import styles from './style.module.scss'

// Variables / Functions
import { MODE } from '../../constants'
const cx = classnames.bind(styles)
const getCheckedValue = children => (React.Children.toArray(children).find(child => child.props && child.props.checked) || { props: {} }).props.value
const getCheckedIndex = children => React.Children.toArray(children).findIndex(child => child.props && child.props.checked)

export const propTypes = {
  mode: PropTypes.oneOf(Object.values(MODE)),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  mode: 'default',
  direction: 'horizontal',
}

function Group (props) {
  const { mode, direction, name, disabled, onChange: propOnChange, value: propValue, defaultValue, className, children, ...restProps } = props

  const groupRefs = useRef(null)

  const hasPropsOnChange = typeof propOnChange === 'function'
  const hasPropsValue = typeof propValue !== 'undefined'
  const [value, setValue] = useState(defaultValue || propValue || getCheckedValue(children))
  const [checkedIndex, setCheckedIndex] = useState(getCheckedIndex(children))

  useEffect(() => {
    if (hasPropsValue) {
      setValue(propValue)
    }
  }, [hasPropsValue, propValue])

  useEffect(() => {
    const newIndex = React.Children.toArray(children).findIndex(child => child.props.value === value)

    setCheckedIndex(newIndex)
  }, [children, value])

  // Private Methods
  const handleChange = (event, newValue) => {
    setValue(newValue)

    if (hasPropsOnChange) {
      propOnChange(event, newValue)
    }
  }

  // Events
  const onChange = event => {
    const newValue = event.target.value

    handleChange(event, newValue)
  }

  const context = { mode, name, disabled, onChange, value, checkedIndex }

  return (
    <RadioContext.Provider value={context}>
      <div className={cx('radio-group', className)} ref={groupRefs} data-mode={mode} data-direction={direction} {...restProps}>
        {children}
      </div>
    </RadioContext.Provider>
  )
}

Group.propTypes = propTypes
Group.defaultProps = defaultProps

export default Group
