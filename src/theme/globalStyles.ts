import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	html,
	body {
		padding: 0;
		margin: 0;
	}

	* {
		box-sizing: border-box;
	}

	#app {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	button {
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
	}
`
