import React from 'react';

import './HelloWorld.scss';
import Button from 'react-bootstrap/lib/Button';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

export default function HelloWorld(_) {
  return (
    <Jumbotron>
      <h1>Hello, world!</h1>
      <p>Simple jumbotron-style component for calling extra attention to featured content.</p>
      <p><Button bsStyle="primary">Learn more</Button></p>
    </Jumbotron>
  );
}
