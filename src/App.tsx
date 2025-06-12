import Navbar from "./layout/Navbar";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <Navbar text="Sign up" onNavigate="/signup" />
      <LandingPage />
    </div>
  );
}
export default App;
