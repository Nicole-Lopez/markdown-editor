import { useRef, useState } from 'react'
import { useInputContext } from '../../utils/hooks/useInputContext';
import { detectTwoKeys } from '../../utils/functions/detectTwoKeys';

export default function Editor ({children}) {
	const textarea = useRef(null)
	const { input, writeInput, setCurrentCursor, setSpecialChar, undoInput, redoInput } = useInputContext()
	const [byte, setByte] = useState(0)
	

	const undoEvent = detectTwoKeys(
		{key: 'ctrl', keyCode:17},
		{key: 'z', keyCode:90},
		(e) => {
			e.preventDefault()		
			undoInput()
		}
	)

	const redoEvent = detectTwoKeys(
		{key: 'ctrl', keyCode:17},
		{key: 'y', keyCode:89},
		(e) => {
			e.preventDefault()
			redoInput()
		}
	)
	const handleKBSize = (e) => {
	    let byteSize = new Blob([e]).size;
	    setByte((byteSize / 1024).toFixed(1))
	}



	const handleCursorPosition = (e) => {
		let start = e.target.selectionStart
		let end = e.target.selectionEnd

		setCurrentCursor(start === end ? e.target.selectionStart : {select:{start:start, end:end}})
	}
	
	const handleChange = (e) => {
		writeInput(e.target.value)
		handleCursorPosition(e)		
		handleKBSize(e.target.value)
	}

	const handlePaste = (e) => {
		setSpecialChar(true)
		writeInput(e.target.value)		
	}

	const handleKeyDown = (e) => {
		undoEvent.onkeydownTwoKeys(e)
		redoEvent.onkeydownTwoKeys(e)

		if ([9, 13, 8].includes(e.keyCode)) setSpecialChar(true)

	    if (e.keyCode === 9) {
	    	e.preventDefault();
	    	const { selectionStart, selectionEnd } = e.target;

	    	const newText = input.substring(0, selectionStart) + "\t" + input.substring(selectionEnd, input.length);

	    	textarea.current.focus();
	    	textarea.current.value = newText;
	    	writeInput(newText);							    		

	    	textarea.current.setSelectionRange(selectionStart + 1, selectionStart + 1);
	    }		
	}

	const handleKeyUp = (e) => {
	    undoEvent.onkeyupTwoKeys(e)
	    redoEvent.onkeyupTwoKeys(e)		
	}


	return (
		<div className='markdown-editor__editor'>
			<textarea 
				ref={textarea}
				onClick={handleCursorPosition} 
				value={input} 
				onChange={handleChange}
				onPaste={handlePaste}
				onKeyDown={handleKeyDown}
				onKeyUp={handleKeyUp}
			/>

			<p>
				<span>
					<span>{input.length}</span> characters
				</span>
				<span>
					<span>{byte}</span> KB
				</span>
			</p>
		</div>
	)
}




