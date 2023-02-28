import { useState } from 'react';
import { useInputContext } from '../../utils/hooks/useInputContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import './Main.scss';
import './markdownStyle.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import emoji from "remark-emoji";
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeVideo from 'rehype-video';
import Editor from '../../components/Editor/Editor';
import Tools from '../../components/Tools/Tools';


export default function Main() {
	const [openPreview, setOpenPreview] = useState(false)
	const { input, mobile } = useInputContext()

	return (
		<div className="main">
			<Tools/>

			<div className="markdown-editor">
				{mobile && 
					<button onClick={() => setOpenPreview(e => !e)} className='markdown-editor__view-mobile'>
						<FontAwesomeIcon icon={openPreview? faPen : faEye} />
					</button>
				}

				<div className={`markdown-editor__view ${mobile && `${openPreview?'markdown-editor__view--preview':'markdown-editor__view--editor'}`}`}>
					<Editor/>

					<ReactMarkdown  
						className='markdown-editor__preview markdown-body'
						children={input}
						remarkPlugins={[remarkGfm, emoji]}
						rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw, rehypeVideo]}
					/>	
				</div>				
			</div>
		</div>


	)
}