import "./App.css";
import { ThemeProvider } from "./context/ThemeProvider";
import SwipeResume from "./components/SwipeResume";

function App() {
  return (
    <SwipeResume />
  );
}

function AppWithProvider() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWithProvider;
