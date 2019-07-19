import React from 'react'
import PropTypes from 'prop-types'
import { Field, getIn } from 'formik'

// Componentns
import Input from '../../../Input'
import Group from '../Group'
import Label from '../Label'
import Help, { VALIDATE_STATUS } from '../Help'

export const propTypes = {
  name: PropTypes.string,
  label: PropTypes.node,
  fieldProps: PropTypes.object,
  groupProps: PropTypes.object,
  labelProps: PropTypes.object,
}

function InputField (props) {
  const { name, label, fieldProps = {}, groupProps = {}, labelProps = {}, ...restProps } = props

  return (
    <Field name={name} {...fieldProps}>
      {({ field, form }) => {
        const isTouched = getIn(form.touched, field.name)
        const error = getIn(form.errors, field.name)
        const hasError = typeof error === 'string' && error.length > 0

        const isInvalid = isTouched && hasError

        return (
          <Group {...groupProps}>
            <Label htmlFor={field.name} {...labelProps}>
              {label}
            </Label>
            <Input {...field} {...restProps} id={field.name} isInvalid={isInvalid} />
            <Help isShowed={isInvalid} validateStatus={VALIDATE_STATUS.ERROR}>
              {error}
            </Help>
          </Group>
        )
      }}
    </Field>
  )
}

InputField.propTypes = propTypes

export default InputField
