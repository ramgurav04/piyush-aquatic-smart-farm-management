import { useContext } from 'react';
import { CommerceContext } from '../context/CommerceContextValue';

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) throw new Error('useCommerce must be used within a CommerceProvider');
  return context;
};
