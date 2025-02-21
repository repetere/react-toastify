/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Toast from './../../components/Toast';
import ToastContainer from './../../components/ToastContainer';
import CloseButton from './../../components/CloseButton';
import ProgressBar from './../../components/ProgressBar';
import { RT_NAMESPACE } from '../../utils';
const REQUIRED_PROPS = {
    ...ToastContainer.defaultProps,
    closeToast: () => { },
    type: 'default'
};
describe('Toast', () => {
    it('Should merge container and body className', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { autoClose: false, className: "container-class", bodyClassName: "body-class" }), "FooBar"));
        expect(component.find('.container-class')).toHaveLength(1);
        expect(component.find('.body-class')).toHaveLength(1);
    });
    it('Should support Rtl display', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { autoClose: false, rtl: true }), "FooBar"));
        expect(component).toMatchSnapshot();
    });
    it('Should not render ProgressBar if autoClose prop is set to false', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { autoClose: false }), "FooBar"));
        expect(component.children().find(ProgressBar).length).toBe(0);
    });
    it('Should not render closeButton if closeButton prop is set to false', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { closeButton: false }), "FooBar"));
        expect(component.children().find(CloseButton).length).toBe(0);
    });
    it('Can call onOpen callback when component mount', () => {
        const onOpen = jest.fn();
        mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { onOpen: onOpen }), "FooBar")).render();
        expect(onOpen).toHaveBeenCalled();
    });
    it('Can call onClose callback when component will unmount', () => {
        const onClose = jest.fn();
        const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { onClose: onClose }), "FooBar"));
        component.unmount();
        expect(onClose).toHaveBeenCalled();
    });
    it('Can pause toast delay on mouse enter', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
        expect(component.instance().state.isRunning).toBeTruthy();
        component
            .find('div')
            .first()
            .simulate('mouseEnter');
        expect(component.instance().state.isRunning).toBeFalsy();
    });
    it('Can keep runing on mouse enter', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { pauseOnHover: false }), "FooBar"));
        expect(component.state('isRunning')).toBeTruthy();
        component
            .find('div')
            .first()
            .simulate('mouseEnter');
        expect(component.state('isRunning')).toBeTruthy();
    });
    it('Should resume toast delay on mouse leave', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
        expect(component.state('isRunning')).toBeTruthy();
        component
            .find('div')
            .first()
            .simulate('mouseEnter');
        expect(component.state('isRunning')).toBeFalsy();
        component
            .find('div')
            .first()
            .simulate('mouseLeave');
        expect(component.state('isRunning')).toBeTruthy();
    });
    it('Should not call setState if autoClose prop is false', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { autoClose: false }), "FooBar"));
        expect(component.state('isRunning')).toBeTruthy();
        component.simulate('mouseEnter');
        expect(component.state('isRunning')).toBeTruthy();
    });
    it('Should pause Toast on window blur and resume Toast on focus', () => {
        const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
        expect(component.state('isRunning')).toBe(true);
        let ev = new Event('blur');
        window.dispatchEvent(ev);
        expect(component.state('isRunning')).toBe(false);
        ev = new Event('focus');
        window.dispatchEvent(ev);
        expect(component.state('isRunning')).toBe(true);
    });
    it('Should bind or unbind dom events when `pauseOnFocusLoss` and `draggable` props are updated', () => {
        const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
        document.removeEventListener = jest.fn();
        window.removeEventListener = jest.fn();
        component.setProps({
            draggable: false,
            pauseOnFocusLoss: false
        });
        expect(document.removeEventListener).toHaveBeenCalled();
        expect(window.removeEventListener).toHaveBeenCalled();
        document.addEventListener = jest.fn();
        window.addEventListener = jest.fn();
        component.setProps({
            draggable: true,
            pauseOnFocusLoss: true
        });
        expect(document.removeEventListener).toHaveBeenCalled();
        expect(window.removeEventListener).toHaveBeenCalled();
    });
    it('Should render toast with controlled progress bar', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { progress: 0.3, controlledProgress: true }), "FooBar"));
        expect(component.html()).toMatch(/transform:(\s)?scaleX\(0.3\)/);
    });
    it('Should render toast with controlled progress bar even if autoClose is false', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { progress: 0.3, autoClose: false, controlledProgress: true }), "FooBar"));
        expect(component.html()).toMatch(/transform:(\s)?scaleX\(0.3\)/);
    });
    it('Should close the toast if progress value is >= 1', () => {
        const closeToast = jest.fn();
        const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { closeToast: closeToast, progress: 0.3, controlledProgress: true }), "FooBar"));
        expect(component.html()).toMatch(/transform:(\s)?scaleX\(0.3\)/);
        component.setProps({ progress: 1 });
        expect(component.html()).toMatch(/transform:(\s)?scaleX\(1\)/);
        component
            .find(`.${RT_NAMESPACE}__progress-bar--controlled`)
            .simulate('transitionEnd');
        expect(closeToast).toHaveBeenCalled();
    });
    it('Should add the role prop to the toast body', () => {
        const component = shallow(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS, { role: "status" }), "FooBar"));
        expect(component.find(`.${RT_NAMESPACE}__toast-body`).prop('role')).toEqual('status');
    });
    describe('Drag event', () => {
        it('Should handle drag start on mousedown', () => {
            const events = {};
            document.addEventListener = (ev, cb) => (events[ev] = cb);
            const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
            expect(component.instance().flag.canDrag).toBe(false);
            component.simulate('mousedown');
            expect(component.instance().flag.canDrag).toBe(true);
            events.mouseup({
                targetTouches: {},
                clientX: 100
            });
            expect(component.instance().flag.canDrag).toBe(false);
        });
        it('Should handle drag start on touchstart', () => {
            const events = {};
            document.addEventListener = (ev, cb) => (events[ev] = cb);
            const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
            expect(component.instance().flag.canDrag).toBe(false);
            component.simulate('touchstart');
            expect(component.instance().flag.canDrag).toBe(true);
            events.touchend({
                targetTouches: [
                    {
                        clientX: 100
                    }
                ]
            });
            expect(component.instance().flag.canDrag).toBe(false);
        });
        it('Should pause toast duration on drag move', () => {
            const events = {};
            document.addEventListener = (ev, cb) => (events[ev] = cb);
            const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
            expect(component.state('isRunning')).toBe(true);
            // to set flags
            component.simulate('mousedown');
            events.mousemove({
                targetTouches: {},
                clientX: 100
            });
            expect(component.state('isRunning')).toBe(false);
        });
        it('Should disable exit transition when removed while draging', () => {
            const events = {};
            document.addEventListener = (ev, cb) => (events[ev] = cb);
            const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
            expect(component.state('preventExitTransition')).toBe(false);
            // to set flags
            component.simulate('mousedown');
            // trigger toast removal
            component.instance().drag.deltaX = 1;
            component.instance().drag.removalDistance = 0;
            events.mouseup({
                targetTouches: {},
                clientX: 100
            });
            expect(component.state('preventExitTransition')).toBe(true);
        });
        it('Should prevent the timer from running on drag end if the mouse hover the toast', () => {
            const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
            expect(component.state('isRunning')).toBe(true);
            // BoundingClientRect for Position top right
            component.instance().boundingRect = {
                top: 20,
                right: 846,
                bottom: 84,
                left: 534
            };
            // Cursor inside the toast
            component.instance().drag = {
                x: 600,
                y: 30
            };
            component.instance().onDragTransitionEnd();
            expect(component.state('isRunning')).toBe(false);
        });
        it('Should resume the timer on drag end if the mouse is not hovering the toast', () => {
            const component = mount(React.createElement(Toast, Object.assign({}, REQUIRED_PROPS), "FooBar"));
            expect(component.state('isRunning')).toBe(true);
            // BoundingClientRect for Position top right
            component.instance().boundingRect = {
                top: 20,
                right: 846,
                bottom: 84,
                left: 534
            };
            // Cursor outside the toast
            component.instance().drag = {
                x: 400,
                y: 30
            };
            component.instance().onDragTransitionEnd();
            expect(component.state('isRunning')).toBe(true);
        });
    });
});
