import ReactDOM from 'react-dom';
import { Root } from './root';
import { RootState, store } from './app/store'
import { Provider, useSelector } from 'react-redux'
import './index.css'



ReactDOM.render(
  <Provider store={store} >
    <Root />
  </Provider>
  ,
  document.getElementById('root')
);
