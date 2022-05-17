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

	div {
		display: flex;
		flex-direction: column;
	}

	#app {
		height: 100vh;
	}
`
