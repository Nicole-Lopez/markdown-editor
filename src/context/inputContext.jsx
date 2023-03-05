import { createContext, useReducer } from 'react';
import { useMediaQuery, useToggle } from 'usehooks-ts';
import inputReducer, { initialState } from './inputReducer';

export const inputContext = createContext();


export default function InputContextProvider({children}) {
	const [{ input, undo, redo, updateInput, alert }, dispatch] = useReducer(inputReducer, initialState)
  	const [scrollSync, toggleScrollSync] = useToggle(true)	

	const mobile = useMediaQuery('(max-width: 699px)')


	const value = {
		scrollSync,
		toggleScrollSync,
		alert,
		undo,
		redo,
		mobile,
		input,
		updateInput,
		dispatch		
	}

	return (
		<inputContext.Provider value={value}>
			{children}
		</inputContext.Provider>
	)
}
