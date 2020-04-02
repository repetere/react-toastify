import React from 'react';
import PropTypes from 'prop-types';
import { RT_NAMESPACE } from '../utils';
function CloseButton({ closeToast, type, ariaLabel }) {
    return (React.createElement("button", { className: `${RT_NAMESPACE}__close-button ${RT_NAMESPACE}__close-button--${type}`, type: "button", onClick: e => {
            e.stopPropagation();
            closeToast(e);
        }, "aria-label": ariaLabel }, "\u2716\uFE0E"));
}
CloseButton.propTypes = {
    closeToast: PropTypes.func,
    arialLabel: PropTypes.string
};
CloseButton.defaultProps = {
    ariaLabel: 'close'
};
export default CloseButton;
