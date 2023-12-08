// App.jsx
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./assets/components/Menu";
import HomePage from "./assets/components/homepage";
import SignIn from "../auth/SignIn";
import SignOut from "../auth/SignOut";
import SignUp from "../auth/SignUp";
import Featured from "./assets/components/featured";
import Services from "./services";
import Welcome from "./Welcome";
import WriteReview from "./writereview";



import ProtectedRoutes from "../auth/protectedRoutes";
import { createContext, useReducer } from "react";

import { initialState, reducer } from "./reducer/useReducer";

export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Menu />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/featured" element={<Featured />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/featured" element={<Featured />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/write-review/:businessId" element={<WriteReview />} /> 
          </Route>
          <Route path="/Welcome" element={<Welcome />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
