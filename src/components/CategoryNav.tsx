import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Sparkles, Tractor, Shirt, Car, Smartphone, Building2, Briefcase, Grid } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectSubcategory: (subcategoryId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  Tractor,
  Shirt,
  Car,
  Smartphone,
  Building2,
  Briefcase
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
}) => {
  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="bg-white border-b border-slate-200 shadow-2xs sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
          
          {/* All Button */}
          <button
            onClick={() => {
              onSelectCategory('all');
              onSelectSubcategory('all');
            }}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>सभी श्रेणियां</span>
          </button>

          {CATEGORIES.map((category) => {
            const IconComponent = ICON_MAP[category.iconName] || Grid;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => {
                  onSelectCategory(category.id);
                  onSelectSubcategory('all');
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-600 ring-offset-1'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-emerald-700'}`} />
                <span>{category.nameHi}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategories Bar (When a Category is Selected) */}
        {activeCategoryObj && (
          <div className="py-2.5 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">उप-श्रेणी:</span>
            
            <button
              onClick={() => onSelectSubcategory('all')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              सब देखें
            </button>

            {activeCategoryObj.subcategories.map((sub) => {
              const isSubSelected = selectedSubcategory === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => onSelectSubcategory(sub.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                    isSubSelected
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
