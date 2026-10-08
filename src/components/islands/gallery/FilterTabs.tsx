import type { Filter, FilterOption } from './types';

interface Props {
  options: FilterOption[];
  active: Filter;
  counts: Record<Filter, number>;
  onChange: (filter: Filter) => void;
}

export default function FilterTabs({ options, active, counts, onChange }: Props) {
  return (
    <div className="gallery__filters" role="group" aria-label="Filtrar diseños">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className="gallery__filter"
          aria-pressed={active === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
          <sup className="gallery__count">{String(counts[option.id]).padStart(2, '0')}</sup>
        </button>
      ))}
    </div>
  );
}
