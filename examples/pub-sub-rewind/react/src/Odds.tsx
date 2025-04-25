'use client';

import { useState, useEffect } from 'react';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import minifaker from 'minifaker';
import { useLocation } from 'react-router-dom';
import 'minifaker/locales/en';

interface MatchOdds {
  match: {
    homeTeam: string;
    awayTeam: string;
    timestamp: number;
    score: string;
    matchOdds: {
      homeWin: string;
      draw: string;
      awayWin: string;
    };
  };
}

export default function MatchWrapper() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const channelName = searchParams.get('name') || 'match-odds-feed';

  const client = new Ably.Realtime({
    key: import.meta.env.VITE_ABLY_KEY,
    clientId: minifaker.firstName()
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelName} options={{ params: { rewind: '10' } }}>
        <LiveMatch channelName={channelName} />
      </ChannelProvider>
    </AblyProvider>
  );
}

function LiveMatch({ channelName }: { channelName: string }) {
  const [matchData, setMatchData] = useState<MatchOdds | null>(null);
  const [oddsHistory, setOddsHistory] = useState<MatchOdds[]>([]);

  const { channel } = useChannel(channelName, (message) => {
    if (message.name !== 'odds') return;

    setMatchData(message.data);
    setOddsHistory((prev) => [message.data, ...prev]);
  });

  useEffect(() => {
    if (!matchData) return;
    let isMounted = true;

    const updateRandomOdds = async () => {
      for (let i = 0; i < 20; i++) {
        if (!isMounted) break;

        const delay = Math.floor(Math.random() * 3000) + 2000;
        await new Promise(resolve => {
          const timeoutId = setTimeout(resolve, delay);
          return () => clearTimeout(timeoutId);
        });

        const markets = ['homeWin', 'draw', 'awayWin'];
        const numMarketsToUpdate = Math.floor(Math.random() * 3) + 1;
        const marketsToUpdate = markets.sort(() => 0.5 - Math.random()).slice(0, numMarketsToUpdate);

        const newOdds = { ...matchData };

        marketsToUpdate.forEach(market => {
          newOdds.match.matchOdds[market] = (parseFloat(newOdds.match.matchOdds[market]) + (Math.random() * 0.2 - 0.1)).toFixed(2);
        });

        newOdds.match.timestamp = Date.now();
        if (isMounted) {
          await channel.publish('odds', newOdds);
        }
      }
    };

    updateRandomOdds();

    return () => {
      isMounted = false;
    };
  }, [matchData, channel]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-sm mx-auto">
        {matchData && (
          <>
            <div className="bg-white rounded shadow p-3 mb-4">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span>
                  <span className="hidden sm:inline">{matchData.match.homeTeam}</span>
                  <span className="sm:hidden">
                    {matchData.match.homeTeam.split(' ').map(word => word[0]).join(' ')}
                  </span>
                </span>
                <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
                  {matchData.match.score}
                </span>
                <span>
                  <span className="hidden sm:inline">{matchData.match.awayTeam}</span>
                  <span className="sm:hidden">
                    {matchData.match.awayTeam.split(' ').map(word => word[0]).join(' ')}
                  </span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white rounded shadow p-2">
                <h3 className="text-xs font-medium mb-1">Home win</h3>
                <p className="text-lg font-bold text-green-600">
                  {matchData.match.matchOdds.homeWin}
                </p>
              </div>
              <div className="bg-white rounded shadow p-2">
                <h3 className="text-xs font-medium mb-1">Draw</h3>
                <p className="text-lg font-bold text-blue-600">
                  {matchData.match.matchOdds.draw}
                </p>
              </div>
              <div className="bg-white rounded shadow p-2">
                <h3 className="text-xs font-medium mb-1">Away win</h3>
                <p className="text-lg font-bold text-red-600">
                  {matchData.match.matchOdds.awayWin}
                </p>
              </div>
            </div>

            <div className="bg-white rounded shadow p-3">
              <h2 className="text-sm font-bold mb-2">Odds history</h2>
              <div className="space-y-2">
                {oddsHistory.map((odds, index) => (
                  <div key={index} className="border-b pb-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Home: {odds.match.matchOdds.homeWin}</span>
                      <span>Draw: {odds.match.matchOdds.draw}</span>
                      <span>Away: {odds.match.matchOdds.awayWin}</span>
                      <span>{new Date(odds.match.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
