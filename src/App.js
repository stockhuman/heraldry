import React from 'react';

import Generator from './Generator'
import './assets/GutenbergTextura.ttf'
import './assets/css/App.css'

function App() {
	return (
		<div className="App">
			<header>
				<h1>Heraldry.io</h1>
				<p>
					Press any key or tap to generate
					<br />
					<i>'S' to save</i>
				</p>
			</header>
			<main>
				<span role="img" aria-label="crown">
					👑
				</span>
				<Generator />
			</main>
			<footer>
				Made with honour and chivalry by{' '}
				<a href="https://www.michaelhemingway.com/projects/heraldry/">
					Michael Hemingway
				</a>
			</footer>
		</div>
	)
}

export default App;
