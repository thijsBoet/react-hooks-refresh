'use client';
import { useEffect, useRef } from 'react';

export default function InputRef() {
	const inputRef = useRef(null);

	function handleClick() {
    inputRef.current.focus();
    console.log(inputRef.current);
	}

	return (
		<>
			<input ref={inputRef} />
			<button onClick={handleClick}>Focus</button>
		</>
	);
}
