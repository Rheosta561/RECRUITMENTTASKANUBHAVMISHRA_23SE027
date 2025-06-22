import React, { Suspense } from 'react';
import ClientPage from './ClientPage';

export default function SharePageWrapper() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ClientPage />
    </Suspense>
  );
}
