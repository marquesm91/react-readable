import React from 'react';

const Icon = ({ name, options, style, onClick }) => (
  <i
    className={`fa fa-${name} ${options}`}
    style={{ ...style }}
    onClick={onClick}
  ></i>
);

export { Icon };
