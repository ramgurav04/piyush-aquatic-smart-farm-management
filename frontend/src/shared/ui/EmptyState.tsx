import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#D9E8E5] p-10 text-center bg-white my-4">
      {icon && <div className="mb-3 text-[#087F8C]">{icon}</div>}
      <h3 className="text-base font-semibold text-[#153D42]">{title}</h3>
      <p className="mt-1 text-sm text-[#526977] max-w-md">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
