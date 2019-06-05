import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './ComRate.scss'

export default class ComRate extends Component {

  handleClick () {
    this.props.onChange(...arguments)
  }

  render () {
    const {
      className,
      value,
      max,
      size,
    } = this.props

    const starIconStyle = {
      fontSize: size ? `${size}px` : '',
    }

    // 生成星星颜色 className 数组，方便在jsx中直接map
    const classNameArr = []
    const floorValue = Math.floor(value)
    const ceilValue = Math.ceil(value)
    for (let i = 0; i < max; i++) {
      if (floorValue > i) {
        classNameArr.push('at-rate__icon at-rate__icon--on')
      } else if (ceilValue - 1 === i) {
        classNameArr.push('at-rate__icon at-rate__icon--half')
      } else {
        classNameArr.push('at-rate__icon at-rate__icon--off')
      }
    }

    return (
      <div
        className={classNames('at-rate', className)}
      >
        {
          classNameArr.map((cls, i) => <div
            className={cls}
            key={i}
            onClick={this.handleClick.bind(this, i + 1)}
          >
            <span className='at-icon at-icon-star-2' style={starIconStyle}></span>
            <div className='at-rate__left'>
              <span className='at-icon at-icon-star-2' style={starIconStyle}></span>
            </div>
          </div>)
        }
      </div>
    )
  }
}

ComRate.defaultProps = {
  isTest: false,
  customStyle: '',
  className: '',
  size: 0,
  value: 0,
  max: 5,
  margin: 5,
  onChange: () => {},
}

ComRate.propTypes = {
  customStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  className: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.number,
  max: PropTypes.number,
  margin: PropTypes.number,
  onChange: PropTypes.func,
}
