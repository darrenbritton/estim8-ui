import { PieChart } from 'react-minimal-pie-chart';

const Results = ({ game, roundReset }) => {
  if (!game) {
    return (<div>loading</div>);
  }

  const colors = ['#ffc907', '#ec018c', '#2488c9', '#e03d26', '#2488c9', '#20abdb', '#2d3485'];
  const results = game.players
    .filter((player) => player.points)
    .reduce((acc, player) => {
      let item = acc.find((i) => i.points === player.points);
      if (!item) {
        item = { points: player.points, players: [] };
        acc.push(item);
      }
      item.players.push(player.name);
      return acc;
    }, []);
  const donutData = results.sort((a, b) => (a.points > b.points ? 1 : -1))
    .map((res) => ({
      title: res.points,
      value: res.players.length,
      color: colors.shift(),
    }));

  return (
    <div>
      <div className="flex space-x-4">
        <div className="w-1/3 align-middle">
          <table className="table-auto w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-4 py-2 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase">
                  Pts
                </th>
                <th scope="col" className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  Players
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                results.sort((a, b) => (a.points > b.points ? 1 : -1))
                  .map((result) => (
                    <tr key={`result:${results.points}`}>
                      <td className="px-4 py-2 text-center whitespace-nowrap">
                        {result.points}
                      </td>
                      <td className="px-4 py-2">
                        {result.players.sort().map((p) => p).join(', ')}
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
        <div className="w-2/3 p-10">
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
