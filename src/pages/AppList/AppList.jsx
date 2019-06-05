import React, { Component } from 'react';
import './AppList.scss';
import ComSearch from 'components/ComSearch/ComSearch';
import ComItem from 'components/ComItem/ComItem';
import ComLoading from 'components/ComLoading/ComLoading';
import { observer, inject } from 'mobx-react';
import ComLoadMore from '../../components/ComLoadMore/ComLoadMore';
import { throttle } from "lodash";

@inject('appListStore')
@observer
class AppList extends Component {
    state = {
        value: '',
    };

    componentDidMount() {
        this.props.appListStore.getAll();
    }

    onChange(val) {
        console.log(val, "chg");
        
        this.setState(() => ({
            value: val
        }), throttle(() => {
            this.props.appListStore.searchApp(val)
        }, 500))
        
    }

    doMore() {
        this.props.appListStore.getPerPageList();
    }

    render() {
        const { recommendList, freeList, noMore, loading } = this.props.appListStore;
        let status = noMore ? 'noMore' : loading ? 'loading' : 'more'
        return (
            <div>
                {loading ? (
                    <div className='loading-cnt'>
                        <ComLoading />
                        <span className='lbl'>加载中...</span>
                    </div>
                ) : (<section className="list-cnt">
                    <div className="seasrch-cnt">
                        <ComSearch
                            actionName="搜一下"
                            value={this.state.value}
                            onChange={this.onChange.bind(this)}
                        />
                    </div>
                    <div className="recommend-cnt">
                        <div className="recommend-label">推荐</div>
                        <div className="recommend-list">
                            {recommendList.map((e, i) => (
                                <ComItem key={i} type="V" appInfo={e} />
                            ))}
                        </div>
                    </div>

                    <div className="free-list">
                        {freeList.map((e, i) => (
                            <div className="free-item" key={e.id}>
                                <div className="free-item-no">{i + 1}</div>
                                <div className="free-item-info">
                                    <ComItem circle={!!(i % 2)} appInfo={e} />
                                </div>
                            </div>
                        ))}
                        <ComLoadMore onClick={this.doMore.bind(this)} moreText="点击加载更多" status={status}/>
                    </div>
                </section>)
            }
            </div>
        );
    }
}

export default AppList;
