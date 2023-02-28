import './Tools.scss';
import HistoryButtons from './HistoryButtons';
import SaveCode from './SaveCode';
import Snippets from './Snippets'

export default function Tools() {
	return (
		<div className="tools">
			<div>
				<HistoryButtons/>
				<Snippets/>	
			</div>
			<SaveCode/>
		</div>
	)
}