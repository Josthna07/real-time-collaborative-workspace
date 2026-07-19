import { Search } from "lucide-react";

function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative max-w-md">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          py-3
          pl-11
          pr-4
          shadow-sm
          outline-none
          transition
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-200
        "
      />

    </div>
  );
}

export default SearchInput;