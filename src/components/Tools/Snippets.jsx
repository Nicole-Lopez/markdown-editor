import { useInputContext } from '../../utils/hooks/useInputContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faListUl,faListCheck, faListOl, faBold, faItalic, faHeading, faList, faCode, faLink, faImage, faTable, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

export default function Snippets() {
	const { setInput, currentCursor, setUndo, mobile } = useInputContext()

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


	const markdownSnippets = (type, selectText) => {
		if (!selectText) selectText = 'yourText'
		
		let markdown = {
			bold : `**${selectText}**`,
			italic : `*${selectText}*`,
			code : `\n${'``'}\n${selectText}\n${'``'}\n`,
			link : `[${selectText}](https://yourLink.com "title")`,
			image : `![${selectText}](image.png)`,
			table : 
`
| headerA | headerB |
| -- | -- |
| dataA1 | dataB1 |
| dataA2 | dataB2 |
`,
			quote : `\n> ${selectText}\n`,
			h1 : `\n# ${selectText}\n`,
			h2 : `\n## ${selectText}\n`,
			h3 : `\n### ${selectText}\n`,
			h4 : `\n#### ${selectText}\n`,
			h5 : `\n##### ${selectText}\n`,
			h6 : `\n###### ${selectText}\n`,
			ulList : '\n- First item\n- Second item\n- Third item\n',
			olList : '\n1. First item\n2. Second item\n3. Third item\n',
			checkList : '\n- [ ] First item\n- [ ] Second item\n- [ ] Third item\n',
			horizontalRule : '\n---\n',
			comment : `\n[comment]: # (${selectText})\n`,
			linkingImage : '[![Alt](image.png "title")](https://yourLink.com)',
			strikethroughText : `~~${selectText}~~`,
			footnote : 
`
${selectText} [^ref]
[^ref]: footnote.
`
		}

		return markdown[type]
	}


	const handleAddSnippets = (type) => {
		if (type === 'tableOfContents') {
			setInput(prev => {
				let table = '## Table of Contents'

				let allHeadings = prev.match(/[\r\n]#+[ ]([aA-zZ].*)/g).map(e => e.substring(1))
				
				let levelHeading = allHeadings.map(e=> e.match(/#+/g)[0].length)
				let range = Array.from({length: Math.max(...levelHeading) - 1}, (v,k) => k + Math.min(...levelHeading))


				for (let i = 0; i < allHeadings.length; i++) {
					let cleanHeading = allHeadings[i].substring(levelHeading[i] + 1)

					table += `\n${'\t'.repeat(range.indexOf(levelHeading[i]))}- [${cleanHeading}](#${cleanHeading.toLowerCase().replace(/\s/g, "-")})`
				}

				return prev.substring(0, currentCursor) + table + prev.substring(currentCursor, prev.length)
			})

		} else {
			setInput(e => {			
				let markdown = markdownSnippets(type, currentCursor.select ? e.substring(currentCursor.select.start, currentCursor.select.end) : null)

			    let textBeforeCursorPosition
			    let textAfterCursorPosition 

				if (currentCursor.select) {
		    		textBeforeCursorPosition = e.substring(0,currentCursor.select.start)
		    		textAfterCursorPosition =  e.substring(currentCursor.select.end,e.length)
			
				} else {
				    textBeforeCursorPosition = e.substring(0, currentCursor)
				    textAfterCursorPosition = e.substring(currentCursor, e.length)
				}	

				let	res = textBeforeCursorPosition + markdown + textAfterCursorPosition
				setUndo(prev => ([ ...prev, res]))	

				return res			
			})			
		}
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