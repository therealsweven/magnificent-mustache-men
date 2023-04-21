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
import LanNavBar from "./components/LanNavBar";
import NavBar from "./components/NavBar";
import UserFeed from "./components/pages/UserFeed";
import Footer from "./components/footer";
import Profile from "./components/pages/Profile";
import JobList from "./components/pages/jobList";
import CompanyProfile from "./components/pages/CompanyProfile";
import AllCompanies from "./components/pages/AllCompanies";
import AllUsers from "./components/pages/AllUsers";
import UsersProfile from "./components/pages/usersProfile";
// forms
import CompanyForm from "./components/pages/forms/CompanyForm";
import EducationForm from "./components/pages/forms/EducationForm";
import ExperienceForm from "./components/pages/forms/ExperienceForm";
import GroupForm from "./components/pages/forms/GroupForm";
import JobForm from "./components/pages/forms/JobForm";
import SchoolForm from "./components/pages/forms/SchoolForm";
import PostForm from "./components/pages/forms/PostForm";
import SkillForm from "./components/pages/forms/SkillForm";

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
            <Route path="/feed" element={<UserFeed />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profiles" element={<AllUsers />} />
            <Route path="/profiles/:profileId" element={<UsersProfile />} />
            <Route path="/jobPost" element={<JobList />} />
            <Route path="/company" element={<AllCompanies />} />
            <Route
              path="/companyProfile/:companyId"
              element={<CompanyProfile />}
            />
            <Route path="/test" element={<SchoolForm />} />
            <Route path="/company" element={<CompanyProfile />} />
            <Route path="/test" element={<CompanyForm />} />
            <Route path="/test2" element={<GroupForm />} />
            <Route path="/test3" element={<EducationForm />} />
            <Route path="/test4" element={<ExperienceForm />} />
            <Route path="/test5" element={<SkillForm />} />
            <Route path="/test6" element={<JobForm />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
