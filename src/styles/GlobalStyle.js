import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './fonts.css';

const GlobalStyle = createGlobalStyle`
	${reset};

	*{
		box-sizing: border-box;
		font-size: 10px;
	}
	body{
		font-family: 'Pretendard', sans-serif;
	}
	a{
		text-decoration: none;
		color: inherit;
	}
	button {
		border: 0;
		background: transparent;
		font-family: inherit;
		cursor: pointer;
	}
	img{
		width: 100%;
		vertical-align: middle;
	}
	input{
		font: inherit;
	}
	textarea {
		border: none;
		overflow: auto;
		outline: none;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		resize: none;
		font: inherit;
	}
	.a11y {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
	}
`;

export default GlobalStyle;
