import { createContext, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const inputContext = createContext();


export default function InputContextProvider({children}) {
	const [input, setInput] = useState('')
	const [currentCursor, setCurrentCursor] = useState(false)
	const [undo, setUndo] = useState([])
	const [redo, setRedo] = useState([])
	const [specialChar, setSpecialChar] = useState(false)

	const mobile = useMediaQuery('(max-width: 699px)')


	const writeInput = (e) => {
		setInput(e)

		if (redo) setRedo([])

		if (e.slice(-1) === ' ' || specialChar) {
			setUndo(prev => ([ ...prev, e]))	

			if (specialChar) setSpecialChar(false)	
		} 
	}

	const undoInput = () => {
		if (!undo.length) {
			return;
		} else {
			setRedo(prev => [...prev, undo[undo.length - 1]])

			setUndo(prev => {
				let aux = prev.filter((e, index)=> index !== prev.length - 1 )

				setInput(aux.length ? aux[aux.length - 1]: '')

				return aux
			})
		}
	}

	const redoInput = () => {
		if (!redo.length) {
			return;
		} else {
			setUndo(prev => {
				let aux = redo[redo.length - 1]
				setInput(aux)
			
				return [...prev, redo[redo.length - 1]]
			})

			setRedo(prev => prev.filter((e, index)=> index !== prev.length - 1 ))
		}
	}	



	const value = {
		input,
		setInput,
		writeInput,
		currentCursor,
		setCurrentCursor,
		undoInput,
		redoInput,
		undo,
		redo,
		setUndo,
		setSpecialChar,
		mobile		
	}

	return (
		<inputContext.Provider value={value}>
			{children}
		</inputContext.Provider>
	)
}


