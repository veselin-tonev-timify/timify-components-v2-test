import React, { ReactNode } from 'react';
import './Row.css';

export interface RowProps {
  children?: ReactNode;
  className?: string;
  noOffset?: boolean;
  dataAttributes?: Record<string, string | number>;
}

const Row: React.FC<RowProps> = ({ children, className, noOffset, dataAttributes }) => {
  const classNames = ['ta-row'];
  if (className) classNames.push(className);
  if (noOffset) classNames.push('ta-row__no-offset');
  
  let processedDataAttributes: Record<string, string | number> | undefined;
  if (dataAttributes) {
    processedDataAttributes = {};
    Object.keys(dataAttributes).forEach(key => {
      processedDataAttributes![`data-${key}`] = dataAttributes[key];
    });
  }

  return (
    <div className={classNames.join(' ')} {...processedDataAttributes}>
      {children}
    </div>
  );
};

export default Row;