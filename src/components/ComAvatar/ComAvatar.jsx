import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import './ComAvatar.scss'

export default class ComAvatar extends Component {

  render () {
    const {
      circle,
      image,
      size,
      customStyle,
    } = this.props
    const rootClassName = ['avatar']

    const classObject = {
      'avatar-circle': circle,
      'avatar-large': size === 'large'
    }

    return (
      <div
        className={classNames(rootClassName, classObject, this.props.className)}
        style={customStyle}
      >
        <LazyLoad>
          <img className='avatar-img' src={image} alt='图片'/>
        </LazyLoad>
      </div>
    )
  }
}

ComAvatar.defaultProps = {
  size: 'normal',
  circle: false,
  text: '',
  image: '',
  customStyle: {},
  className: '',
}

ComAvatar.propTypes = {
  size: PropTypes.oneOf(['large', 'normal', 'small']),
  circle: PropTypes.bool,
  text: PropTypes.string,
  image: PropTypes.string,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}