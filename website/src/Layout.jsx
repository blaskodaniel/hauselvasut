import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <Header />
      </header>
      <main>
        <Main />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
