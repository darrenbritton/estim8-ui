const Players = ({ game }) => {
  if (!game) {
    return (<div>loading</div>);
  }

  return (
    <table>
      <tbody>
        {
          game.players && game.players
            .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
            .map((player) => {
              let color = player.points !== null ? 'text-green-400' : 'text-yellow-500';
              color = `${color} text-2xl align-middle`;
              return (
                <tr key={`player:${player.name}`}>
                  <td className={color}>&bull;</td>
                  <td className="px-2 align-middle">{player.name}</td>
                </tr>
              );
            })
        }
      </tbody>
    </table>
  );
};

export default Players;
