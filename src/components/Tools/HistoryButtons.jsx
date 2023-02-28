import { useInputContext } from '../../utils/hooks/useInputContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';

export default function HistoryButtons() {
	const { undoInput, redoInput, undo, redo } = useInputContext()

	return (
		<ul className="history">
			<li className="undo">
				<button onClick={() => undoInput()} disabled={!undo.length}>
					<FontAwesomeIcon icon={faRotateLeft}/>
				</button>
			</li>

			<li className="redo">
				<button onClick={() => redoInput()} disabled={!redo.length}>
					<FontAwesomeIcon icon={faRotateRight}/>
				</button>
			</li>
		</ul>
	)
}