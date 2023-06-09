import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./utils/auth";
// pages
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Settings from "./components/pages/Settings";
import LanNavBar from "./components/LanNavBar";
import NavBar from "./components/NavBar";
import UserDashboard from "./components/pages/UserDashBoard";
import Footer from "./components/footer";
import Profile from "./components/pages/Profile";
import JobList from "./components/pages/jobList";
import CompanyProfile from "./components/pages/CompanyProfile";
import AllCompanies from "./components/pages/AllCompanies";
import AllUsers from "./components/pages/AllUsers";
import UsersProfile from "./components/pages/usersProfile";
import AllGroups from "./components/pages/AllGroups";
import GroupProfile from "./components/pages/groupProfile";
import CreateSchool from "./components/pages/CreateSchool";
import CreateCompany from "./components/pages/CreateCompany";
import CreateGroup from "./components/pages/CreateGroup";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  const type = localStorage.getItem("profType");
  const entity = localStorage.getItem("profEntity");
  console.log(type, entity);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      activeProfileType: type,
      activeProfileEntity: entity,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {Auth.loggedIn() ? <NavBar /> : <LanNavBar />}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myDashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profiles" element={<AllUsers />} />
            <Route path="/profiles/:userId" element={<UsersProfile />} />
            <Route path="/jobPost" element={<JobList />} />
            <Route path="/company" element={<AllCompanies />} />
            <Route
              path="/companyProfile/:companyId"
              element={<CompanyProfile />}
            />
            <Route path="/company" element={<CompanyProfile />} />
            <Route path="/activeCommunities" element={<AllGroups />} />
            <Route path="/groups/:groupId" element={<GroupProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/createCompany" element={<CreateCompany />} />
            <Route path="/createGroup" element={<CreateGroup />} />
            <Route path="/createSchool" element={<CreateSchool />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
