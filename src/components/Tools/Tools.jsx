import './Tools.scss';
import HistoryButtons from './HistoryButtons';
import Configuration from './Configuration';
import Snippets from './Snippets';

export default function Tools() {
	return (
		<div className="tools">
			<div>
				<HistoryButtons/>
				<Snippets/>	
			</div>
			<Configuration/>
		</div>
	)
}