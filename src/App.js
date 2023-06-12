import { Board } from "./components/board/Board";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Layout } from "./components/layout/Layout";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Card } from './components/board/card/Card';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Board/>
  },
  {
      path: "/tasks/:cardId",
      element: <Card/>
  }
  ])


function App() {
  return (
    <Layout>
      <Header/>
      <main>
        <RouterProvider router={router}/>
      </main>
      <Footer/>
    </Layout>
  );
}

export default App;
