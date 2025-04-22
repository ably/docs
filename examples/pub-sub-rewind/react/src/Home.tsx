'use client'

import * as Ably from 'ably';
import minifaker from 'minifaker';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import 'minifaker/locales/en';

export default function Home() {
  const [alerts, setAlerts] = useState<Array<{id: number, message: string}>>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const channelName = searchParams.get('name') || 'pub-sub-rewind';

  const preloadOddsHistory = async () => {
    setIsLoading(true);
    const clientId = minifaker.firstName();
    const client = new Ably.Realtime({
      key: import.meta.env.VITE_ABLY_KEY,
      clientId,
    });

    const channel = client.channels.get(channelName);
    const homeTeam = "Royal Knights";
    const awayTeam = "North Rangers";

    let currentOdds = {
      match: {
        homeTeam,
        awayTeam,
        timestamp: Date.now(),
        score: "0-0",
        matchOdds: {
          homeWin: "2.45",
          draw: "3.25",
          awayWin: "2.85"
        },
      }
    };

    for (let i = 0; i < 10; i++) {
      const markets = ['homeWin', 'draw', 'awayWin'];
      const numMarketsToUpdate = Math.floor(Math.random() * 2) + 1;
      const marketsToUpdate = markets.sort(() => 0.5 - Math.random()).slice(0, numMarketsToUpdate);

      marketsToUpdate.forEach(market => {
        currentOdds.match.matchOdds[market] = (parseFloat(currentOdds.match.matchOdds[market]) + (Math.random() * 0.2 - 0.1)).toFixed(2);
      });

      currentOdds.match.timestamp = Date.now();
      await channel.publish('odds', currentOdds);

      const alertId = Date.now();
      const alertMessage = `Update ${i + 1}/10: New odds published`;
      setAlerts(prev => [...prev, { id: alertId, message: alertMessage }]);

      setTimeout(() => {
        setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      }, 2000);

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsLoading(false);
    navigate(`/odds?name=${encodeURIComponent(channelName)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-6 text-center">Live odds</h2>
        <p>Simulate 10 betting odds for a sports game before attaching.</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => preloadOddsHistory()}
            disabled={isLoading}
            className={`
              uk-btn uk-btn-primary uk-border-rounded-right whitespace-nowrap
              ${isLoading
                ? ' uk-btn-secondary cursor-not-allowed'
                : ' uk-btn-primary'}
            `}
          >
            {isLoading ? 'Loading...' : 'Load Live Match Odds'}
          </button>
        </div>
      </div>
      {alerts.map(alert => (
        <div
          key={alert.id}
          className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500"
        >
          {alert.message}
        </div>
      ))}
    </div>
  );
}
