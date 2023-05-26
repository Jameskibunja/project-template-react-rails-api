export const fetchLoggedInUser = () => {
    const token = localStorage.getItem('token');
    if (token && token !== "null") {
      return token;
    } else {
      // Redirect to login component or handle authentication logic here
    }
  };
  