import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "./ui/button";

function FilterSidebar({
    allProduct,
    priceRange,
    setPriceRange,
    search,
    setSearch,
    brand,
    setBrand,
    category,
    setCategory,
    sortOrder,
    setSortOrder,
}) {
    const [showFilter, setShowFilter] = useState(false);

    const categories = allProduct.map((p) => p.category);
    const uniqueCategory = ["All", ...new Set(categories)];

    const brands = allProduct.map((p) => p.brand);
    const uniqueBrand = ["All", ...new Set(brands)];

    const handleCategoryClick = (val) => {
        setCategory(val);
    };

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
    };

    const handleMinChange = (e) => {
        const value = Number(e.target.value);

        if (value <= priceRange[1]) {
            setPriceRange([value, priceRange[1]]);
        }
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);

        if (value >= priceRange[0]) {
            setPriceRange([priceRange[0], value]);
        }
    };

    const resetFilters = () => {
        setSearch("");
        setCategory("All");
        setBrand("All");
        setPriceRange([0, 999999]);
        setSortOrder("");
    };

    const FilterContent = () => (
        <div className="w-full bg-white rounded-xl border border-pink-100 shadow-sm p-4">
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-pink-200 outline-none focus:ring-2 focus:ring-pink-300 text-sm"
            />

            <div className="mt-5">
                <h1 className="text-sm font-semibold mb-3">
                    Category
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                    {uniqueCategory.map((item, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-2 text-sm cursor-pointer"
                        >
                            <input
                                type="radio"
                                checked={category === item}
                                onChange={() =>
                                    handleCategoryClick(item)
                                }
                                className="accent-pink-500"
                            />
                            {item}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-5">
                <h1 className="text-sm font-semibold mb-3">
                    Brand
                </h1>

                <select
                    value={brand}
                    onChange={handleBrandChange}
                    className="w-full h-10 px-3 rounded-md border border-pink-200 outline-none"
                >
                    {uniqueBrand.map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                </select>
            </div>

            <div className="mt-5">
                <h1 className="text-sm font-semibold mb-3">
                    Price Range
                </h1>

                <div className="flex justify-between text-xs mb-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                </div>

                <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[0]}
                    onChange={handleMinChange}
                    className="w-full accent-pink-500"
                />

                <input
                    type="range"
                    min="0"
                    max="999999"
                    step="100"
                    value={priceRange[1]}
                    onChange={handleMaxChange}
                    className="w-full accent-pink-500 mt-3"
                />

                <div className="grid grid-cols-2 gap-3 mt-4">
                    <input
                        type="number"
                        value={priceRange[0]}
                        onChange={handleMinChange}
                        className="w-full h-10 px-2 rounded-md border border-pink-200"
                    />

                    <input
                        type="number"
                        value={priceRange[1]}
                        onChange={handleMaxChange}
                        className="w-full h-10 px-2 rounded-md border border-pink-200"
                    />
                </div>

                <Button
                    onClick={resetFilters}
                    className="w-full mt-5 bg-pink-500 hover:bg-pink-600"
                >
                    Reset Filters
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <div className="lg:hidden fixed top-20 left-0 right-0 z-50 px-4 py-2">
                <div className="flex items-center justify-between gap-3">
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm bg-white hover:bg-pink-50"
                    >
                        {showFilter ? (
                            <X size={18} />
                        ) : (
                            <Filter size={18} />
                        )}

                        <span className="text-sm font-medium">
                            Filters
                        </span>
                    </button>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-2 rounded-full border shadow-sm bg-white text-sm outline-none"
                    >
                        <option value="">
                            Sort By
                        </option>

                        <option value="Price:Low to High">
                            Price ↑
                        </option>

                        <option value="Price:High to Low">
                            Price ↓
                        </option>
                    </select>
                </div>
            </div>

            <div className="h-16 lg:hidden"></div>

            <div
                className={`lg:hidden ${showFilter ? "block mt-2" : "hidden"
                    }`}
            >
                <FilterContent />
            </div>

            <div className="hidden lg:block">
                <FilterContent />
            </div>
        </>
    );
}

export default FilterSidebar;