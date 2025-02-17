'use client'

import * as Ably from 'ably';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/navigation';

const urlParams = new URLSearchParams(window.location.search);
const channelName = urlParams.get('name') || 'pub-sub-history';

export default function Home() {
  const router = useRouter();

  const preloadBiddingHistory = async () => {
    let lastBidAmount = 100;
    // Define how many bids to simulate
    const numBids = 10;

    for (let i = 0; i < numBids; i++) {
      const clientId = faker.person.firstName();

      const client = new Ably.Realtime({
        key: process.env.NEXT_PUBLIC_ABLY_KEY,
        clientId,
      });
      const channel = client.channels.get(channelName);

      const bidAmount = (lastBidAmount + Math.random() * 50).toFixed(2);

      await channel.publish('bid', {
        amount: bidAmount,
        timestamp: new Date().toISOString(),
      });

      console.log(`Client ${clientId} placed a bid of $${bidAmount} (previous was $${lastBidAmount})`);
      lastBidAmount = parseFloat(bidAmount);
    }

    router.push(`/auction?name=${encodeURIComponent(channelName)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-6 text-center">Welcome to the auction</h2>
        <p>Click the button below to add some historical bids.</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => preloadBiddingHistory()}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Pre-load bidding history
          </button>
        </div>
      </div>
    </div>
  );
}
