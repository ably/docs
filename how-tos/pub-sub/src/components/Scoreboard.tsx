import { useState } from 'react';
import { subscribeToBasketball, unsubscribeFromBasketball } from '../basketballSubscriber';

import lioners from '../assets/lioners.svg';
import vortexUnited from '../assets/vortex-united.svg';
import soccer from '../assets/soccer.svg';
import football from '../assets/football.svg';
import enemyTitans from '../assets/enemy-titans.svg';
import soccerWolves from '../assets/soccer-club.svg';
import etherFlyers from '../assets/ether-flyers.svg';
import fireHawks from '../assets/fire-hawks.svg';
import solarFlares from '../assets/solar-flares.svg';
import tenPointsClub from '../assets/ten-points-club.svg';

const Scoreboard = () => {
  const [subscribedChannels, setSubscribedChannels] = useState([]);

  const [basketballScores, setBasketballScores] = useState({});

  const handleBasketballSubscribe = () => {
    subscribeToBasketball(setSubscribedChannels, setBasketballScores);
  };

  const handleBasketballUnsubscribe = () => {
    unsubscribeFromBasketball(setSubscribedChannels);
  };

  const isSubscribed = (channelName) => {
    return subscribedChannels.includes(channelName);
  };

  return (
    <div className="scoreboard">
      <div className="header">
        <span>Basketball</span>
        {isSubscribed('basketball') ? (
          <button className="unsubscribe" onClick={handleBasketballUnsubscribe}>Unsubscribe</button>
        ) : (
          <button className="subscribe" onClick={handleBasketballSubscribe}>Subscribe</button>
        )}
      </div>

      <section className="game">
        <div className="team">
          <img src={etherFlyers}></img>
          <span>Ether Flyers</span>
        </div>
        <div className="score">
          <span>{basketballScores['match-1'] || `0 - 0`}</span>
        </div>
        <div className="team">
          <img src={fireHawks}></img>
          <span>Fire Hawks</span>
        </div>
      </section>

      <section className="game">
        <div className="team">
          <img src={tenPointsClub}></img>
          <span>Ten Points Club</span>
        </div>
        <div className="score">
          <span>{basketballScores['match-2'] || `0 - 0`}</span>
        </div>
        <div className="team">
          <img src={solarFlares}></img>
          <span>Solar Flares</span>
        </div>
      </section>

      <hr />

      <div className="header">
        <span>Football</span>
      </div>

      <section className="leagues">
        <div className="league">
          <img src={football}></img>
          <button className="subscribe">Subscribe</button>
        </div>

        <div className="league">
          <img src={soccer}></img>
          <button className="unsubscribe">Unsubscribe</button>
        </div>
      </section>

      <section className="game overlay-green">
        <div className="team">
          <img src={vortexUnited}></img>
          <span>Vortex United</span>
        </div>
        <div className="score">
          <span>2 - 2</span>
        </div>
        <div className="team">
          <img src={lioners}></img>
          <span>Lioners</span>
        </div>
      </section>

      <section className="game overlay-blue">
        <div className="team">
          <img src={enemyTitans}></img>
          <span>Enemy Titans</span>
        </div>
        <div className="score">
          <span>1 - 0</span>
        </div>
        <div className="team">
          <img src={soccerWolves}></img>
          <span>Soccer Wolves</span>
        </div>
      </section>
    </div>
  );
};

export default Scoreboard;
