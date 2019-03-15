import React from 'react';
import * as PropTypes from 'prop-types';

import styles from './shadow-box.module.scss';

const ShadowBox = ({ className, children }) => {
    const rootClass = `${styles.root} ${className || ''}`.trim();
    return (
        <div className={rootClass}>
            {children}
        </div>
    );
};

ShadowBox.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default ShadowBox;
