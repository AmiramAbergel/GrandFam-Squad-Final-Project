import logo from './logo.svg';
import './App.css';
import { registerServiceWorker, subscribe } from './api/api.js';

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
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
            <button onClick={registerAndSubscribe}>
                subscribe for push notifications
            </button>
        </div>
    );
}

export default App;
