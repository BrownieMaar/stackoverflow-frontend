import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import QuestionPage from './Pages/QuestionPage'
import { useEffect, useState } from 'react'

function App() {
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='question/:id' element={<QuestionPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
