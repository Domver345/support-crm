function SearchBar({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">

      <input
        type="text"
        placeholder="Search tickets..."
        className="flex-1 px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-slate-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-slate-300"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">
          In Progress
        </option>
        <option value="Closed">Closed</option>
      </select>

    </div>
  );
}

export default SearchBar;