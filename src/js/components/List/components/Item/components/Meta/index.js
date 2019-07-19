import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Description from './components/Description'
import Title from './components/Title'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  title: PropTypes.node,
  titleProps: PropTypes.object,
  description: PropTypes.node,
  descriptionProps: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
}

function Meta (props) {
  const { title, titleProps = {}, description, descriptionProps = {}, className, children, ...restProps } = props

  return (
    <div className={cx('list-item-meta', className)} {...restProps}>
      {title && <Title {...titleProps}>{title}</Title>}
      {description && <Description {...descriptionProps}>{description}</Description>}
    </div>
  )
}

Meta.propTypes = propTypes

export default Meta
