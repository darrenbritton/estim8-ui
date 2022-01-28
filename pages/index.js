import { useEffect, useState } from 'react';
import Head from 'next/head';
import Cards from './cards';
import Logo from './logo';
import Login from './login';
import Players from './players';
import Results from './results';

const Index = () => {
  const [ws, setWs] = useState(null);
  const [game, setGame] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (!ws) {
      setWs(new WebSocket('wss://poker-server.home.darrenbritton.com'));
    }
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (e) => {
        setGame(JSON.parse(e.data));
      };
    }
  }, [ws]);

  const sendMessage = (data) => {
    ws.send(JSON.stringify(data));
  };

  const playerAdd = () => {
    if (name !== '') {
      sendMessage({
        type: 'PLAYER_ADD',
        name,
      });
    }
  };

  const playerVote = (p) => {
    sendMessage({
      type: 'PLAYER_VOTE',
      name,
      points: p,
    });
  };

  const roundReset = () => {
    sendMessage({
      type: 'ROUND_RESET',
    });
  };

  const roundEndVote = () => {
    sendMessage({
      type: 'ROUND_END_VOTE',
    });
  };

  const gameNew = () => {
    if (window.confirm('Do you really want to kick everyone from the game?')) {
      sendMessage({
        type: 'GAME_NEW',
      });
    }
  };

  if (!game) {
    return (<div>loading...</div>);
  }

  let mainPanel;

  if (game && game.players && game.players.find((p) => p.name === name)) {
    if (game.voting) {
      mainPanel = (
        <Cards
          game={game}
          name={name}
          playerVote={playerVote}
          roundEndVote={roundEndVote}
        />
      );
    } else {
      mainPanel = (
        <Results
          game={game}
          roundReset={roundReset}
        />
      );
    }
  } else {
    mainPanel = (
      <Login
        playerAdd={playerAdd}
        setName={setName}
      />
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>estim8 | Poker planning</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-20">
            <Logo height="30" />
            <div className="text-left mb-2 text-white montserrat px-1">
              <div>
                <span className="text-3xl font-extralight">estim</span>
                <span className="text-2xl font-light">8</span>
              </div>
              <div className="text-gray-200 text-xs tracking-widest font-thin -mt-1">PLANNING POKER</div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container below-fold-container mx-auto">
        <div className="flex space-x-4 my-10">
          <div className="w-3/4 bg-white rounded-xl px-4 py-4">
            {mainPanel}
          </div>
          <div className="w-1/4 bg-white rounded-xl px-4 py-4">
            <span className="text-lg leading-6 font-medium text-gray-900">Players</span>
            <Players game={game} />
          </div>
        </div>
      </div>
      <div className="text-center text-xs p-2">
        Made by
        {' '}
        <a href="https://github.com/fabrice404" target="_blank" rel="noreferrer" className="text-pink-400">Fabrice Lamant</a>
        {' '}
        with
        {' '}
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer" className="text-yellow-400">Next.js</a>
        {' '}
        and
        {' '}
        <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer" className="text-blue-400">Tailwind CSS</a>
        {' | '}
        <button onClick={() => { gameNew(); }} type="button">reset game</button>
      </div>
    </div>
  );
};

export default Index;
