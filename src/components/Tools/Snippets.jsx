import { useInputContext } from '../../utils/hooks/useInputContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faListUl,faListCheck, faListOl, faBold, faItalic, faHeading, faList, faCode, faLink, faImage, faTable, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { TABLE_OF_CONTENTS, BASIC_SNIPPETS, NEW_UNDO } from '../../context/types';

export default function Snippets() {
	const { mobile, dispatch } = useInputContext()

	let snippetSimple = [
		{type: 'bold', icon: faBold},
		{type: 'italic', icon: faItalic},
		{type: 'code', icon: faCode},
		{type: 'link', icon: faLink},
		{type: 'image', icon: faImage},
		{type: 'table', icon: faTable},
		{type: 'quote', icon: faQuoteRight},
	]


	let heading = [
		{content:'H1', type:'h1'},
		{content:'H2', type:'h2'},
		{content:'H3', type:'h3'},
		{content:'H4', type:'h4'},
		{content:'H5', type:'h5'},
		{content:'H6', type:'h6'}
	]

	let list = [
		{content:<FontAwesomeIcon icon={faListUl}/>, type:'ulList'},
		{content:<FontAwesomeIcon icon={faListOl}/>, type:'olList'},
		{content:<FontAwesomeIcon icon={faListCheck}/>, type:'checkList'},
	]

	let more = [
		{content:'Horizontal Rule', type:'horizontalRule'},
		{content:'Comment', type:'comment'},
		{content:'Linking Image', type:'linkingImage'},
		{content:'Table Of Contents', type:'tableOfContents'},
		{content:'Strikethrough Text', type:'strikethroughText'},
		{content:'Footnote', type:'footnote'}
	]

	let snippetWithSubmenu = [
		{type: 'heading', main: <FontAwesomeIcon icon={faHeading}/>, options: heading},
		{type: 'list', main: <FontAwesomeIcon icon={faList}/>, options: list},
		{type: 'more', main: <span>More...</span>, options: more}
	]


	const handleAddSnippets = (type) => {
		if (type === 'tableOfContents') {
			dispatch({type: TABLE_OF_CONTENTS})		
		} else {
			dispatch({
				type: BASIC_SNIPPETS,
				payload: type
			})
		}
		
		dispatch({type: NEW_UNDO})	
	}



	return (
		<div className={`${mobile? 'snippets' : ''}`}>
			{mobile && 
				<FontAwesomeIcon icon={faEllipsisVertical} className="tools__open"/>	
			}

			<ul className={`${mobile? 'submenu' : 'snippets'}`}>
				{snippetSimple.map(item => {
					return(
						<li key={item.type} className={`snippets__${item.type}`}>
							<button onClick={(e) => handleAddSnippets(e.target.value)} value={item.type}>
								<FontAwesomeIcon icon={item.icon}/>
							</button>
						</li>	
					)
				})}

				{snippetWithSubmenu.map(item => {
					return (
						<li key={item.type} className={`snippets__${item.type} snippets--with-submenu`}>
							{item.main}

							<ul className="submenu">
								{item.options.map(itemSub => {
									return (
										<li key={itemSub.type}>
											<button onClick={(e) => handleAddSnippets(e.target.value)} value={itemSub.type}>{itemSub.content}</button>
										</li>						
									)
								})}
							</ul>
						</li>	
					)
				})}
			</ul>	
		</div>
	
	)
}