import Profile from '@/components/me/profile';
import { Suspense } from 'react';
import Loading from './loading';

function page() {
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <Profile/>
      </Suspense>
    </div>
  )
}

export default page