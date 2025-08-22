import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load creator data
  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setForm({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || '',
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (!form.name || !form.url || !form.description) {
        throw new Error('Please fill name, url, and description.');
      }
      const { error } = await supabase
        .from('creators')
        .update(form)
        .eq('id', id);
      if (error) throw error;
      navigate(`/creators/${id}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this creator?')) return;
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) {
      alert(error.message);
    } else {
      navigate('/');
    }
  }

  if (loading) return <p style={{ color: 'white' }}>Loading…</p>;

  return (
    <div className="form-card">
      <h2>Edit Creator</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <p role="alert" className="error-msg">
            Error: {error}
          </p>
        )}

        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={update}
            placeholder="e.g., Fireship"
          />
        </label>

        <label>
          URL
          <input
            name="url"
            value={form.url}
            onChange={update}
            placeholder="https://youtube.com/@..."
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={update}
            placeholder="What do they make?"
          />
        </label>

        <label>
          Image URL (optional)
          <input
            name="imageURL"
            value={form.imageURL}
            onChange={update}
            placeholder="https://…"
          />
        </label>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={handleDelete}
            style={{ backgroundColor: 'crimson' }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
