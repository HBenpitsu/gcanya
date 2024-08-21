import { render } from '@testing-library/react';
import Popup from './Popup';

describe('Popup', () => {
  it('should be rendered', async () => {
    render(<Popup />);  
  });
});
