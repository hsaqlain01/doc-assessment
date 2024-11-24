import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import Router from './Router';
import { Toaster } from 'react-hot-toast';
// import { Toaster } from './components/ui/Toaster';
// import Router from 'src/router/Router';
// import { ErrorBoundary } from './components/error/ErrorBoundary';

function App() {
  return (
    // <Provider store={store}>
    //   <ErrorBoundary>
    //     <BrowserRouter>
    //       <Router />
    //       {/* <Toaster /> */}
    //     </BrowserRouter>
    //   </ErrorBoundary>
    // </Provider>
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Router />
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;