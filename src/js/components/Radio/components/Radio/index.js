import React, { useContext } from 'react'
import PropTypes from 'prop-types'

// Components
import Content from '../Content'
import Icon from '../Icon'
import Input from '../Input'
import Label from '../Label'

// Lib MISC
import { RadioContext } from '../../context'

// Variables / Functions
import { MODE } from '../../constants'

export const propTypes = {
  labelProps: PropTypes.object,
  contentProps: PropTypes.object,
  iconProps: PropTypes.object,
  inkBarProps: PropTypes.object,
  onChange: PropTypes.func,
  children: PropTypes.any,
  forwardRef: PropTypes.any,
}

function Radio (props) {
  const { labelProps = {}, contentProps = {}, iconProps = {}, children, forwardRef, ...restProps } = props

  // Constants
  const context = useContext(RadioContext)
  const hasContext = typeof context !== 'undefined'

  // Events
  const onChange = event => {
    if (typeof props.onChange === 'function') {
      props.onChange(event)
    }

    if (typeof context.onChange === 'function') {
      context.onChange(event)
    }
  }

  // Others
  const inputProps = { ...restProps }
  if (hasContext) {
    inputProps.name = context.name
    inputProps.onChange = onChange
    inputProps.disabled = inputProps.disabled || context.disabled
    inputProps.checked = inputProps.value === context.value
  }
  const identifier = <Icon checked={inputProps.checked} disabled={inputProps.disabled} {...iconProps} />

  return (
    <Label checked={inputProps.checked} disabled={inputProps.disabled} ref={forwardRef} {...labelProps}>
      <Input {...inputProps} />
      {hasContext ? context.mode === MODE.DEFAULT && identifier : identifier}
      {children && <Content {...contentProps}>{children}</Content>}
    </Label>
  )
}

Radio.propTypes = propTypes

export default React.forwardRef((props, ref) => <Radio {...props} forwardRef={ref} />)
