import UserProgress from '@/components/user-progress';

import FeedHeader from './_components/feed-header';
import FeedWrapper from './_components/feed-wrapper';
import StickyWrapper from './_components/sticky-wrapper';

export default function LearnPage() {
  return (
    <div className="flex gap-12 px-6">
      <FeedWrapper>
        <FeedHeader title="Spanish" />
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: 'spanish', imageSrc: '/es.svg' }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
    </div>
  );
}
