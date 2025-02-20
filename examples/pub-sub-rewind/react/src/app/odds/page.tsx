'use client';

import { useState, useEffect } from 'react';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { faker } from '@faker-js/faker';
import { useSearchParams } from 'next/navigation';

interface MatchOdds {
  match: {
    homeTeam: string;
    awayTeam: string;
    timestamp: string;
    score: string;
    matchOdds: {
      homeWin: string;
      draw: string;
      awayWin: string;
    };
    nextGoal: {
      [key: string]: string;
    };
  };
}

export default function MatchWrapper() {
  const searchParams = useSearchParams();
  const channelName = searchParams.get('name') || 'match-odds-feed';

  const client = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_KEY,
    clientId: faker.person.firstName()
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

        const markets = ['homeWin', 'draw', 'awayWin', 'nextGoal'];
        const numMarketsToUpdate = Math.floor(Math.random() * 3) + 1;
        const marketsToUpdate = markets.sort(() => 0.5 - Math.random()).slice(0, numMarketsToUpdate);

        const newOdds = { ...matchData };

        marketsToUpdate.forEach(market => {
          if (market === 'nextGoal') {
            const team = Object.keys(newOdds.match.nextGoal)[Math.floor(Math.random() * 3)];
            newOdds.match.nextGoal[team] = (parseFloat(newOdds.match.nextGoal[team]) + (Math.random() * 0.2 - 0.1)).toFixed(2);
          } else {
            newOdds.match.matchOdds[market] = (parseFloat(newOdds.match.matchOdds[market]) + (Math.random() * 0.2 - 0.1)).toFixed(2);
          }
        });

        newOdds.match.timestamp = new Date().toISOString();
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {matchData && (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>
                  <span className="hidden sm:inline">{matchData.match.homeTeam}</span>
                  <span className="sm:hidden">
                    {matchData.match.homeTeam.split(' ').map(word => word[0]).join(' ')}
                  </span>
                </span>
                <span className="bg-gray-800 text-white px-4 py-2 rounded">
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

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-2">Home Win</h3>
                <p className="text-3xl font-bold text-green-600">
                  {matchData.match.matchOdds.homeWin}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-2">Draw</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {matchData.match.matchOdds.draw}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-2">Away Win</h3>
                <p className="text-3xl font-bold text-red-600">
                  {matchData.match.matchOdds.awayWin}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Next Goal</h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(matchData.match.nextGoal).map(([team, odds]) => (
                  <div key={team} className="bg-gray-50 p-4 rounded">
                    <h3 className="font-medium mb-2">{team}</h3>
                    <p className="text-2xl font-bold">{odds}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Odds Movement History</h2>
              <div className="space-y-4">
                {oddsHistory.map((odds, index) => (
                  <div key={index} className="border-b pb-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Home: {odds.match.matchOdds.homeWin}</span>
                      <span>Draw: {odds.match.matchOdds.draw}</span>
                      <span>Away: {odds.match.matchOdds.awayWin}</span>
                      <span>{new Date(odds.match.timestamp).toLocaleTimeString()}</span>
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
