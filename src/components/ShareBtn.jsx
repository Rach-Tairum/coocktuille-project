import React, { useState } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ id, type }) {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const threeSeconds = 3000;

  const showMessage = () => {
    setTimeout(() => {
      setCopied(false);
    }, threeSeconds);
  };

  const copyLink = () => {
    const actualPath = history.location.pathname;
    let path = '';
    if (actualPath === '/favorite-recipes' || actualPath === '/done-recipes') {
      path = `http://localhost:3000/${type}s/${id}`;
      copy(path);
      setCopied(true);
      showMessage();
    } else {
      path = actualPath.replace('/in-progress', '');
      copy(`http://localhost:3000${path}`);
      setCopied(true);
      showMessage();
    }
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyLink }
      >
        <img src={ shareIcon } alt="Share" />
      </button>
      {copied && <p>Link copied!</p>}
    </div>
  );
}

export default ShareBtn;
ShareBtn.propTypes = {
  id: string,
  type: string,
}.isRequired;
