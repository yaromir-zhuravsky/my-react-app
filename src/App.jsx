import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Folder from "./pages/Folder/Folder";
import "./App.css";
import Set from "./pages/Set/Set";
import NotFound from "./pages/NotFound/index";
import Register from "./pages/Register";
import Login from "./pages/Login/index";
import About from "./pages/About/index";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ user }) => {
    return user ? <Outlet /> : <Navigate to="/" />;
};

// !: set authProvider and privateRoute
// !: Dynamically change components when user loggen-in or no
// TODO: Create m-header tap effect and focus on current page button

function App() {
    const user = true;
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={user ? <NotFound /> : <Login />}
                />
                <Route
                    exact
                    path="/"
                    element={user ? <Navigate to="/home" /> : <About />}
                />
                <Route
                    path="/register"
                    element={user ? <NotFound /> : <Register />}
                />

                <Route element={<ProtectedRoute user={user} />}>
                    <Route exact path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/folders/:id" element={<Folder />} />
                    <Route path="/folders" element={<Folder />} />
                    <Route path="/sets/:id" element={<Set />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
