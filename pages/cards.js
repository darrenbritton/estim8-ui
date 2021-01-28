const Cards = ({
  game, name, playerVote, roundEndVote,
}) => {
  if (!game) {
    return (<div>loading</div>);
  }

  // const cards = [0, 0.125, 0.25, 0.5, 1, 2, 3, 5, 8, 13, 21, '?'];
  const cards = [0, 0.5, 1, 2, 3, 5, 8, 13, 21, '∞', '?', '☕️'];

  const cardText = (val) => {
    switch (val) {
      case 0.125: return (<span>&#8539;</span>);
      case 0.25: return (<span>&#188;</span>);
      case 0.5: return (<span>&#189;</span>);
      default: return (<span>{val}</span>);
    }
  };

  const myPoints = game.players.find((p) => p.name === name).points;
  return (
    <div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {
          cards.map((card) => {
            let className = 'rounded-md shadow-md text-7xl py-10 bg-white bg-gradient-to-br hover:text-white hover:from-blue-400 hover:to-blue-600 transition duration-75 ease-in-out';
            let onClick = () => { playerVote(card); };
            if (myPoints === card) {
              className = 'rounded-md shadow-md text-7xl py-10 bg-gradient-to-br from-green-400 to-green-600 hover:from-red-400 hover:to-red-800 text-white transition duration-75 ease-in-out';
              onClick = () => { playerVote(null); };
            }
            return (
              <button
                className={className}
                onClick={onClick}
                key={card}
                type="button"
              >
                {cardText(card)}
              </button>
            );
          })
        }
      </div>
      <div className="text-right mt-5">
        <button
          onClick={roundEndVote}
          className="rounded-md shadow-md py-2 px-4 bg-white bg-gradient-to-br hover:text-white hover:from-blue-400 hover:to-blue-600 transition duration-75 ease-in-out"
          type="button"
        >
          End vote
        </button>
      </div>
    </div>
  );
};

export default Cards;
