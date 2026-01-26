import { BrowserRouter } from 'react-router-dom';
import { AlertProvider } from './context/AlertContext';
import AppContent from './AppContent';



function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
