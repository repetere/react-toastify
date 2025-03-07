/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import CloseButton from './../../components/CloseButton';
const closeToast = jest.fn();
describe('CloseButton', () => {
    it('Should call closeToast on click', () => {
        const component = shallow(React.createElement(CloseButton, { closeToast: closeToast }));
        expect(closeToast).not.toHaveBeenCalled();
        component.simulate('click', { stopPropagation: () => undefined });
        expect(closeToast).toHaveBeenCalled();
    });
});
