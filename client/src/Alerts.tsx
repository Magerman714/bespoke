import React, { useEffect, useState } from 'react';
// import { AlertHolder, AlertMessage } from './StyledComp';

interface AlertProps {
  achievementMessage: string;
  newAchievementEarned: boolean;
}

const Alerts = ({ achievementMessage, newAchievementEarned }: AlertProps) => {
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setVisible(false);
  //   }, 6000);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  // return (
  //   <AlertHolder className={`alert ${newAchievementEarned ? 'visible' : ''}`}>
  //     <AlertMessage className='message'>{achievementMessage}</AlertMessage>
  //   </AlertHolder>
  // );
  return <div></div>;
};

export default Alerts;
