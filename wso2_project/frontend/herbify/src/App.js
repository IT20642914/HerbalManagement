import logo from './logo.svg';
import './App.css';
import { Box, Container } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import Headder from './componet/headder';
import Footer from './componet/footer';
import { AllRoutes } from "./routes/router";
import { fetch_cart_data, fetch_user_data } from "./redux";

function App(props) {
  useEffect(() => {
    props.fetch_user_data();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.fetch_cart_data();
    // eslint-disable-next-line
  }, [props.login, props.logout]);

  return (
    <div className="App">
      <Headder />
      <Box mt={2} mb={10}>
        <Container maxWidth="lg">{AllRoutes()}</Container>
      </Box>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.currentUser.loading,
    login: state.currentUser.login,
    logout: state.currentUser.logout,
    user_data: state.currentUser.user_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user_data: () => dispatch(fetch_user_data()),
    fetch_cart_data: () => dispatch(fetch_cart_data()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
