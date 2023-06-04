import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Library from './components/Library';
import Book from './components/Book';
import UploadBook from './components/UploadBook';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import BookDetails from './components/Book'; // Import the Book component instead of BookDetails
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:bookId" element={<Book />} />
          <Route path="/books/upload" element={<UploadBook />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
