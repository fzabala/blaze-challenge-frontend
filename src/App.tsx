import './App.scss';
import { HomePage } from './pages';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout';

function App() {
  const routes = [
    {
      path: '/',
      component: <HomePage />,
      title: 'Homepage',
      exact: true
    }
  ];

  return (
    <div className="App">
      <Routes>
        {
          routes.map((route, index) => (
            <Route
              {...route}
              key={index}
              element={
                <Layout title={route.title}>{route.component}</Layout>
              }
            />
          ))
        }
      </Routes>
    </div>
  );
}

export default App;
