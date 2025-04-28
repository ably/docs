import * as Ably from 'ably';
import { useNavigate } from 'react-router-dom';
import minifaker from 'minifaker';
import 'minifaker/locales/en';

const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : {});
const channelName = urlParams.get('name') || 'pub-sub-history';

export default function Home() {
  const navigate = useNavigate();

  const preloadBiddingHistory = async () => {
    let lastBidAmount = 100;
    // Define how many bids to simulate
    const numBids = 10;

    for (let i = 0; i < numBids; i++) {
      const clientId = minifaker.firstName();

      const client = new Ably.Realtime({
        key: import.meta.env.VITE_ABLY_KEY,
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

    navigate(`/auction?name=${encodeURIComponent(channelName)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 uk-text-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl mb-6">Welcome to the auction</h2>
        <p>Click the button below to add some historical bids.</p>
        <div className="inline-flex flex-col gap-4 items-center">
          <button onClick={() => preloadBiddingHistory()} className="uk-btn uk-btn-md uk-btn-primary mb-1 mt-1 rounded-[1998px] hover:uk-btn-primary+1 active:uk-btn-primary+2 min-w-[180px]">
            Pre-load bidding history
          </button>
        </div>
      </div>
    </div>
  );
}
