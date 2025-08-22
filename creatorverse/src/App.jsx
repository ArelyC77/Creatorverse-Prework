import { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import { supabase } from './client'; // make sure this points to your Supabase client
import ShowCreators from './pages/ShowCreators.jsx';
import ViewCreator from './pages/ViewCreator.jsx';
import AddCreator from './pages/AddCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';
import AllCreators from './pages/AllCreators.jsx';

export default function App() {
  const [creators, setCreators] = useState([]);

  // Fetch creators from Supabase
  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase
        .from('creators') // your Supabase table
        .select('*');

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
    }

    fetchCreators();
  }, []);

  const routes = useRoutes([
    { path: '/', element: <ShowCreators creators={creators} /> }, // pass fetched creators
    { path: '/new', element: <AddCreator /> },
    { path: '/all', element: <AllCreators /> },
    { path: '/creators/:id', element: <ViewCreator /> },
    { path: '/creators/:id/edit', element: <EditCreator /> },
  ]);

  const imageURL =
    'https://media.istockphoto.com/id/627281636/photo/earth-night-space.jpg?s=612x612&w=0&k=20&c=nJyJIXDX2InYCCcP3rIxFEhGmJ_x8cEmFK90CeD9Y0s=';

  return (
    <div className="app-container">
      {/* top half hero */}
      <section
        className="top-section"
        style={{
          backgroundImage: `url(${imageURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="title-container">
          <Link to="/" className="creatorverse-title">
            <h1>Creatorverse💫</h1>
          </Link>
          <Link to="/all" className="view-all-btn">
            View All Creators
          </Link>
          <Link to="/new" className="add-creator-btn">
            + Add Creator
          </Link>
        </div>
      </section>

      {/* bottom half list */}
      <div className="bottom-section">
        <main className="container" style={{ padding: '2rem' }}>
          {routes}
        </main>
      </div>
    </div>
  );
}
