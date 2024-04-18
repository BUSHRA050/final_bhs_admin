import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./containers/auth/login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SuperAdminRoutes } from "./routes/allRoutes";
import AppProvider from "./context";
import { AuthRoutes } from "./routes/authRoutes";
import OrginizationDetail from "./containers/app/orginization/orginizationDetail";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Lato",
        "sans-serif",
        // '"Apple Color Emoji"',
        // '"Segoe UI Emoji"',
        // '"Segoe UI Symbol"',
      ].join(","),
    },
    button: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
  });
  const isUserAuthenticate = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      console.log("i am in");
      return userData;
    } else {
      return null;
    }
  };
  const isAuthenticated = isUserAuthenticate();

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AuthRoutes />}>
            {isAuthenticated?.email === "bhsjobportal@gmail.com" ? (
              SuperAdminRoutes.map(
                ({ component: Component, path, exact, id }) => {
                  return (
                    <Route
                      key={id}
                      path={path}
                      exact={exact}
                      element={Component}
                    />
                  );
                }
              )
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          <Route path="/orginizationDetail/:adid" element={<OrginizationDetail />} />
          </Route>
        </Routes>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
