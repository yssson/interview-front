import {Router} from './router/Router'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
      <main>
          <Router/>
          <ToastContainer position="top-center" autoClose={3000} aria-label="알림 메시지 창" />
      </main>
  );
};
