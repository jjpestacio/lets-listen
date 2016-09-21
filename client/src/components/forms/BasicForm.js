import React, { Component, PropTypes } from 'react'

export default class InputForm extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' }

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		const { minLength, minLengthWarning, submit } = this.props;
		const { value } = this.state;

		e.preventDefault();

		if (minLength && value.length < minLength) {
			alert(minLengthWarning);
			return;
		}

		submit(value);
		this.setState({ value: '' });
	}

	handleTextChange(e) {
		const { maxLength } = this.props;

		// Don't let user type more characters than maxLength
		if (maxLength && e.target.value.length > maxLength) 
			return;

		this.setState({ value: e.target.value });
	}

	render() {
		const { value } = this.state;
		const { buttonText, placeholder, buttonStyle, inputStyle } = this.props;

		return (
			<form className='commentForm' onSubmit={this.handleSubmit}>
				<input className={inputStyle}
					autoComplete='off'
					type='text' 
					placeholder={placeholder}
					value={value} 
					onChange={this.handleTextChange} />
				<button className={buttonStyle}
					key={buttonText}
					type='submit'>
					{buttonText}
				</button>
			</form>
		)
	}
}

InputForm.propTypes = {
	buttonText: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	buttonStyle: PropTypes.string,
	inputStyle: PropTypes.string,
	maxLength: PropTypes.number,
	minLength: PropTypes.number,
	minLengthWarning: PropTypes.string,
	submit: PropTypes.func.isRequired
}