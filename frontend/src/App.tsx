import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import Router from './Router';
import { initializeAuth } from './store/slices/authSlice';

// Create a separate component for the app content to use hooks
const AppContent = () => {
  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Router />
      <Toaster position='top-right' />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
