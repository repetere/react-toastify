export default CloseButton;
declare function CloseButton({ closeToast, type, ariaLabel }: {
    closeToast: any;
    type: any;
    ariaLabel: any;
}): JSX.Element;
declare namespace CloseButton {
    export namespace propTypes {
        export const closeToast: PropTypes.Requireable<(...args: any[]) => any>;
        export const arialLabel: PropTypes.Requireable<string>;
    }
    export namespace defaultProps {
        export const ariaLabel: string;
    }
}
import PropTypes from "prop-types";
