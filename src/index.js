import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 引入移动的适配器（根据屏幕宽度来设置html的sont-size基准值）
import  'utils/adapter';

ReactDOM.render( <App />, document.getElementById( 'root' ) );
