import React, { useState, useMemo } from "react";
import CreatePost from "./components/CreatePost";
import HomeContainer from "./components/HomeContainer";
import Nav from "./components/Nav";
import { UserContext } from "./context/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewPost from "./components/ViewPost";
import Contact from "./components/Contact";
import LogInModal from "./components/LogInModal";
import { LogInModalContext } from "./context/LogInModalContext";
import { SignUpModalContext } from "./context/SignUpModalContext";
import SignUpModal from "./components/SignUpModal";
import CommunityPage from "./components/CommunityPage";
import PersonalPage from "./components/PersonalPage";
import Settings from "./components/Settings";
import { TempLoginPw } from "./context/TempLoginPwContext";
import { TempLoginUN } from "./context/TempLoginUNContext";
import SearchPage from "./components/SearchPage";
function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [tempPw, setTempPw] = useState("");
  const [tempUN, setTempUN] = useState("");
  const userValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <div>
      <UserContext.Provider value={userValue}>
        <TempLoginPw.Provider value={{ tempPw, setTempPw }}>
          <TempLoginUN.Provider value={{ tempUN, setTempUN }}>
            <LogInModalContext.Provider value={{ showLogin, setShowLogin }}>
              <SignUpModalContext.Provider
                value={{ showSignUp, setShowSignUp }}
              >
                <Router basename={`/${process.env.PUBLIC_URL}`}>
                  <Nav />
                  {showLogin && <LogInModal />}
                  {showSignUp && <SignUpModal />}
                  <div>
                    <Routes>
                      {/* <Route path="/" element={<HomeContainerTESTING />}></Route> */}
                      <Route path="/" element={<HomeContainer />}></Route>
                      <Route
                        path="/create-post"
                        element={<CreatePost />}
                      ></Route>
                      <Route
                        path="/retrieve-post/:id"
                        element={<ViewPost />}
                      ></Route>
                      <Route
                        path="/retrieve-post/undefined"
                        element={<HomeContainer />}
                      ></Route>
                      <Route path="/contact" element={<Contact />}></Route>
                      <Route
                        path="/community/:id"
                        element={<CommunityPage />}
                      ></Route>
                      <Route path="/u/:id" element={<PersonalPage />}></Route>
                      <Route path="/u/settings" element={<Settings />}></Route>
                      <Route
                        path="/search/:query"
                        element={<SearchPage />}
                      ></Route>
                    </Routes>
                  </div>
                </Router>
              </SignUpModalContext.Provider>
            </LogInModalContext.Provider>
          </TempLoginUN.Provider>
        </TempLoginPw.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
