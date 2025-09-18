import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { config } from './config';
import './styles/styles.css';
import AuctionRoom from './Auction';
import Home from './Home';

export default function App() {
  const client = new Ably.Realtime({
    key: config.ABLY_KEY,
    clientId: minifaker.firstName(),
  });

  const channelName = config.CHANNEL_NAME || 'pub-sub-history';

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelName}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auction" element={<AuctionRoom />} />
          </Routes>
        </BrowserRouter>
      </ChannelProvider>
    </AblyProvider>
  );
}
