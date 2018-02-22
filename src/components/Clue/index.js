import React from 'react';

export const Clue = ({onClick, className, children, clue}) =>

<div> 
  <label className="clue-target">{clue}</label>
  <button onClick={onClick} className={className} type="button">
    Help !
  </button>
</div>