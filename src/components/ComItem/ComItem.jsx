import React, { Component } from "react";
import "./ComItem.scss"
import ComAvatar from "../ComAvatar/ComAvatar";
import PropTypes from 'prop-types';
import ComRate from "../ComRate/ComRate";

class ComItem extends Component {

    render() {
        const {appInfo, type} = this.props
        return (
            <section className={`item-cnt ${type !== 'H' && 'vertical-item'}`}>
                <div>
                    <ComAvatar size={type === 'H' ? 'normal' : 'large'} circle={this.props.circle} image={appInfo.img} />
                </div>
                <div className={`item-info ${type !== 'H' && 'vertical-info'}`}>
                    <div className={`item-name ${type !== 'H' ? 'two-line' : 'one-line'}`}>{appInfo.name}</div>
                    <div>{appInfo.category}</div>
                    {type === 'H' && <div className='item-rate'>
                        <ComRate value={appInfo.rate} size='12' />
                        ({appInfo.rate})
                    </div>}
                </div>
            </section>
        )
    }

}

ComItem.defaultProps = {
    circle: false,
    type: 'H',
}

ComItem.propTypes = {
    circle: PropTypes.bool,
    type: PropTypes.string,
}

export default ComItem