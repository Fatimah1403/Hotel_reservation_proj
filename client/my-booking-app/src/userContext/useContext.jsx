import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();

export const UserGetter = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Move this line here

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentRoute = location.pathname;
        console.log(currentRoute);

        const excludedRoutes = [
          "/",
          "/login",
          "/signup",
          "/hotels",
          "/register",
        ];

        const isRouteExcluded = (route) => {
          return excludedRoutes.some((excludedRoute) => {
            if (excludedRoute instanceof RegExp) {
              return excludedRoute.test(route);
            } else {
              const check = route.includes("/hotels/");
              if (check === true) {
                const url = route.split("/")[2];
                const id = Number(url);
                if (!id) {
                  return false;
                }
                if (typeof id === "number") {
                  return true;
                }
              }
              return excludedRoute === route;
            }
          });
        };

        const isExcluded = isRouteExcluded(currentRoute);
        console.log(isExcluded);

        const getAuth = JSON.parse(localStorage.getItem("auth"));
        const accessToken = getAuth.accessToken;

        if (!isExcluded) {
          const baseUrl = "http://localhost:5003/api/v1/users";
          const uri = `${baseUrl}/me`;
          const response = await axios.get(uri, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log(response);
          if (response.status >= 200 && response.status < 300) {
            console.log("i am triggered");
            console.log(response.data);
            setUserData(response.data);
          } else {
            console.log("request failed");
            setUserData(null);
            localStorage.clear();
            navigate("/login")
            // if (isExcluded) {
            //   navigate("/login");
            // }
          }
        }
        else{
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [location.pathname, navigate]);

  const setUserData = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
