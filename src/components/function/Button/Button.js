/**
 * Node Import
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * 
 * Local Import
 * 
 */
import './Button.css';

const Button = (props) => {
	const { children, classNames, onClick } = props;

	return (
		<button className={classNames} onClick={onClick}>
			{children}
		</button>
	);
};

Button.propTypes = {
	/**
     * Required
     */

	onClick    : PropTypes.func.isRequired,
	children   : PropTypes.string.isRequired,

	/**
     * Not required
     */

	classNames : PropTypes.string
};

export default Button;
