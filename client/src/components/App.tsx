import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import { StopwatchTime } from '../Root';
// import Stopwatch from './Stopwatch';

export interface AppProps {
  triggerAlert: (message: string) => undefined;
}

//We will eventually use Link to allow us to create clickable routing
const App = ({ triggerAlert }: AppProps) => {
  // const [stopwatchState, setStopwatchState] =
  // useState<StopwatchTime>({ hours: 0, minutes: 0, seconds: 0 });

  return (
    <div>
      <div>
        <button
          onClick={() => {
            triggerAlert('TEST MESSAGE FOR ALERT');
          }}
        >
          Test Alert
        </button>
        <Navbar />
      </div>
      <div>
        {/* <Stopwatch stopwatchState={stopwatchState} setStopwatchState={setStopwatchState} /> */}
      </div>
    </div>
  );
};

export default App;
