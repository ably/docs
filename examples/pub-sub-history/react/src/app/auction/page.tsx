'use client';

import { useState, useEffect } from 'react';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { faker } from '@faker-js/faker';

interface BiddingHistory {
  clientId: string;
  amount: number;
  timestamp: Date;
}

export default function AuctionWrapper() {
  const client = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_KEY,
    clientId: faker.person.firstName()
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="cab-pad-sit">
        <AuctionRoom />
      </ChannelProvider>
    </AblyProvider>
  );
}

function AuctionRoom() {
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [biddingHistory, setBiddingHistory] = useState<BiddingHistory[]>([]);
  const [currentBid, setCurrentBid] = useState<BiddingHistory | null>(null);

  const { channel, publish } = useChannel('cab-pad-sit', (message) => {
    if (message.name === 'bid') {
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
        timestamp: new Date(message.data.timestamp)
      });
    }
  });

  useEffect(() => {
    const retrieveLastBidAmount = async () => {
      try {
        const resultPage = await channel.history();
        const messages = resultPage.items;
        const messageName = 'bid';
        const filteredMessages = messages.filter(message => message.name === messageName);

        if (filteredMessages.length > 0) {
          return filteredMessages[0];
        }

        return null;
      } catch (error) {
        console.error('Failed to retrieve message history:', error);
        return null;
      }
    };

    const fetchLastBidAmount = async () => {
      const currentBid = await retrieveLastBidAmount();
      if (currentBid) {
        setCurrentBid({
          clientId: currentBid.clientId || '',
          amount: currentBid.data.amount,
          timestamp: new Date(currentBid.data.timestamp)
        });
      } else {
        setCurrentBid(null);
      }
    };

    fetchLastBidAmount();
  }, [channel]);

  const handleBid = () => {
    if (!bidAmount) {
      alert("Please enter a valid bid amount.");
      return;
    }

    if (currentBid !== null && bidAmount <= currentBid?.amount) {
      alert("Bid amount must be greater than the current bid.");
      return;
    }

    publish("bid", { amount: bidAmount, timestamp: new Date()});
    setShowBidDialog(false);
    setBidAmount(0);
  };

  const retrieveBiddingHistory = async () => {
    try {
      const resultPage = await channel.history();
      const messages = resultPage.items;
      const filteredMessages = messages.filter(message => message.name === 'bid');

      const history = filteredMessages.slice(0, 10)
        .map(message => ({
          clientId: message.clientId || '',
          amount: message.data.amount,
          timestamp: new Date(message.data.timestamp)
        }))
        .filter(newBid => {
          return !biddingHistory.some(existingBid =>
            existingBid.clientId === newBid.clientId &&
            existingBid.amount === newBid.amount &&
            existingBid.timestamp.getTime() === newBid.timestamp.getTime()
          );
        });

      setBiddingHistory((prevHistory) => [
        ...prevHistory,
        ...history,
      ]);
    } catch (error) {
      console.error('Failed to load bidding history:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src="/assets/auction-item.png"
          alt="Auction Item"
          className="w-full object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Vintage Timepiece</h1>
          <p className="text-gray-600 mb-4">
            A rare collector's piece from the early 20th century, featuring intricate mechanical craftsmanship.
          </p>
          <button
            onClick={() => setShowBidDialog(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
          >
            Place Bid
          </button>

          {currentBid ? (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-bold mb-2">Current Bid</h2>
              <div className="flex justify-between items-center">
                <span className="font-medium">{currentBid.clientId}</span>
                <span className="text-gray-600">
                  {currentBid.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="font-bold text-lg">${currentBid.amount}</span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-bold mb-2">Current Bid</h2>
              <p className="text-gray-600">No bids yet.</p>
            </div>
          )}

          {/* Bidding History Section */}
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Bidding History</h2>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                onClick={() => retrieveBiddingHistory()}
              >
                Load History
              </button>
            </div>
            <div className="space-y-2">
              {biddingHistory.map((bid, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium w-1/3">{bid.clientId}</span>
                  <span className="text-gray-600 w-1/3 text-center">
                    {bid.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  <span className="font-bold w-1/3 text-right">${bid.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showBidDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80">
              <h3 className="text-lg font-bold mb-4">Place Your Bid</h3>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="w-full border rounded p-2 mb-4"
                placeholder="Enter bid amount"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowBidDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBid}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
