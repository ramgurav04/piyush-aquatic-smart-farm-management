import React from 'react';

export const RouteLoading: React.FC = () => {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center p-8" role="status" aria-label="Loading page">
      <div className="h-8 w-8 animate-spin rounded-full border-3 border-teal-600 border-t-transparent" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
