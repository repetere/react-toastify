import React from 'react';
import { Transition } from 'react-transition-group';
import { NOOP } from './constant';
export function cssTransition({ enter, exit, duration = 750, appendPosition = false }) {
    return function Animation({ children, position, preventExitTransition, ...props }) {
        const enterClassName = appendPosition ? `${enter}--${position}` : enter;
        const exitClassName = appendPosition ? `${exit}--${position}` : exit;
        let enterDuration, exitDuration;
        if (Array.isArray(duration) && duration.length === 2) {
            [enterDuration, exitDuration] = duration;
        }
        else {
            enterDuration = exitDuration = duration;
        }
        const onEnter = node => {
            node.classList.add(enterClassName);
            node.style.animationFillMode = 'forwards';
            node.style.animationDuration = `${enterDuration * 0.001}s`;
        };
        const onEntered = node => {
            node.classList.remove(enterClassName);
            node.style.cssText = '';
        };
        const onExit = node => {
            node.classList.add(exitClassName);
            node.style.animationFillMode = 'forwards';
            node.style.animationDuration = `${exitDuration * 0.001}s`;
        };
        return (React.createElement(Transition, Object.assign({}, props, { timeout: preventExitTransition
                ? 0
                : {
                    enter: enterDuration,
                    exit: exitDuration
                }, onEnter: onEnter, onEntered: onEntered, onExit: preventExitTransition ? NOOP : onExit }), children));
    };
}
