import './App.css';
import { registerServiceWorker, subscribe } from './api/api.js';
import { AuthUserProvider } from './hooks/Auth.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.js';
import MainRoutes from './routes/MainRoutes.js';
import { UserGrandParentsProvider } from './hooks/GrandParentsContext.js';
function App() {
    const registerAndSubscribe = async () => {
        try {
            const serviceWorkerReg = await registerServiceWorker();
            console.log('test1');
            console.log(serviceWorkerReg);
            await subscribe(serviceWorkerReg);
            console.log('test2');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='App'>
            <AuthUserProvider>
                <UserGrandParentsProvider>
                    <Routes>
                        <Route
                            path='/'
                            element={<Navigate replace to='/home'></Navigate>}
                        />
                        <Route path='/home' element={<Home />} />
                        <Route path='*' element={<MainRoutes />} />
                    </Routes>
                    <button onClick={registerAndSubscribe}>
                        subscribe for push notifications
                    </button>
                </UserGrandParentsProvider>
            </AuthUserProvider>
        </div>
    );
}

export default App;
