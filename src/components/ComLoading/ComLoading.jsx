import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './ComLoading.scss'

export default class ComLoading extends Component {

  render () {
    const { color } = this.props
    
    const colorStyle = {
      'border': color ? `1px solid ${color}` : '',
      'borderColor': color ? `${color} transparent transparent transparent` : '',
    }
    const ringStyle = Object.assign({}, colorStyle)

    return (
      <div className='at-loading'>
        <div className='at-loading__ring' style={ringStyle}></div>
        <div className='at-loading__ring' style={ringStyle}></div>
        <div className='at-loading__ring' style={ringStyle}></div>
      </div>
    )
  }
}

ComLoading.defaultProps = {
  size: 0,
  color: '',
}

ComLoading.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}
