import React, { useState, useEffect, useContext, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home';
import StopwatchStats from './StopwatchStats';
import ProfileNav from './ProfileNav';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';
// import { ToggleSwitch } from '../../StyledComp';
import { ToggleSwitch } from '../../ThemeStyles';
// import { GlobalStyleLight, GlobalStyleDark } from './ThemeStyles';
import { BadgesOnUsers, Badge } from '@prisma/client';
import Addresses, { Address, SelectedAddress, HomeAddress } from './Addresses';
import Scrollers from './Scrollers';
import '../../styles.css';
import { UserContext } from '../../Root';
import { BandAid } from '../../StyledComp';
import { SocketContext } from '../../SocketContext';
import { Socket } from 'socket.io-client';
import {
  AchievementBadgeByName,
  AchievementBadgeTooltip,
  TooltipBox,
  AchievementBadge,
  AchievementBadgeAndTooltipContainer,
  AchievementBadgeHolder,
} from '../../StyledComp';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

export interface RideStats {
  activity: string;
  duration: number;
  weight: number;
  calories: number;
}

const Profile = ({ handleToggleStyle, isDark, setIsDark }) => {
  //Context
  const {
    userBadges,
    setUserBadges,
    selectedBadge,
    setSelectedBadge,
    tickBadgeCounter,
    addBadge,
    tierCheck,
  } = useContext(UserContext);
  //State values with useState hook.
  const [user, setUser] = useState('');
  const [theme, setTheme] = useState();
  const [photo, setPhoto] = useState('');
  const [greeting, setGreeting] = useState('');
  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [weightValue, setWeightValue] = useState(0);
  const [weight, setWeight] = useState(0);
  const [lastRide, setLastRide] = useState<RideStats>({
    activity: '',
    duration: 0,
    weight: 0,
    calories: 0,
  });

  //holds toggle-able value to control whether badges are displaying on profile page or not
  const [badgeDisplay, setBadgeDisplay] = useState<string>('none');
  //temporary - used for manually adding badges
  const [tier, setTier] = useState(0);
  const [inputBox, setInputBox] = useState('');

  const socket = useContext(SocketContext).socket as Socket | undefined;

  useEffect(() => {
    if (socket) {
      // Listen for incoming 'message' events
      socket.on('message', (newMessage) => {
        // Handle the incoming message
        console.log('Received message:', newMessage);
      });
    }
  }, [socket]);

  //functions

  const saveTheme = () => {
    axios.post('/profile/theme', {
      theme: isDark,
    });
  };

  // const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////
  ////// This function grabs ride stats from StopwatchStats.tsx////////////
  // const location = useLocation();
  // let stopwatchActivity = location.state && location.state.stopwatchActivity;
  // const stopwatchDuration = location.state && location.state.stopwatchDuration;
  // const stopwatchCalories = location.state && location.state.stopwatchCalories;

  // if (
  //   stopwatchActivity !== '' &&
  //   stopwatchDuration > 0 &&
  //   stopwatchCalories > 0
  // ) {
  //   rideStats.activity = stopwatchActivity;
  //   rideStats.duration = stopwatchDuration;
  //   rideStats.weight = weight;
  //   rideStats.calories = stopwatchCalories;
  // }
  //.................................................

  //show/hide badges on user profile page
  // const badgesToggle = () => {
  //   if (badgeDisplay === 'none') {
  //     setBadgeDisplay('block');
  //   } else {
  //     setBadgeDisplay('none');
  //   }
  //   document.getElementById('badges')!.style.display = badgeDisplay;
  // };

  // const displayNoBadgeIfEmpty = () => {
  //   if (
  //     selectedBadge &&
  //     selectedBadge !==
  //       'https://www.baptistpress.com/wp-content/uploads/images/IMG201310185483HI.jpg'
  //   ) {
  //     return <AchievementBadgeByName src={selectedBadge} />;
  //   }
  // };

  ///////////////////////////////////////////////////////////
  /*
Elements that should render on loading the page
Name, Weight, Thumbnail, Theme Preference, Most recent Ride
*/
  useEffect(() => {
    axios
      .get('/profile/user')
      .then(({ data }) => {
        let splitNames = data.name.split(' ');
        setUser(splitNames[0]);
        setPhoto(data.thumbnail);
        setTheme(data.theme);
        setWeight(data.weight);
        setHomeAddress(data.homeAddress);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get('/profile/weight').then(({ data }) => {
      setWeight(data.weight);
    });
    axios.get('/profile/lastRide').then(({ data }) => {
      if (data.activity === 'leisure bicycling') {
        data.activity = 'Average Speed <10 mph';
      }
      if (data.activity === 'mph, light') {
        data.activity = 'Average Speed 10-12 mph';
      }
      if (data.activity === '13.9 mph, moderate') {
        data.activity = 'Average Speed 12-14 mph';
      }
      if (data.activity === '15.9 mph, vigorous') {
        data.activity = 'Average Speed 14-16 mph';
      }
      if (data.activity === 'very fast, racing') {
        data.activity = 'Average Speed 16-19 mph';
      }
      if (data.activity === '>20 mph, racing') {
        data.activity = 'Average Speed 20+ mph';
      }
      if (data.activity === 'mountain bike') {
        data.activity = 'Mountain Biking';
      }

      setLastRide(data);
    });
  }, []);

  useEffect(() => {
    setTheme(theme);
    console.log(theme);
  }, [theme]);

  useEffect(() => {}, [inputBox]);

  useEffect(() => {}, [tier]);

  //..................................................

  return (
    <BandAid>
      <ProfileNav
        selectedBadge={selectedBadge}
        user={user}
        photo={photo}
        saveTheme={saveTheme}
        handleToggleStyle={handleToggleStyle}
        theme={theme}
        homeAddress={homeAddress}
        weightForProfileDisplay={weight}
        lastRideActivity={lastRide.activity}
        lastRideDuration={lastRide.duration}
        lastRideWeight={lastRide.weight}
        lastRideCalories={lastRide.calories}
      />

      <div>
        {/* <div style={{ position: 'absolute', marginTop: 20 }}>
        <ul>
          <li style={{ listStyleType: 'none' }}>
            {rideStats && `Your last ride was an ${rideStats.activity}`}
          </li>
          <li style={{ listStyleType: 'none' }}>
            {rideStats &&
              `You rode for ${Math.floor(rideStats.duration / 60)} hours and ${
                rideStats.duration % 60
              } minutes`}
          </li>
          <li style={{ listStyleType: 'none' }}>
            {rideStats &&
              `Your weight for this ride was ${rideStats.weight} lbs`}
          </li>
          <li style={{ listStyleType: 'none' }}>
            {rideStats && (
              <>
                You burned {rideStats.calories} calories!
                <br />
                Let's ride some more!
              </>
            )}
          </li>
        </ul>
      </div> */}
      </div>

      {/* <Scrollers theme={theme} /> */}

      {/* </div> */}
      {/* <div style={{ position: 'fixed', bottom: 100, width: '100%' }}>
        <div>Achievement Badges:</div>

        <button onClick={badgesToggle}>Show Badges</button> */}
      {/* <button
          onClick={() => {
            addBadge(inputBox, tier);
          }}
        >
          Add Badge
        </button>
        <input
          type='text'
          onChange={(event) => {
            setInputBox(event.target.value);
          }}
        ></input>
        <select
          onChange={(event) => {
            setTier(parseInt(event.target.value));
          }}
        >
          <option value={0}>No Tier</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select> */}

      <div
        id='weight'
        className='weight'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'fixed',
          bottom: 60,
          left: 0,
          right: 0,
        }}
      ></div>
      {/* </div> */}
    </BandAid>
  );
};

export default Profile;
