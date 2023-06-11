import { Board } from "./components/board/Board";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Header/>
      <main>
        <Board/>
      </main>
      <Footer/>
    </Layout>
  );
}

export default App;
