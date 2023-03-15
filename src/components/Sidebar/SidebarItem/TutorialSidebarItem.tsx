import React, { ReactElement } from 'react';

export const TutorialSidebarItem = ({ label, content }: { label: React.ReactNode; content: ReactElement }) => {
  return (
    <div>
      <p className="flex items-center justify-between">{label}</p>
      <p>{content}</p>
    </div>
  );
};
