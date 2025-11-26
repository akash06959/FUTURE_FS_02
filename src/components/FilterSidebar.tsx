'use client'

export default function FilterSidebar({ categories, onCategoryChange, onPriceChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              value={category}
              onChange={(e) => onCategoryChange(e.target.value, e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <input
          type="range"
          min="0"
          max="1000"
          onChange={(e) => onPriceChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  )
}
