import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const LENGTH = 'length';
const ALPHABETIC = 'alphabetic';

const queryOptions = {
  numeric: [LENGTH],
  string: [ALPHABETIC],
};

export const App = () => {
  const [sortBy, setSortBy] = useState(null);
  const [sortByReverse, setSortByReverse] = useState(null);
  const [shownGoods, setShownGoods] = useState([...goodsFromServer]);

  const handleOrganizedGoods = (goods, { sortedByType, sortedByContent }) => {
    const organizedGoodsBy = [...goods];

    if (sortedByType && sortedByContent) {
      organizedGoodsBy.sort((good1, good2) => {
        switch (sortedByType && sortedByContent) {
          case sortedByType === 'numeric' &&
            queryOptions[sortedByType].find(
              content => content === sortedByContent,
            ):
            return good1.length - good2.length;

          case sortedByType === 'string' &&
            queryOptions[sortedByType].find(
              content => content === sortedByContent,
            ):
            return good1.localeCompare(good2);

          default:
            return 0;
        }
      });
    }

    if (sortByReverse !== null) {
      setSortByReverse(null);
    }

    setSortBy(sortedByContent);

    setShownGoods(organizedGoodsBy);
  };

  const handleReversedGoods = () => {
    const reverse = shownGoods.reverse();

    if (sortByReverse !== null) {
      setSortByReverse(null);

      return setShownGoods(shownGoods);
    }

    setSortByReverse('reverse');

    return setShownGoods(reverse);
  };

  const handleResetGoods = () => {
    setSortBy(null);
    setSortByReverse(null);

    return setShownGoods([...goodsFromServer]);
  };

  const listGoods = () =>
    shownGoods.map(shownGood => (
      <li key={shownGood} data-cy="Good">
        {shownGood}
      </li>
    ));

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!sortByReverse && sortBy === ALPHABETIC ? '' : 'is-light'}`}
          onClick={() =>
            handleOrganizedGoods(goodsFromServer, {
              sortedByType: 'string',
              sortedByContent: ALPHABETIC,
            })
          }
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${!sortByReverse && sortBy === LENGTH ? '' : 'is-light'}`}
          onClick={() =>
            handleOrganizedGoods(goodsFromServer, {
              sortedByType: 'numeric',
              sortedByContent: LENGTH,
            })
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortByReverse ? '' : 'is-light'}`}
          onClick={handleReversedGoods}
        >
          Reverse
        </button>

        {(sortBy !== null || sortByReverse !== null) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleResetGoods()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>{listGoods()}</ul>
    </div>
  );
};
