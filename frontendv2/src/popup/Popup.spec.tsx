import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Popup from './Popup';
import { UsePopupModel } from './PopupModel';
import React from 'react';

describe('Popup', () => {
  it('should be rendered', async () => {
    render(
      <UsePopupModel>
          <Popup />
      </UsePopupModel>
  );  
  });
});
