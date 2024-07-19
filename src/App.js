import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routes/routes";
import "./App.css";

function App() {
  return (
    <div className="App max-w-[1536px] mx-auto bg-white font-poppins">
      <AppRouter />
    </div>
  );
}

export default App;
