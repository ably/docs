import React from 'react';
import Badge from '@ably/ui/core/Badge';
import cn from '@ably/ui/core/utils/cn';
import { getProductTag } from './tags';

// Renders a single product tag, matching the Examples grid: a default (neutral)
// Badge with an uppercase, product-coloured label.
const ChangelogTag = ({ product }: { product: string }) => {
  const { label, colorClass } = getProductTag(product);
  return <Badge className={cn('uppercase', colorClass)}>{label}</Badge>;
};

export default ChangelogTag;
