export default ProgressBar;
declare function ProgressBar({ delay, isRunning, closeToast, type, hide, className, style: userStyle, controlledProgress, progress, rtl }: {
    delay: any;
    isRunning: any;
    closeToast: any;
    type: any;
    hide: any;
    className: any;
    style: any;
    controlledProgress: any;
    progress: any;
    rtl: any;
}): JSX.Element;
declare namespace ProgressBar {
    export const propTypes: {
        /**
         * The animation delay which determine when to close the toast
         */
        delay: any;
        /**
         * Whether or not the animation is running or paused
         */
        isRunning: PropTypes.Validator<boolean>;
        /**
         * Func to close the current toast
         */
        closeToast: PropTypes.Validator<(...args: any[]) => any>;
        /**
         * Support rtl content
         */
        rtl: PropTypes.Validator<boolean>;
        /**
         * Optional type : info, success ...
         */
        type: PropTypes.Requireable<string>;
        /**
         * Hide or not the progress bar
         */
        hide: PropTypes.Requireable<boolean>;
        /**
         * Optionnal className
         */
        className: PropTypes.Requireable<string | object>;
        /**
         * Controlled progress value
         */
        progress: PropTypes.Requireable<number>;
        /**
         * Tell wether or not controlled progress bar is used
         */
        controlledProgress: PropTypes.Requireable<boolean>;
    };
    export const defaultProps: {
        type: string;
        hide: boolean;
    };
}
import PropTypes from "prop-types";
