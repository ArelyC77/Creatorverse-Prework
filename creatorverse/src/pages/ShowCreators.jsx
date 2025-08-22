import CreatorCard from "../components/CreatorCard";

export default function ShowCreators({ creators = [] }) {
  if (!Array.isArray(creators)) creators = [];
  return (
    <div className="creators-grid">
      {creators.length > 0 ? (
        creators.slice(0, 5).map((c) => <CreatorCard key={c.id} creator={c} />)
      ) : (
        <p style={{ color: "white" }}>No creators yet.</p>
      )}
    </div>
  );
}
