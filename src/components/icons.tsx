export function Tick() {
  return (
    <svg className="tick" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M8 13.4 4.6 10l-1.4 1.4L8 16.2 17.2 7l-1.4-1.4z" />
    </svg>
  );
}

export function Cross() {
  return (
    <svg className="cross" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M14.7 6.7 13.3 5.3 10 8.6 6.7 5.3 5.3 6.7 8.6 10l-3.3 3.3 1.4 1.4L10 11.4l3.3 3.3 1.4-1.4L11.4 10z" />
    </svg>
  );
}

/** Placeholder silhouette shown until a real photo is uploaded to Sanity. */
export function CarSilhouette({ van = false }: { van?: boolean }) {
  if (van) {
    return (
      <svg viewBox="0 0 300 110" aria-hidden="true">
        <path
          d="M14 78V38a10 10 0 0 1 10-10h124a10 10 0 0 1 7.6 3.5l34 40a10 10 0 0 0 7.6 3.5h44a10 10 0 0 1 10 10V70a8 8 0 0 1-8 8h-10M56 78h130M30 44h110"
          stroke="currentColor" strokeWidth="5" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="72" cy="78" r="15" stroke="currentColor" strokeWidth="5" fill="none" />
        <circle cx="216" cy="78" r="15" stroke="currentColor" strokeWidth="5" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 110" aria-hidden="true">
      <path
        d="M22 78h-6a8 8 0 0 1-8-8V58a10 10 0 0 1 7-9.5l28-8.6 22-14.6A22 22 0 0 1 97.2 22h63a22 22 0 0 1 13.4 4.6l23 17.8 41 6.2A12 12 0 0 1 248 62.4V70a8 8 0 0 1-8 8h-8M92 78h76M60 44l18-12a14 14 0 0 1 8-2.6h26V44zm60 0V29.4h32a14 14 0 0 1 8.6 3L178 44z"
        stroke="currentColor" strokeWidth="5" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="74" cy="78" r="15" stroke="currentColor" strokeWidth="5" fill="none" />
      <circle cx="196" cy="78" r="15" stroke="currentColor" strokeWidth="5" fill="none" />
    </svg>
  );
}
