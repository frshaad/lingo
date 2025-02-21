import RefillHearts from './refill-hearts';
import Subscription from './subscription';

type Properties = {
  points: number;
  hearts: number;
  hasActiveSubscription: boolean;
};

export default function ShopItems({
  hearts,
  points,
  hasActiveSubscription,
}: Properties) {
  return (
    <section className="w-full">
      <RefillHearts hearts={hearts} points={points} />
      <Subscription hasActiveSubscription={hasActiveSubscription} />
    </section>
  );
}
