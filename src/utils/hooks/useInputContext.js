import { useContext } from 'react';
import { inputContext } from '../../context/inputContext';

export const useInputContext = () => {
	const context = useContext(inputContext)

	return context
}