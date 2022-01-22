import { render } from 'react-dom';
import mockApiServiceWorker from 'api/mock';
import CssReset from 'CssReset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { store } from 'store';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import queryClient from 'api/queryClient';
import AppRouter from 'AppRouter';

mockApiServiceWorker.start();

const rootElement = document.getElementById('root');

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <CssReset />
      <AppRouter />
      <ToastContainer autoClose={2000} />
    </Provider>
  </QueryClientProvider>,
  rootElement,
);
