import { Link } from 'react-router-dom';
import { FaPencilAlt, FaInfoCircle } from 'react-icons/fa'; // Icons

export default function CreatorCard({ creator }) {
  const { id, name, description, imageURL } = creator;

  return (
    <div
      className="creator-card"
      style={{
        backgroundImage: imageURL ? `url(${imageURL})` : 'none',
      }}
    >
      <div className="creator-icons">
        <Link to={`/creators/${id}/edit`} title="Edit">
          <FaPencilAlt />
        </Link>
        <Link to={`/creators/${id}`} title="View">
          <FaInfoCircle />
        </Link>
      </div>

      <div className="creator-info">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
