import React, { Component } from 'react';
import classNames from 'classnames';
import './ComSearch.scss';

class ComSearch extends Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            isFocus: props.focus,
        };
    }

    handleFocus = (...arg) => {
        this.setState({
            isFocus: true,
        });
        this.props.onFocus(...arg);
    };

    handleBlur = (...arg) => {
        this.setState({
            isFocus: false,
        });
        this.props.onBlur(...arg);
    };

    handleChange = (e, ...arg) => this.props.onChange(e.target.value, ...arg);

    handleClear = (...arg) => {
        if (this.props.onClear) {
            this.props.onClear();
        } else {
            this.props.onChange('', ...arg);
        }
    };

    render() {
        const {
            value,
            maxLength,
            fixed,
            disabled,
            showActionButton,
            className,
            customStyle,
        } = this.props;
        const { isFocus } = this.state;
        const rootCls = classNames(
            'search-bar',
            {
                'search-bar--fixed': fixed,
            },
            className
        );
        const placeholderWrapStyle = {};
        const actionStyle = {};
        if (isFocus || (!isFocus && value)) {
            actionStyle.opacity = 1;
            actionStyle.marginRight = `0`;
            placeholderWrapStyle.flexGrow = 0;
        } else if (!isFocus && !value) {
            placeholderWrapStyle.flexGrow = 1;
            actionStyle.opacity = 0;
        }
        if (showActionButton) {
            actionStyle.opacity = 1;
            actionStyle.marginRight = `0`;
        }

        const clearIconStyle = { display: 'flex' };
        const placeholderStyle = { visibility: 'hidden' };
        if (!value.length) {
            clearIconStyle.display = 'none';
            placeholderStyle.visibility = 'visible';
        }

        return (
            <div className={rootCls} style={customStyle}>
                <div className="search-bar__input-cnt">
                    <div className="search-bar__placeholder-wrap" style={placeholderWrapStyle}>
                        <span className="at-icon at-icon-search" />
                        <span className="search-bar__placeholder">{isFocus ? '' : '搜索'}</span>
                    </div>
                    <input
                        className="search-bar__input"
                        type="text"
                        value={value}
                        disabled={disabled}
                        maxLength={maxLength}
                        onInput={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                    <div
                        className="search-bar__clear"
                        style={clearIconStyle}
                        onTouchStart={this.handleClear}
                    >
                        <span className="at-icon at-icon-close-circle" />
                    </div>
                </div>
            </div>
        );
    }
}

ComSearch.defaultProps = {
    value: '',
    maxLength: 140,
    fixed: false,
    focus: false,
    disabled: false,
    showActionButton: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onConfirm: () => {},
    onActionClick: () => {},
  }

export default ComSearch;
