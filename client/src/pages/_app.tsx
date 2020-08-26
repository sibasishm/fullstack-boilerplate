import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import theme from '@chakra-ui/theme';

const App = ({ Component, pageProps }) => (
	<ChakraProvider theme={theme}>
		<CSSReset />
		<Component {...pageProps} />
	</ChakraProvider>
);

export default App;
