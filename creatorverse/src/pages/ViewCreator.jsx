import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { FaYoutube } from 'react-icons/fa';

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setCreator(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!creator) return <p>No creator found.</p>;

  return (
    <div className="view-creator-container">
      <div
        className="creator-image"
        style={{
          backgroundImage: creator.imageURL ? `url(${creator.imageURL})` : 'none',
        }}
      ></div>
      <div className="creator-details">
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>
        {creator.url && (
          <a
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-link"
          >
            <FaYoutube style={{ marginRight: '0.5rem', verticalAlign: 'middle', color: 'red' }} />
            {creator.url}
          </a>
        )}
      </div>
    </div>
  );
}
