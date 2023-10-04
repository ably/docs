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

const Card = () => {
  return (
    <div
      className="flex flex-col gap-y-3.5 flex-shrink-0 rounded-lg text-sm text-white pt-4 px-[20px] mx-auto"
      style={{ width: '19.8125rem', backgroundColor: '#141924' }}
    >
      <div className="flex flex-row justify-between ">
        <div className="self-center">Basketball</div>
        <button
          className="px-3 pt-1 pb-2"
          style={{ height: '1.86138rem', backgroundColor: '#2B303B', fontSize: '0.81438rem', borderRadius: '0.349rem' }}
        >
          Unsubscribe
        </button>
      </div>

      <section className="grid grid-cols-3 justify-between">
        <div className="flex flex-col items-center">
          <img src={etherFlyers}></img>
          <div className="font-medium" style={{ fontSize: '0.625rem' }}>Ether Flyers</div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">125 - 118</span>
          <span style={{ fontSize: '0.4375rem' }}>51-60</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={fireHawks}></img>
          <div className="font-medium" style={{ fontSize: '0.625rem' }}>Fire Hawks</div>
        </div>
      </section>

      <section className="grid grid-cols-3 justify-between">
        <div className="flex flex-col items-center">
          <img src={tenPointsClub}></img>
          <div className="font-medium" style={{ fontSize: '0.625rem' }}>Ten Points Club</div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">125 - 118</span>
          <span style={{ fontSize: '0.4375rem' }}>51-60</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={solarFlares}></img>
          <div className="font-medium" style={{ fontSize: '0.625rem' }}>Solar Flares</div>
        </div>
      </section>

      <section className="flex flex-col justify-between">
        <div className="flex flex-row py-3 borderLine">Football</div>
        <div className="flex flex-row justify-between items-center pb-4">
          <img src={football}></img>

          <button
            className="px-3 pt-0.5 pb-3.5"
            style={{ maxHeight: '1.86138rem', backgroundColor: 'white', fontSize: '0.81438rem', color: 'black', borderRadius: '0.349rem' }}
          >
            Subscribe
          </button>

          <img src={soccer}></img>

          <button className="px-3 pt-0.5 pb-3.5"
            style={{ height: '1.86138rem', backgroundColor: '#2B303B', fontSize: '0.81438rem', color: 'white', borderRadius: '0.349rem' }}
          >
            Unsubscribe
          </button>
        </div>

        <div className="grid grid-cols-3 py-1.5 greenOverlay">
          <div className="flex flex-col items-center">
            <img src={vortexUnited}></img>
            <div className="font-medium" style={{ fontSize: '0.625rem' }}>Vortex United</div>
          </div>
          <div className="justify-self-center self-center">
            <span className="font-semibold">2 - 2</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={lioners}></img>
            <div className="font-medium" style={{ fontSize: '0.625rem' }}>Lioners</div>
          </div>
        </div>

        <div className="grid grid-cols-3 py-1.5 blueOverlay">
          <div className="flex flex-col items-center">
            <img src={enemyTitans}></img>
            <div className="font-medium" style={{ fontSize: '0.625rem' }}>Enemy Titans</div>
          </div>
          <div className="justify-self-center self-center">
            <span className="font-semibold">1 - 0</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={soccerWolves}></img>
            <div className="font-medium" style={{ fontSize: '0.625rem' }}>Soccer Wolves</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
