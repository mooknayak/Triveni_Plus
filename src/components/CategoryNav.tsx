import React from 'react';
import { CATEGORIES } from '../data/categories';
import { useApp } from '../context/AppContext';
import { LayoutGrid, Sparkles } from 'lucide-react';

export const CategoryNav: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    selectedSubcategory, 
    setSelectedSubcategory 
  } = useApp();

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="bg-white border-b border-gray-200 shadow-xs sticky top-[73px] z-30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Primary Categories Scroll List */}
        <div className="flex items-center space-x-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
          {/* "All Categories" button */}
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-md shadow-emerald-800/10'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>सभी श्रेणियां (All)</span>
          </button>

          {/* Category List */}
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubcategory('all');
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-md shadow-emerald-800/10'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <span>{cat.nameHi}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategories bar (if category selected) */}
        {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
          <div className="py-2.5 border-t border-gray-100 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-medium text-gray-400 shrink-0 mr-1">उप-श्रेणी:</span>
            
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                selectedSubcategory === 'all'
                  ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              सब देखें (All {activeCategoryObj.nameHi})
            </button>

            {activeCategoryObj.subcategories.map((sub) => {
              const isSubSelected = selectedSubcategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcategory(sub.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                    isSubSelected
                      ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {sub.nameHi}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
