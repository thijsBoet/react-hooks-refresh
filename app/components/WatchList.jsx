'use client';

import { useState, useReducer } from 'react';

const ACTION_TYPES = {
	ADD_WATCH: 'ADD_WATCH',
	REMOVE_WATCH: 'REMOVE_WATCH',
	CLEAR_WATCHES: 'CLEAR_WATCHES',
};

function reducer(prevState, action) {
	switch (action.type) {
		case ACTION_TYPES.ADD_WATCH: {
			return [...prevState, action.payload];
		}
		case ACTION_TYPES.REMOVE_WATCH: {
			return prevState.filter(watch => watch.id !== action.payload);
		}
		case ACTION_TYPES.CLEAR_WATCHES: {
			return [];
		}
		default:
			console.error(JSON.stringify(action));
			throw new Error('Reducer was called with action.type that does not exist. Invalid action type');
	}
}

import { v4 as uuidv4 } from 'uuid';
export default function WatchList() {
	const [watches, dispatch] = useReducer(reducer, []);
	const [inputText, setInputText] = useState('');

	// function addWatch() {
	// 	setWatches(prevWatches => [
	// 		...prevWatches,
	// 		{ title: inputText, id: uuidv4() },
	// 	]);
	// 	setInputText('');
	// }

	// function removeWatch(id) {
	// 	setWatches(prevWatches => prevWatches.filter(watch => watch.id !== id));
	// }

	// function clearWatches() {
	// 	setWatches([]);
	// }

	function addWatch() {
		dispatch({
			type: ACTION_TYPES.ADD_WATCH,
			payload: { title: inputText, id: uuidv4() },
		});
		setInputText('');
	}

	function removeWatch(id) {
		dispatch({ type: ACTION_TYPES.REMOVE_WATCH, payload: id  });
	}

	function clearWatches() {
		dispatch({ type: ACTION_TYPES.CLEAR_WATCHES });
	}

	return (
		<>
			<h3 className='text-2xl mb-4'>Watch Wish List</h3>
			<div className='mb-2'>
				<input
					style={{ display: 'block' }}
					type='text'
					name='add-watch'
					id='add-watch'
					value={inputText}
					onChange={e => setInputText(e.target.value)}
				/>
				<button onClick={addWatch}>Add Watch</button>
			</div>
			<ul className='mb-2'>
				{watches.map(watch => (
					<li
						key={watch.id}
						className='text-slate-50 flex justify-center items-center'>
						{watch.title}
						<button
							className='ml-4 bg-red-500'
							onClick={() => removeWatch(watch.id)}>
							X
						</button>
					</li>
				))}
			</ul>
			<button onClick={clearWatches}>Clear Watches</button>
		</>
	);
}
