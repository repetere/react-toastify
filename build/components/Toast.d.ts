export default Toast;
declare class Toast extends React.Component<any, any, any> {
    static propTypes: {
        closeButton: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        autoClose: any;
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        closeToast: PropTypes.Validator<(...args: any[]) => any>;
        position: PropTypes.Validator<any>;
        pauseOnHover: PropTypes.Validator<boolean>;
        pauseOnFocusLoss: PropTypes.Validator<boolean>;
        closeOnClick: PropTypes.Validator<boolean>;
        transition: PropTypes.Validator<(...args: any[]) => any>;
        rtl: PropTypes.Validator<boolean>;
        hideProgressBar: PropTypes.Validator<boolean>;
        draggable: PropTypes.Validator<boolean>;
        draggablePercent: PropTypes.Validator<number>;
        in: PropTypes.Requireable<boolean>;
        onExited: PropTypes.Requireable<(...args: any[]) => any>;
        onOpen: PropTypes.Requireable<(...args: any[]) => any>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        type: PropTypes.Requireable<any>;
        className: PropTypes.Requireable<string | object>;
        bodyClassName: PropTypes.Requireable<string | object>;
        progressClassName: PropTypes.Requireable<string | object>;
        progressStyle: PropTypes.Requireable<object>;
        progress: PropTypes.Requireable<number>;
        updateId: PropTypes.Requireable<React.ReactText>;
        ariaLabel: PropTypes.Requireable<string>;
        containerId: PropTypes.Requireable<React.ReactText>;
        role: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        type: string;
        in: boolean;
        onOpen: () => void;
        onClose: () => void;
        className: null;
        bodyClassName: null;
        progressClassName: null;
        updateId: null;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    state: {
        isRunning: boolean;
        preventExitTransition: boolean;
    };
    flag: {
        canCloseOnClick: boolean;
        canDrag: boolean;
    };
    drag: {
        start: number;
        x: number;
        y: number;
        deltaX: number;
        removalDistance: number;
    };
    boundingRect: any;
    ref: any;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    bindFocusEvents(): void;
    unbindFocusEvents(): void;
    bindDragEvents(): void;
    unbindDragEvents(): void;
    pauseToast: () => void;
    playToast: () => void;
    onDragStart: (e: any) => void;
    onDragMove: (e: any) => void;
    onDragEnd: (e: any) => void;
    onDragTransitionEnd: () => void;
    onExitTransitionEnd: () => void;
    render(): JSX.Element;
}
import React from "react";
import PropTypes from "prop-types";
