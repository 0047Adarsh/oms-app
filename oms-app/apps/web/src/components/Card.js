export default function Card({ title, children }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    );
  }