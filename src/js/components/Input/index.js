import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import ClearIndicator from './components/ClearIndicator'
import Control from './components/Control'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  prefix: PropTypes.any,
  prefixProps: PropTypes.object,
  suffix: PropTypes.any,
  suffixProps: PropTypes.object,
  controlProps: PropTypes.object,
  isClearable: PropTypes.bool.isRequired,
  clearIndicatorProps: PropTypes.object,
  isBlock: PropTypes.bool,
  isInvalid: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  forwardRef: PropTypes.any,
}

export const defaultProps = {
  isClearable: true,
  isBlock: true,
  isInvalid: false,
}

function Input (props) {
  const {
    prefix: propPrefix,
    prefixProps = {},
    suffix: propSuffix,
    suffixProps = {},
    controlProps = {},
    isClearable,
    clearIndicatorProps = {},
    isBlock,
    isInvalid,
    disabled,
    defaultValue,
    value: propValue,
    onChange: propOnChange,
    className,
    forwardRef,
    ...restProps
  } = props

  let ref = useRef(forwardRef || null)

  const hasDefaultValue = typeof defaultValue === 'string'
  const hasPropValue = typeof propValue === 'string'
  const [value, setValue] = useState(hasDefaultValue ? undefined : propValue || '')
  const hasValue = typeof value === 'string' && value.length > 0

  useEffect(() => {
    if (hasPropValue) {
      setValue(propValue)
    }
  }, [hasPropValue, propValue])

  // private method
  const handleChange = event => {
    if (!hasDefaultValue) {
      setValue(event.target.value)
    }

    if (typeof propOnChange === 'function') {
      propOnChange(event)
    }
  }

  // Events
  const onClear = event => {
    const simulateEvent = new Event('change', { bubbles: true })

    ref.current.dispatchEvent(simulateEvent)
    simulateEvent.target.value = ''

    handleChange(simulateEvent)
    ref.current.focus()
  }

  const prefix = propPrefix || null
  const suffix = propSuffix || (isClearable && !disabled && hasValue && <ClearIndicator onClick={onClear} {...clearIndicatorProps} />) || null

  return (
    <Control isBlock={isBlock} {...controlProps}>
      {prefix && (
        <span {...prefixProps} className={cx('input__affix', 'input__affix--prefix', prefixProps.className)}>
          {prefix}
        </span>
      )}
      <input
        ref={ref}
        type='text'
        className={cx('input', className)}
        data-is-invalid={isInvalid}
        spellCheck={false}
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        {...restProps}
      />
      {suffix && (
        <span {...suffixProps} className={cx('input__affix', 'input__affix--suffix', suffixProps.className)}>
          {suffix}
        </span>
      )}
    </Control>
  )
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default React.forwardRef((props, ref) => <Input forwardRef={ref} {...props} />)
