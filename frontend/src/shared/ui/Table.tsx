import React from 'react';

export const TableContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Scrollable data table"
      className={`overflow-x-auto rounded-lg border border-[#D9E8E5] focus:outline-none focus:ring-2 focus:ring-[#087F8C] ${className}`}
    >
      <table className="min-w-full divide-y divide-[#D9E8E5] bg-white text-left text-sm text-[#263238]">
        {children}
      </table>
    </div>
  );
};

export const TableHead: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <thead className={`bg-[#F2F6F5] ${className}`}>{children}</thead>;
};

export const TableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <tbody className={`divide-y divide-[#D9E8E5] ${className}`}>{children}</tbody>;
};

export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <tr className={`hover:bg-[#F9FCFB] transition-colors ${className}`}>{children}</tr>;
};

export const TableHeaderCell: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#153D42] ${className}`}>
      {children}
    </th>
  );
};

export const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <td className={`px-4 py-3 whitespace-nowrap text-sm text-[#263238] ${className}`}>{children}</td>;
};
