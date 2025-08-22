import CreatorCard from '../components/CreatorCard';
import { useEffect, useState } from 'react';
import { supabase } from '../client';

export default function AllCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('creators').select('*');
      if (error) console.log('Error fetching creators:', error);
      else setCreators(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p style={{ color: 'white' }}>Loading...</p>;

  return (
    <div className="creators-grid">
      {creators.length > 0 ? (
        creators.map((creator) => <CreatorCard key={creator.id} creator={creator} />)
      ) : (
        <p style={{ color: 'white' }}>No creators yet.</p>
      )}
    </div>
  );
}
