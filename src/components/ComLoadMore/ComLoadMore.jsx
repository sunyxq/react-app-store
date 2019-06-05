import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './ComLoadMore.scss'

import ComLoading from '../ComLoading/ComLoading';

export default class ComLoadMore extends Component {
  onClick () {
    this.props.onClick(...arguments)
  }

  render () {
    const {
      className,
      loadingText,
      moreText,
      status,
      noMoreText
    } = this.props

    let component = null
    if (status === 'loading') {
      component = <div className='is-loading'>
          <ComLoading />
          <span>{loadingText} </span>
      </div>
       
    } else if (status === 'more') {
      component = (
        <div className='at-load-more__cnt'>
          <span
            onClick={this.onClick.bind(this)}
          >
            {moreText}
          </span>
        </div>
      )
    } else {
      component = <span
        className='at-load-more__tip'
      >
        {noMoreText}
      </span>
    }

    return (
      <div
        className={classNames('at-load-more', className)}
      >
        {component}
      </div>
    )
  }
}

ComLoadMore.defaultProps = {
  customStyle: '',
  className: '',
  noMoreTextStyle: '',
  moreBtnStyle: '',
  status: 'more',
  loadingText: '加载中',
  moreText: '查看更多',
  noMoreText: '没有更多',
  onClick: () => {},
}

ComLoadMore.propTypes = {
  customStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  className: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  noMoreTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  moreBtnStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  status: PropTypes.oneOf(['more', 'loading', 'noMore']),
  loadingText: PropTypes.string,
  moreText: PropTypes.string,
  noMoreText: PropTypes.string,
  onClick: PropTypes.func,
}
