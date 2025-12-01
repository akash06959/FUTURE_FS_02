'use client'

interface FilterSidebarProps {
  categories: string[]
  selectedCategories: string[]
  price: number
  onCategoryChange: (category: string, isChecked: boolean) => void
  onPriceChange: (price: string) => void
}

export default function FilterSidebar({
  categories,
  selectedCategories,
  price,
  onCategoryChange,
  onPriceChange,
}: FilterSidebarProps) {
  return (
    <div className="sticky top-24 space-y-8 pr-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Category
        </h3>
        <div className="space-y-3">
        {categories.map((category) => (
            <label key={category} className="group flex cursor-pointer items-center">
              <div className="relative flex items-center">
            <input
              type="checkbox"
              value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => onCategoryChange(category, e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-indigo-600 checked:bg-indigo-600 hover:border-indigo-500"
            />
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:opacity-100"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
          </div>
              <span
                className={`ml-3 text-sm transition-colors ${
                  selectedCategories.includes(category)
                    ? 'font-medium text-gray-900'
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}
              >
                {category}
              </span>
            </label>
        ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Price Range
          </h3>
          <span className="text-sm font-bold text-indigo-600">${price}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={price}
          onChange={(e) => onPriceChange(e.target.value)}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600"
        />
        <div className="mt-2 flex justify-between text-xs font-medium text-gray-400">
          <span>$0</span>
          <span>$1000+</span>
        </div>
      </div>
    </div>
  )
}
