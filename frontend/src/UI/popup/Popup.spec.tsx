import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { PopUp } from '../../app/features/popup';

it('should load and display Popup', async () => {
  render(
    <Provider store={store}>
      <PopUp />
    </Provider>
  );

  expect(screen.getByText('Popup Counter')).toBeInTheDocument();
});
