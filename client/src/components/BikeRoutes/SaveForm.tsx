import React, { useContext } from 'react';
import {
  PopoutSaveForm,
  InputLayout,
  CategorySelector,
  OptionsDiv,
  PrivacySelector,
} from '../../StyledComp';
import Button from '@mui/material/Button';
import '../../styles.css';
import { SaveProps } from './RouteM';
import { UserContext } from '../../Root';

const SaveForm = ({
  routeName,
  setRouteName,
  category,
  setCategory,
  isPrivate,
  setIsPrivate,
  setOpenPopup,
  directions,
  saveRoute,
  setSaveMessage,
}: SaveProps) => {
  const { isDark } = useContext(UserContext);

  const handleSave = () => {
    saveRoute(routeName, category, isPrivate);
    setRouteName('');
    setCategory('');
    setIsPrivate(false);
    setOpenPopup(false);
  };

  return (
    <div>
      <PopoutSaveForm>
        <header
          className='centered-header-Save'
          style={{ color: isDark ? '#ececec' : '#000000' }}
        >
          Save Route
        </header>
        <InputLayout
          isDark={isDark}
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          type='text'
          maxLength='10'
          placeholder='Enter Name of Route...'
          secondary
        />
        <OptionsDiv>
          <div className='route-options'>
            <CategorySelector
              isDark={isDark}
              defaultValue='None'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option
                disabled
                style={{ color: isDark ? '#ffffff' : '#000000' }}
              >
                None
              </option>
              <option style={{ color: isDark ? '#ececec' : '#000000' }}>
                Casual
              </option>
              <option style={{ color: isDark ? '#ececec' : '#000000' }}>
                Speedy
              </option>
              <option style={{ color: isDark ? '#ececec' : '#000000' }}>
                Scenic
              </option>
            </CategorySelector>
            <PrivacySelector isDark={isDark}>
              <div id='set-private'>Private?</div>
              <input
                type='checkbox'
                onClick={() => (setIsPrivate(true), console.log(isPrivate))}
              />
            </PrivacySelector>
          </div>
          <Button
            variant='contained'
            onClick={() => handleSave()}
            sx={{
              marginTop: '15px',
              backgroundColor: '#2e7d32',
              '&:hover': {
                backgroundColor: '#2e7d32',
              },
              '&:active': {
                backgroundColor: '#2e7d32',
              },
              color: '#ececec',
              height: '30px',
            }}
          >
            Save
          </Button>
        </OptionsDiv>
      </PopoutSaveForm>
    </div>
  );
};

export default SaveForm;
