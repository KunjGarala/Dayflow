const Card = ({ title, children }) => {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default Card;

