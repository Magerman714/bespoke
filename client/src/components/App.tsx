import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import { StopwatchTime } from '../Root';
// import Stopwatch from './Stopwatch';
import Alerts from './Alerts';

export interface AppProps {
  triggerAlert: (message: string) => undefined;
  achievementMessage: string;
  newAchievementEarned: boolean;
}

//We will eventually use Link to allow us to create clickable routing
const App = ({
  triggerAlert,
  achievementMessage,
  newAchievementEarned,
}: AppProps) => {
  // const [stopwatchState, setStopwatchState] =
  // useState<StopwatchTime>({ hours: 0, minutes: 0, seconds: 0 });

  return (
    <div>
      <div>
        <Navbar />
        <button
          style={{ zIndex: 2000 }}
          onClick={() => {
            triggerAlert(achievementMessage);
          }}
        >
          Test Alert
        </button>
      </div>
      <div>
        {/* <Stopwatch stopwatchState={stopwatchState} setStopwatchState={setStopwatchState} /> */}
      </div>
    </div>
  );
};

export default App;
