import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Pages/Chat/Chat';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
