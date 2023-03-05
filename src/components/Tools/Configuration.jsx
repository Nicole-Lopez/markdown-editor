import { useState } from 'react';
import { useInputContext } from '../../utils/hooks/useInputContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload, faBookmark, faArrowsUpToLine } from '@fortawesome/free-solid-svg-icons';
import { CUSTOM_ALERT } from '../../context/types';


export default function Configuration() {
	const [copyConfirmation, setCopyConfirmation] = useState(false)
	const { input, toggleScrollSync, scrollSync, dispatch } = useInputContext()

	const handleCopyCode = async () => {
	    if (!navigator?.clipboard) {
			dispatch({
				type: CUSTOM_ALERT,
				payload: 'Clipboard not supported'
			})
	    	console.warn('Clipboard not supported')
	    }

	    try{
	    	await navigator.clipboard.writeText(input)
	    	setCopyConfirmation(true)
			const timer = setTimeout(() => setCopyConfirmation(false), 2500)
    		return () => clearTimeout(timer)

	    } catch (error) {
			dispatch({
				type: CUSTOM_ALERT,
				payload: 'Copy failed. Please, try again later.'
			})
	    	console.warn('Copy failed', error)
	    }
  	}

	const handleDownloadCode = () => {
		try{
			const element = document.createElement("a");
		    const file = new Blob([input], {type: 'text/md'});
		    element.href = URL.createObjectURL(file);
		    element.download = "README.md";
		    document.body.appendChild(element); // Required for this to work in FireFox
		    element.click();			
		} catch (error) {
			dispatch({
				type: CUSTOM_ALERT,
				payload: 'Download failed. Please, try again later.'
			})
	    	console.warn('Download failed', error)
	    } 
	}


	return (
		<ul className='configuration'>
			<li className={`scroll-sync ${scrollSync? 'scroll-sync--active' : ''}`}>
				<button onClick={toggleScrollSync} title='Synchronize scroll'>
					<FontAwesomeIcon icon={faArrowsUpToLine}/>
				</button>
			</li>			

			<li className='save-code'>
				<FontAwesomeIcon icon={faBookmark}/>				

				<ul className="submenu">
					<li>
						<button onClick={handleDownloadCode}>
							<span><FontAwesomeIcon icon={faCopy}/>Download file</span>
						</button>
					</li>	
					<li>
						<button onClick={handleCopyCode}>
							<span><FontAwesomeIcon icon={faDownload}/>{copyConfirmation ? 'Copied!' : 'Copy all markdown'}</span>
						</button>
					</li>	
				</ul>
			</li>	
		</ul>
	
	)
}