import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RoutesApp } from "./routes/index.routes";
import "./App.css"
import { Header } from './components/Header';
import { Footer } from "./components/Footer";
import { AppProvider } from "./hooks";


function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Header />
          <RoutesApp />
        </BrowserRouter>
        <Footer />
      </AppProvider>
    </>
  )
}

export default App
