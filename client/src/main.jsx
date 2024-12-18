import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { AuthProvider } from './contexts/AuthProvider';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
window.global = window;
if(import.meta.env.MODE === 'production') {
    disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);