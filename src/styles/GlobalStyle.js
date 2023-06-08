import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
	${reset};

	@font-face {
			font-family: 'Pretendard';
			src: url('../assets/fonts/Pretendard/Pretendard-Regular.woff2') format('font-woff2'),
					url('../assets/fonts/Pretendard/Pretendard-Regular.woff') format('woff'),
					url('../assets/fonts/Pretendard/Pretendard-Regular.otf') format('opentype');
			font-weight: 400;
    }
    @font-face {
			font-family: 'Pretendard';
			src: url('../assets/fonts/Pretendard/Pretendard-Medium.woff2') format('font-woff2'),
					url('../assets/fonts/Pretendard/Pretendard-Medium.woff') format('woff'),
					url('../assets/fonts/Pretendard/Pretendard-Medium.otf') format('opentype');
			font-weight: 500;
    }
    @font-face {
			font-family: 'Pretendard';
			src: url('../assets/fonts/Pretendard/Pretendard-SemiBold.woff2') format('font-woff2'),
					url('../assets/fonts/Pretendard/Pretendard-SemiBold.woff') format('woff'),
					url('../assets/fonts/Pretendard/Pretendard-SemiBold.otf') format('opentype');
			font-weight: 600;
    }
	*{
		box-sizing: border-box;
		font-size: 10px;
	}
	body{
		font-family: 'Pretendard',sans-serif;
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
