import React from 'react';
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Route, Routes, Navigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from './hook';
import { Users } from './components/Users/Users';
import { Autification } from './components/Autification/Autification';
import { Registration } from './components/Registration/Registration';
import { EditUser } from './components/EditUser/EditUser';


function App() {
  const { token } = useAppSelector(state => state.authReducer);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          {token 
            ? (
              <>
                <Route path="/users" element={<Users />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/api/users/:id" element={<EditUser />} />
                <Route path="*" element={<Navigate to="/users" />} />
              </>
            )
            : (
              <>
                <Route path="/auth" element={ <Autification /> } />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            )
          }
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
