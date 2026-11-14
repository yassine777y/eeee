import { CLIMATE_LAYERS, CLIMATE_LAYER_ORDER, ClimateLayerId } from '../data/climateLayers';

interface ObservatoryHeaderProps {
  activeLayer: ClimateLayerId;
  onSelectLayer: (layer: ClimateLayerId) => void;
  onOpenGuide: () => void;
  zenMode: boolean;
}

export function ObservatoryHeader({
  activeLayer,
  onSelectLayer,
  onOpenGuide,
  zenMode,
}: ObservatoryHeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800/80 bg-[#07090E]/88 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        zenMode ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      {/* Zone 1: Single-element Brand Wordmark */}
      <a
        href="#top"
        onClick={(e) => e.preventDefault()}
        className="font-display text-lg font-semibold tracking-tight text-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-4 rounded"
      >
        Earth Jukebox
      </a>

      {/* Zone 2: 4 concise single-line climate layer links */}
      <nav
        aria-label="Climate visualization layers"
        className="hidden md:flex items-center gap-7"
      >
        {CLIMATE_LAYER_ORDER.map((id, index) => {
          const spec = CLIMATE_LAYERS[id];
          const isActive = activeLayer === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectLayer(id)}
              aria-current={isActive ? 'page' : undefined}
              title={`Switch to ${spec.title} (Shortcut ${index + 1})`}
              className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-4 rounded ${
                isActive
                  ? 'text-slate-50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {spec.shortLabel}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-[15px] h-[2px] bg-sky-400"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onOpenGuide}
          className="px-4 py-2 text-xs font-medium text-slate-100 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2"
        >
          How It Works
        </button>
      </div>
    </header>
  );
}
