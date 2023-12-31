import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
