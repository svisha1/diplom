import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import AdminPanel from './components/adminPanel';
import CapsuleForm from './components/capsuleForm';
import CapsulePage from './components/capsulePage';
import CapsulePage1 from './components/capsulePage1';
import CapsulePage2 from './components/capsulePage2';
import CapsulePage3 from './components/capsulePage3';
import CapsulePage4 from './components/capsulePage4';
import CapsulePage5 from './components/capsulePage5';
import CapsulePage6 from './components/capsulePage6';
import FollowersPage from './components/followersPage';
import Login from './components/login';
import MainPage from './components/mainPage';
import ProfileEditForm from "./components/profileForm";
import ProfilePage from "./components/profilePage";
import ProfilePage2 from './components/profilePage2';
import Registration from './components/registration';
import SearchResultsPage from './components/searchResultsPage';
import './css/main.css';

const App = () => {

    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/reg" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:userId" element={<ProfilePage />}/>
                <Route path="/adminPanel" element={<AdminPanel />}/>
                <Route path="/profile/:userId/edit" element={<ProfileEditForm />}/>
                <Route path="/profile/:userId/createCapsule" element={<CapsuleForm />}/>
                <Route path="/capsule/21" element={<CapsulePage />}/>
                <Route path="/capsule/1" element={<CapsulePage1 />}/>
                <Route path="/capsule/2" element={<CapsulePage2 />}/>
                <Route path="/capsule/3" element={<CapsulePage3 />}/>
                <Route path="/capsule/4" element={<CapsulePage4 />}/>
                <Route path="/capsule/5" element={<CapsulePage5 />}/>
                <Route path="/capsule/6" element={<CapsulePage6 />}/>
                <Route path="/user/0" element={<ProfilePage2 />}/>
                <Route path="/followers" element={<FollowersPage />}/>
                <Route path="/searchPage" element={<SearchResultsPage />}/>
            </Routes>
        </Router>
        </AuthProvider>
    );
};

export default App;
