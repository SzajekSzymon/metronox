import React, { useState } from 'react';

interface CollapseProps {
  title: string;
  children: React.ReactNode;
}

export const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="collapse-container">
      <div className="collapse-header" onClick={toggleCollapse}>
        <span>{title}</span>
        <button>{isCollapsed ? '+' : '-'}</button>
      </div>
      {!isCollapsed && <div className="collapse-content">{children}</div>}
    </div>
  );
};

export default Collapse;