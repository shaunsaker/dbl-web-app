import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	html,
	body {
		padding: 0;
		margin: 0;
	}

	a {
		color: inherit;
		text-decoration: none;
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
