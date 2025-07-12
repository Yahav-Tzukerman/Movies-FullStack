export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      return undefined; // No saved state, return undefined
    }
    return JSON.parse(serializedState); // Parse and return saved state
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveState = ({ app, auth, cart }) => {
  try {
    const serializedState = JSON.stringify({
      app, // Save the `app` slice
      auth, // Save the `auth` slice
      cart, // Save the `cart` slice
    });
    localStorage.setItem("appState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem("appState"); // Clear the saved state
  } catch (err) {
    console.error("Failed to clear state from localStorage:", err);
  }
};

export const saveAuthToLocalStorage = (user) => {
  try {
    localStorage.setItem("auth", JSON.stringify(user));
  } catch (err) {
    console.error("Failed to save auth to localStorage:", err);
  }
};

export const loadAuthFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem("auth");
    return userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error("Failed to load auth from localStorage:", err);
    return null;
  }
};

export const clearAuthFromLocalStorage = () => {
  try {
    localStorage.removeItem("auth");
  } catch (err) {
    console.error("Failed to clear auth from localStorage:", err);
  }
};
