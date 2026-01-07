import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="page">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
