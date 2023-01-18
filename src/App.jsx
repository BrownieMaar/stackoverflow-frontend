import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import QuestionPage from './Pages/QuestionPage/QuestionPage'
import { useEffect, useState } from 'react'
import UserPage from './Pages/UserPage/UserPage'
import Layout from './Pages/Layout'
import SignIn from './Pages/Auth/SignIn'

function App() {

  useEffect(() => {
    if (window.currentUser) window.currentUser = null;
  }, []);


  return (
    <div className="App">
      <Router>
        <Routes>

          <Route element={<Layout />}>

            <Route path='/' element={<HomePage />} />
            <Route path='question/:id' element={<QuestionPage />} />
            <Route path='user/:id' element={<UserPage />} />

          </Route>

          <Route path='/signin' element={<SignIn />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
