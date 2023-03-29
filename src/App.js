import React from 'react';
// import this library to write media query with inline style
import Radium, { StyleRoot } from 'radium';

import { AllPages } from './Pages';
const App = () => (
	<>
		{/**  we wrap the APP Component to write media query with inline style  */}
		<StyleRoot>
			<div className='app'>
				<AllPages />
			</div>
		</StyleRoot>
	</>
);

export default Radium(App);
