import React from 'react';

import Generator from './Generator'
import './assets/GutenbergTextura.ttf'
import './assets/css/App.css'

function App() {
	return (
		<div className="App">
			<header>Heraldry.io</header>
			<main>
				<span style={{display: 'block', textAlign: 'center', fontSize: 150}}>👑</span>
				<Generator />
			</main>
			<footer>Made with honour and chivalry by <a href="https://michaelhemingway.com">Michael Hemingway</a></footer>
		</div>
	);
}

export default App;
