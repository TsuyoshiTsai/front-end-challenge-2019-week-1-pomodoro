import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'
import classnames from 'classnames/bind'

// Components
import Group from './components/Group'
import Help, { VALIDATE_STATUS } from './components/Help'
import InputField from './components/InputField'
import Label from './components/Label'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  formik: PropTypes.object,
  forwardRef: PropTypes.any,
  className: PropTypes.string,
}

function Form (props) {
  const { formik, forwardRef, className, ...restProps } = props

  return <form ref={forwardRef} className={cx('form', className)} onReset={formik.handleReset} onSubmit={formik.handleSubmit} {...restProps} />
}

Form.propTypes = propTypes

const ConnectedForm = connect(Form)
const ConnectedFormWithRef = React.forwardRef((props, ref) => <ConnectedForm {...props} forwardRef={ref} />)

ConnectedFormWithRef.Group = Group
ConnectedFormWithRef.Help = Help
ConnectedFormWithRef.InputField = InputField
ConnectedFormWithRef.Label = Label

export { VALIDATE_STATUS }
export default ConnectedFormWithRef
