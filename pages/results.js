import { PieChart } from 'react-minimal-pie-chart';
import Color from 'color';

const Results = ({ game, roundReset }) => {
  if (!game) {
    return <div>loading</div>;
  }

  const colors = [
    '533a71',
    '6184d8',
    '50c5b7',
    'f9b3d1',
    '065143',
    'ffbf00',
    'ff4242',
    '33658A',
  ];
  // game.players = [
  //   { name: "a", points: 0 },
  //   { name: "b", points: 0.5 },
  //   { name: "c", points: 1 },
  //   { name: "d", points: 3 },
  //   { name: "e", points: 5 },
  //   { name: "f", points: 13 },
  //   { name: "g", points: 20 }
  // ];
  const textColors = [];
  const scores = game.players.map((p) => p.points);
  const totalVotes = game.players.length;
  const average = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(
    2,
  );
  const lowest = Math.min(...scores);
  const highest = Math.max(...scores);
  const results = game.players
    .filter((player) => player.points !== null)
    .reduce((acc, player) => {
      let item = acc.find((i) => i.points === player.points);
      if (!item) {
        item = { points: player.points, players: [] };
        acc.push(item);
      }
      item.players.push(player.name);
      return acc;
    }, []);
  const donutData = results
    .sort((a, b) => (a.points > b.points ? 1 : -1))
    .map((res) => {
      const color = `#${colors.shift()}`;
      textColors.push({
        value: res.points,
        color,
        fadedColor: Color(color).fade(0.9).hsl(),
      });
      return {
        title: res.points,
        value: res.players.length,
        color,
      };
    });
  return (
    <div>
      <div className="results-container">
        <div className="align-middle">
          <div className="flex stats">
            <div className="stats-container">
              <div className="stats-result">{totalVotes}</div>
              <div className="stats-title">Total</div>
            </div>
            <div className="stats-container">
              <div className="stats-result">{average}</div>
              <div className="stats-title">Average</div>
            </div>
            <div className="stats-container">
              <div className="stats-result">{lowest}</div>
              <div className="stats-title">Lowest</div>
            </div>
            <div className="stats-container">
              <div className="stats-result">{highest}</div>
              <div className="stats-title">Highest</div>
            </div>
          </div>
          <div className="flex results">
            {game.players
              .sort((a, b) => (a.points > b.points ? -1 : 1))
              .map((player) => (
                <div className="results-container">
                  <span
                    style={{
                      color:
                        textColors.find((t) => t.value === player.points)
                          ?.color || 'grey',
                      backgroundColor:
                        textColors.find((t) => t.value === player.points)
                          ?.fadedColor || 'lightgrey',
                    }}
                    className="inline-flex items-center justify-center px-4 py-1 mr-2 text-md font-semibold leading-none rounded-full"
                  >
                    {player.points !== null ? player.points : '∅'}
                  </span>
                  {player.name}
                </div>
              ))}
          </div>
        </div>
        <PieChart
          className="w-80 mx-auto"
          lineWidth={20}
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={(index) => ({
            fill: donutData[index].color,
            fontSize: '8px',
            fontFamily: 'sans-serif',
          })}
          labelPosition={60}
          data={donutData}
          startAngle={270}
        />
      </div>
      <div className="text-right mt-5">
        <button
          onClick={roundReset}
          className="rounded-md shadow-md py-2 px-4 bg-white bg-gradient-to-br hover:text-white hover:from-blue-400 hover:to-blue-600 transition duration-75 ease-in-out"
          type="button"
        >
          Start vote
        </button>
      </div>
    </div>
  );
};

export default Results;
