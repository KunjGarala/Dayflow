import { Plus } from "lucide-react";

const AddButton = ({ onClick, label = "Add" }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
    >
      <Plus className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};

export default AddButton;

