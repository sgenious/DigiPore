import React from 'react';
import ReactDOM from 'react-dom';

import {PersonMain} from './app.main';

window.onload=function () {
	
	ReactDOM.render(<PersonMain />,
		document.getElementById('appcontent')
	);
}
