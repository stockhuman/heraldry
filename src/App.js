import React from 'react';

import Generator from './Generator'
import './assets/GutenbergTextura.ttf'
import './assets/css/App.css'

function App() {
	return (
		<div className="App">
			<main>
				<span role="img" aria-label="crown">👑</span>
				<Generator />
			</main>
		</div>
	);
}

export default App;
