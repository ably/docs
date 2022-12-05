import React from 'react';
import { CardFlag } from './CardFlag';
import { CardTitle } from './CardTitle';

export const CardHeader = ({ title, flag }: { title: string; flag: string | null }) => (
  <header className="flex flex-row justify-between">
    <CardTitle title={title} />
    {flag && <CardFlag flag={flag} />}
  </header>
);
