import { useState, useEffect } from "react";
import UserService from "../services/users.service";

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = UserService.getUsers((usersData) => {
      const customerUsers = usersData.filter(
        (user) => user.role === "customer"
      );
      setUsers(customerUsers);
    });

    return () => unsubscribe();
  }, []);

  return users;
}

export default useUsers;
