/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { cssTransition } from './../../utils';
describe('cssTransition helper', () => {
    it('Should return a valid react node', () => {
        const Transition = cssTransition({
            enter: 'foo',
            exit: 'bar',
            duration: [100, 200]
        });
        const children = () => React.createElement("div", null, "Plop");
        const component = shallow(React.createElement(Transition, null, children));
        expect(component).toHaveLength(1);
    });
});
