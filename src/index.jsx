import { createRoot } from 'react-dom/client';

// Import statement to 'MainView'
import { MainView } from "./components/main-view/main-view";

// Import statement to bundle `./index.scss`
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return <MainView />
};

// Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);