import { useState } from 'react';
import { useInputContext } from '../../utils/hooks/useInputContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload, faBookmark } from '@fortawesome/free-solid-svg-icons';


export default function SaveCode() {
	const [copyConfirmation, setCopyConfirmation] = useState(false)
	const { input } = useInputContext()

	const handleCopyCode = async () => {
	    if (!navigator?.clipboard) {
	    	console.warn('Clipboard not supported')
	    }

	    try{
	    	await navigator.clipboard.writeText(input)
	    	setCopyConfirmation(true)
			const timer = setTimeout(() => setCopyConfirmation(false), 2500)
    		return () => clearTimeout(timer)

	    } catch (error) {
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
	    	console.warn('Download failed', error)
	    } 
	}


	return (
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
	)
}