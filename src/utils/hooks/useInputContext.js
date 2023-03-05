import { useContext } from 'react';
import { inputContext } from '../../context/inputContext';

export const useInputContext = () => {
	return useContext(inputContext)
}