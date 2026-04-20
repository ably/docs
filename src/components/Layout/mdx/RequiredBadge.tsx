import React from 'react';
import Badge from '@ably/ui/core/Badge';

const RequiredBadge: React.FC = () => (
  <Badge color="orange" size="md" className="ml-2 align-text-bottom">
    Required
  </Badge>
);

export default RequiredBadge;
