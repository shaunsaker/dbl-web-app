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
	}
`
