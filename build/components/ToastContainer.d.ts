export default ToastContainer;
declare class ToastContainer extends React.Component<any, any, any> {
    static propTypes: {
        /**
         * Set toast position
         */
        position: PropTypes.Requireable<any>;
        /**
         * Disable or set autoClose delay
         */
        autoClose: any;
        /**
         * Disable or set a custom react element for the close button
         */
        closeButton: PropTypes.Requireable<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        /**
         * Hide or not progress bar when autoClose is enabled
         */
        hideProgressBar: PropTypes.Requireable<boolean>;
        /**
         * Pause toast duration on hover
         */
        pauseOnHover: PropTypes.Requireable<boolean>;
        /**
         * Dismiss toast on click
         */
        closeOnClick: PropTypes.Requireable<boolean>;
        /**
         * Newest on top
         */
        newestOnTop: PropTypes.Requireable<boolean>;
        /**
         * An optional className
         */
        className: PropTypes.Requireable<string | object>;
        /**
         * An optional style
         */
        style: PropTypes.Requireable<object>;
        /**
         * An optional className for the toast
         */
        toastClassName: PropTypes.Requireable<string | object>;
        /**
         * An optional className for the toast body
         */
        bodyClassName: PropTypes.Requireable<string | object>;
        /**
         * An optional className for the toast progress bar
         */
        progressClassName: PropTypes.Requireable<string | object>;
        /**
         * An optional style for the toast progress bar
         */
        progressStyle: PropTypes.Requireable<object>;
        /**
         * Define enter and exit transition using react-transition-group
         */
        transition: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Support rtl display
         */
        rtl: PropTypes.Requireable<boolean>;
        /**
         * Allow toast to be draggable
         */
        draggable: PropTypes.Requireable<boolean>;
        /**
         * The percentage of the toast's width it takes for a drag to dismiss a toast
         */
        draggablePercent: PropTypes.Requireable<number>;
        /**
         * Pause the toast on focus loss
         */
        pauseOnFocusLoss: PropTypes.Requireable<boolean>;
        /**
         * Show the toast only if it includes containerId and it's the same as containerId
         */
        enableMultiContainer: PropTypes.Requireable<boolean>;
        /**
         * Set id to handle multiple container
         */
        containerId: PropTypes.Requireable<React.ReactText>;
        /**
         * Set role attribute for the toast body
         */
        role: PropTypes.Requireable<string>;
        /**
         * Fired when clicking inside toaster
         */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        position: string;
        transition: ({ children, position, preventExitTransition, ...props }: {
            [x: string]: any;
            children: any;
            position: any;
            preventExitTransition: any;
        }) => JSX.Element;
        rtl: boolean;
        autoClose: number;
        hideProgressBar: boolean;
        closeButton: JSX.Element;
        pauseOnHover: boolean;
        pauseOnFocusLoss: boolean;
        closeOnClick: boolean;
        newestOnTop: boolean;
        draggable: boolean;
        draggablePercent: number;
        className: null;
        style: null;
        toastClassName: null;
        bodyClassName: null;
        progressClassName: null;
        progressStyle: null;
        role: string;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    /**
     * Hold toast ids
     */
    state: {
        toast: never[];
    };
    /**
     * Keep reference for toastKey
     */
    toastKey: number;
    /**
     * Hold toast's informations:
     * - what to render
     * - position
     * - raw content
     * - options
     */
    collection: {};
    componentDidMount(): void;
    componentWillUnmount(): void;
    isToastActive: (id: any) => boolean;
    removeToast(id: any): void;
    dispatchChange(): void;
    makeCloseButton(toastClose: any, toastId: any, type: any): false | React.ReactSVGElement;
    getAutoCloseDelay(toastAutoClose: any): any;
    canBeRendered(content: any): boolean;
    parseClassName(prop: any): any;
    belongToContainer({ containerId }: {
        containerId: any;
    }): boolean;
    buildToast(content: any, { delay, ...options }: {
        [x: string]: any;
        delay: any;
    }): void;
    appendToast(options: any, content: any, staleToastId: any): void;
    clear(): void;
    renderToast(): JSX.Element[];
    render(): JSX.Element;
    ref: HTMLDivElement | null | undefined;
}
import React from "react";
import PropTypes from "prop-types";
