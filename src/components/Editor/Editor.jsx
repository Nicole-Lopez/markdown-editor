import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useInputContext } from '../../utils/hooks/useInputContext';
import { useUpdateEffect } from 'usehooks-ts';
import './Editor.scss';
import { SET_CURRENTCURSOR, WRITE_INPUT, NEW_UNDO, UNDO_INPUT, REDO_INPUT, FALSE_UPDATE_INPUT } from '../../context/types';

export default forwardRef(function Editor ({children, scrollFunction}, ref) {
	const textarea = useRef(null)
	const { input, dispatch, updateInput } = useInputContext()


	const handleSelectedText = (e) => {
		let { selectionStart, selectionEnd } = e.target

		dispatch({
			type: SET_CURRENTCURSOR,
			payload: selectionStart === selectionEnd ? selectionStart : [selectionStart, selectionEnd]
		})
	}
	
	const handleChange = (e) => {
		dispatch({
			type: WRITE_INPUT,
			payload: e.target.value
		})

		if (e.target.value.slice(-1) === ' ') dispatch({type: NEW_UNDO})
	}

	const handlePaste = (e) => {
		dispatch({
			type: WRITE_INPUT,
			payload: e.target.value
		})

		setTimeout(()=> (dispatch({type: NEW_UNDO})), 100)
	}

	const handleKeyDown = (e) => {
  		if (e.keyCode === 90 && e.ctrlKey) {
			e.preventDefault()	
			dispatch({type: UNDO_INPUT})      		
      	};

  		if (e.keyCode === 89 && e.ctrlKey) {
			e.preventDefault()	
			dispatch({type: REDO_INPUT})
      	};

      	//************************ TAB ************************
    	const { selectionStart, selectionEnd } = e.target;

	    if (e.keyCode === 9) {
	    	e.preventDefault();
	    	const newText = input.substring(0, selectionStart) + "\t" + input.substring(selectionEnd, input.length);

	    	textarea.current.focus();
	    	textarea.current.value = newText;

			dispatch({
				type: WRITE_INPUT,
				payload: newText
			})						    		

	    	textarea.current.setSelectionRange(selectionStart + 1, selectionStart + 1);
	    }
	    // ************************************************

		if ([9, 13, 8].includes(e.keyCode)){ 
			if (e.keyCode === 8 && e.target.selectionStart === 0) {
				return;
			}

			dispatch({
				type: WRITE_INPUT,
				payload: input.substring(0, selectionStart) + String.fromCharCode(e.keyCode) + input.substring(selectionEnd, input.length)
			})						    		
			dispatch({type: NEW_UNDO})
		}
	}


	useUpdateEffect(() => {
		if (updateInput) {
			textarea.current.value = input

			dispatch({type: FALSE_UPDATE_INPUT})		
		}
	}, [updateInput])

	useImperativeHandle(ref, () => {
		return{
			textarea
		}
	})

	return (
		<div className='markdown-editor__editor'>
			<textarea 
				ref={textarea}
				autoComplete="off" 
				autoCorrect="off" 
				autoCapitalize="off" 
				spellCheck={false}
				onChange={handleChange}
				onClick={handleSelectedText}
				onPaste={handlePaste}
				onKeyDown={handleKeyDown}
				onScroll={scrollFunction}
			/>

			<div className='status-bar'>
				<p><span>{input.length}</span>characters</p>
				<p><span>{(new Blob([input]).size / 1024).toFixed(1)}</span>KB</p>
			</div>
		</div>
	)
})


