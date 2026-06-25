import React from 'react';
import Badge from 'src/components/ui/Badge';

// The wrapping div with data-toc-exclude prevents this badge's text from
// appearing in the "On this page" sidebar when rendered inside a heading.
// A <div> is used instead of <span> because Badge renders a <div> internally,
// and nesting a <div> inside a <span> produces invalid HTML.
const RequiredBadge: React.FC = () => (
  <div data-toc-exclude className="inline">
    <Badge color="orange" size="md" className="ml-2 align-text-bottom">
      Required
    </Badge>
  </div>
);

export default RequiredBadge;
