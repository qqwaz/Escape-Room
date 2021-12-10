import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from 'components/app/app';
import { createAPI } from './api';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer } from './store/reducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI();

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
);

render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
