import React, { useEffect, useState } from 'react';
import { AlertHolder, AlertMessage } from '../../StyledComp';

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

  const checkVisibility = () => {
    return newAchievementEarned ? 'show' : '';
  };

  return (
    <AlertHolder {...checkVisibility}>
      <AlertMessage className='message'>{achievementMessage}</AlertMessage>
    </AlertHolder>
  );
};

export default Alerts;
