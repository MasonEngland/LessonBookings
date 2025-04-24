import styles from './css/App.module.css';
import {BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/home';
import About from './pages/about';
import Lesson from './pages/lesson';
import LessonsPage from './pages/lessons';
import UserContext from '../context/userContext';
import { useEffect, useState} from 'react';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
      }
    };


    fetch('/api/get_account', options)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        }
        else {
          setUser(null);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });


  }, []);


  return (
    <UserContext.Provider value ={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calendar" element={<div>Calendar</div>} />
          <Route path="/book" element={<Lesson />} />
          <Route path="/lessons" element={<LessonsPage />} />
          {/* Add more routes here */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
