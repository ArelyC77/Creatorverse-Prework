import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

export default function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

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
      const { data, error } = await supabase
        .from('creators')
        .insert([form])
        .select()
        .single();
      if (error) throw error;
      navigate(`/creators/${data.id}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="form-card">
      <h2>Add Creator</h2>
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

        <button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Create'}
        </button>
      </form>
    </div>
  );
}
