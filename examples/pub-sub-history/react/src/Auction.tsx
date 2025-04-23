import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAbly, useChannel } from 'ably/react';
import UIkit from 'uikit';
import './styles/styles.css';

interface BiddingHistory {
  clientId: string;
  amount: number;
  timestamp: Date;
}

const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
const channelName = urlParams.get('name') || 'pub-sub-history';

export default function AuctionRoom() {
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [biddingHistory, setBiddingHistory] = useState<BiddingHistory[]>([]);
  const [currentBid, setCurrentBid] = useState<BiddingHistory | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const ably = useAbly();
  const currentClientId = ably?.auth.clientId;

  const { channel, publish } = useChannel(channelName, (message) => {
    if (message.name !== 'bid') return;
    if (!message.clientId || !message.data.amount || !message.data.timestamp) {
      console.log('Missing required fields');
      return;
    }

    setBiddingHistory((prevHistory) => [
      { clientId: message.clientId || '', amount: message.data.amount, timestamp: new Date(message.data.timestamp) },
      ...prevHistory,
    ]);

    setCurrentBid({
      clientId: message.clientId || '',
      amount: message.data.amount,
      timestamp: new Date(message.data.timestamp),
    });
  });

  useEffect(() => {
    const retrieveLastBidAmount = async () => {
      let messages;

      try {
        const resultPage = await channel.history();
        messages = resultPage.items;
      } catch (error) {
        console.error('Failed to retrieve message history:', error);
        return null;
      }

      const messageName = 'bid';
      const filteredMessages = messages.filter((message) => message.name === messageName);

      if (filteredMessages.length > 0) {
        return filteredMessages[0];
      }

      return null;
    };

    const fetchLastBidAmount = async () => {
      const currentBid = await retrieveLastBidAmount();
      if (currentBid) {
        setCurrentBid({
          clientId: currentBid.clientId || '',
          amount: currentBid.data.amount,
          timestamp: new Date(currentBid.data.timestamp),
        });
      } else {
        setCurrentBid(null);
      }
    };

    fetchLastBidAmount();
  }, [channel]);

  const handleBid = () => {
    if (!bidAmount) {
      alert('Please enter a valid bid amount.');
      return;
    }

    if (currentBid !== null && bidAmount <= currentBid?.amount) {
      alert('Bid amount must be greater than the current bid.');
      return;
    }

    publish('bid', { amount: bidAmount.toFixed(2), timestamp: new Date() });
    setBidAmount(0);
    UIkit.modal('#bid-modal').hide();
  };

  const retrieveBiddingHistory = async () => {
    let messages: any[] = [];
    setHistoryLoaded(true);

    try {
      const resultPage = await channel.history();
      messages = resultPage.items;
    } catch (error) {
      console.error('Failed to load bidding history:', error);
    }

    const filteredMessages = messages.filter((message) => message.name === 'bid');

    const history = filteredMessages
      .slice(0, 10)
      .map((message) => ({
        clientId: message.clientId || '',
        amount: message.data.amount,
        timestamp: new Date(message.data.timestamp),
      }))
      .filter((newBid) => {
        return !biddingHistory.some(
          (existingBid) =>
            existingBid.clientId === newBid.clientId &&
            existingBid.amount === newBid.amount &&
            existingBid.timestamp.getTime() === newBid.timestamp.getTime(),
        );
      });

    setBiddingHistory((prevHistory) => [...prevHistory, ...history]);
  };

  return (
    <div className="h-max p-4 overflow-y-auto">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-2">Auction item #1</p>
          <button
            className="uk-btn uk-btn-sm uk-btn-secondary mb-2 rounded"
            type="button"
            onClick={() => UIkit.modal('#bid-modal').show()}
          >
            Place bid
          </button>

          {currentBid ? (
            <div className="bg-gray-100 p-2 rounded-lg mb-4">
              <h2 className="text-sm font-bold mb-1">Current Bid</h2>
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium w-1/3 text-left">
                  {currentBid.clientId}
                  {currentBid.clientId === currentClientId ? ' (You)' : ''}
                </span>
                <span className="text-gray-600 w-1/3 text-center">
                  {currentBid.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
                <span className="font-bold text-lg">${currentBid.amount}</span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-bold mb-2">Current bid</h2>
              <p className="text-gray-600">No bids yet.</p>
            </div>
          )}

          <div className="mt-4 border-t pt-2">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold">Bidding history</h2>
              <button
                className="uk-btn uk-btn-sm uk-btn-primary py-1 rounded"
                onClick={() => retrieveBiddingHistory()}
                disabled={historyLoaded}
              >
                Load history
              </button>
            </div>
            <div className="space-y-1 text-xs">
              {biddingHistory.map((bid, index) => (
                <div key={index} className="flex items-center justify-between py-1 border-b">
                  <span className="font-medium w-1/3 text-left">
                    {bid.clientId}
                    {bid.clientId === currentClientId ? ' (You)' : ''}
                  </span>
                  <span className="text-gray-600 w-1/3 text-center">
                    {bid.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  <span className="font-bold w-1/3 text-right">${bid.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {ReactDOM.createPortal(
          <div id="bid-modal" className="uk-modal">
            <div className="uk-modal-dialog uk-modal-body p-4">
              <h3 className="text-sm font-bold mb-2">Place your bid</h3>

              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="uk-input uk-form-sm mb-2"
                placeholder="Enter bid amount"
              />

              <p className="uk-text-right">
                <button className="uk-btn uk-btn-default uk-btn-sm mr-2" type="button" uk-toggle="target: #bid-modal">
                  Cancel
                </button>
                <button onClick={handleBid} className="uk-btn uk-btn-sm uk-btn-primary" type="button">
                  Place bid
                </button>
              </p>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </div>
  );
}
