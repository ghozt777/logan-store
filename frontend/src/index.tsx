import { createRoot } from 'react-dom/client';
import { Root } from './root';
import { store } from './app/store'
import { Provider } from 'react-redux'
import './index.css'


const App: React.FC<{}> = () =>
(
  <Provider store={store} >
    <Root />
  </Provider>
)


const container = document.getElementById('app')
const root = createRoot(container!);
root.render(<App />)