export default function PokemonFilter({ types, filter, setFilter }) {
    return (
      <div className="flex gap-4 mb-4">
        <select
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          className="border p-3 rounded max-w-xs w-full"
        >
          <option value="">Select</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="border p-3 rounded flex-1 max-w-md w-full"
        />
      </div>
    );
  }
  