export const markdownSnippets = (type, selectText) => {
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