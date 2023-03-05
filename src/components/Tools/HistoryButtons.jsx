import { useInputContext } from '../../utils/hooks/useInputContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { UNDO_INPUT, REDO_INPUT } from '../../context/types';

export default function HistoryButtons() {
	const { dispatch, undo, redo } = useInputContext()

	return (
		<ul className="history">
			<li className="undo">
				<button onClick={() => dispatch({type: UNDO_INPUT})} disabled={!undo.length} title='ctrl+z'>
					<FontAwesomeIcon icon={faRotateLeft}/>
				</button>
			</li>

			<li className="redo">
				<button onClick={() => dispatch({type: REDO_INPUT})} disabled={!redo.length} title='ctrl+y'>
					<FontAwesomeIcon icon={faRotateRight}/>
				</button>
			</li>
		</ul>
	)
}