const initialState = {
  darkMode: true,
  theme: {
    dark: {
      colors: {
        gradientBackground: "linear-gradient(180deg, #0B1120 0%, #0D152D 100%)",
        inputBorderSelected: "#38bdf8",
        background: "linear-gradient(to bottom, #06101C, #0D152D)",
        cardBackground: "rgba(30, 41, 59, 0.8)",
        inputBackground: "#182032",
        inputBorder: "#94A3B8",
        textLight: "#FFFFFF",
        textMuted: "#CCCCCC",
        primary: "rgba(999, 999, 999, 0.9)",
        buttonText: "#000000",
        error: "#F87171",
        hover: "#FFFFFF",
      },
      fontFamily: "Arial, sans-serif",
      input: {
        borderRadius: "5px",
        height: "45px",
      },
      button: {
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "16px",
      },
    },
    light: {
      colors: {
        gradientBackground: "linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%)",
        inputBorderSelected: "#38bdf8",
        background: "linear-gradient(to bottom, #FFFFFF, #F0F0F0)",
        cardBackground: "rgba(255, 255, 255, 0.8)",
        inputBackground: "#FFFFFF",
        inputBorder: "#94A3B8",
        textLight: "#000000",
        textMuted: "#4D4D4D",
        primary: "rgba(0, 0, 0, 0.9)",
        buttonText: "#FFFFFF",
        error: "#F87171",
        hover: "#000000",
      },
      fontFamily: "Arial, sans-serif",
      input: {
        borderRadius: "5px",
        height: "45px",
      },
      button: {
        borderRadius: "5px",
        padding: "10px 20px",
        fontSize: "16px",
      },
    },
  },
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export const toggleTheme = () => ({
  type: "TOGGLE_THEME",
});

export default themeReducer;
