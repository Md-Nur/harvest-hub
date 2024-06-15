import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="min-h-[calc(100vh-244px)] flex justify-center items-center w-full">
        <Outlet />
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Slide
      />
      <Footer />
    </div>
  );
};

export default Root;
