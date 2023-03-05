import { useState } from 'react'
import { useInputContext } from '../../utils/hooks/useInputContext';
import { useUpdateEffect } from 'usehooks-ts';
import './Alerts.scss';
import { CLOSE_ALERT } from '../../context/types';

export default function Alerts() {
	const [message, setMessage] = useState('')
	const { alert, dispatch } = useInputContext()

	const handleCloseAlert = () => dispatch({type: CLOSE_ALERT})			

	useUpdateEffect(() => {
        if (alert) { 
        	setMessage(alert)
	        let timer = setTimeout(() => handleCloseAlert(), 15000)     
        	return () => clearTimeout(timer)
        }
	}, [alert])

	return (
		<div className={`alert alert--danger ${alert? 'alert--open' : ''}`}>
			<h3>{message}</h3>
			<button onClick={handleCloseAlert} type='button' className="alert__close-btn">X</button>
		</div>
	)
}