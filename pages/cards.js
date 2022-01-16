const Cards = ({
  game, name, playerVote, roundEndVote,
}) => {
  if (!game) {
    return (<div>loading</div>);
  }

  const cards = [0, 0.5, 1, 2, 3, 5, 13, 20, 40];

  const cardText = (val) => {
    switch (val) {
      case 0.125: return (<span>&#8539;</span>);
      case 0.25: return (<span>&#188;</span>);
      case 0.5: return (<span>&#189;</span>);
      default: return val;
    }
  };

  const myPoints = game.players.find((p) => p.name === name).points;
  return (
    <div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {
          cards.map((card) => {
            const className = 'poker-card';
            let onClick = () => { playerVote(card); };
            if (myPoints === card) {
              onClick = () => { playerVote(null); };
            }
            return (
              <button
                className={className}
                onClick={onClick}
                key={card}
                type="button"
              >

                <div className="poker-card-inner">
                  {cardText(card)}
                  <div className="poker-card-number-accent left">{cardText(card)}</div>
                  <div className="poker-card-number-accent right">{cardText(card)}</div>
                </div>
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
