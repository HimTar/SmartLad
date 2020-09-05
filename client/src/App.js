import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./components/admin";
import NavBar from "./components/navbar/Navbar";
import Footer from "./components/footer/footer";
import Home from "./components/homepage/home";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Dashbord from "./components/dashbord/dashbord";
import Courses from "./components/courses/courses";
import CoursePage from "./components/courses/coursePage";
import PaymentStatus from "./components/payment/payment";
import UploadCourse from "./components/UploadCourse/UploadCourse";
import PrivateRoute from "./hocs/privateRoutes";
import UnPrivateRoute from "./hocs/unprivateroute";
import Page404 from "./components/utils/Page404/Page404";

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/courses/:courseId" component={CoursePage} />

        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />

        <PrivateRoute
          path="/payment-status"
          roles={["user"]}
          component={PaymentStatus}
        />
        <PrivateRoute
          path="/dashbord"
          roles={["admin", "user"]}
          component={Dashbord}
        />
        <PrivateRoute
          path="/upload-course"
          roles={["user"]}
          component={UploadCourse}
        />
        <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />

        <Route component={Page404} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
