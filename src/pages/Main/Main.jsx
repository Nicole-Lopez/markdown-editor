import { useRef } from 'react';
import { useEventListener, useToggle } from 'usehooks-ts';
import { useInputContext } from '../../utils/hooks/useInputContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import './Main.scss';
import './markdownStyle.scss';
import Editor from '../../components/Editor/Editor';
import Tools from '../../components/Tools/Tools';
import Alerts from '../../components/Alerts/Alerts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import emoji from "remark-emoji";
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeVideo from 'rehype-video';

export default function Main() {
  	const [openPreview, togglePreview] = useToggle()	
	const { input, mobile, scrollSync } = useInputContext()
	const previewContainer = useRef(null)
	const editorContainer = useRef(null)
  	
  	const editorScroll = (e) => {
  		if (scrollSync) previewContainer.current.scrollTop = e.target.scrollTop;      
  	}

  	const previewScroll = (e) => {
  		if (scrollSync) editorContainer.current.textarea.current.scrollTop = e.target.scrollTop;       		
  	}

  	useEventListener('keydown', (e) => {
  		if ((e.keyCode === 90 || e.keyCode === 89) && e.ctrlKey) e.preventDefault()
  	})	


	return (
		<div className="main">
			<Tools/>

			<div className="markdown-editor">
				{mobile && 
					<button onClick={togglePreview} className='markdown-editor__view-mobile'>
						<FontAwesomeIcon icon={openPreview? faPen : faEye} />
					</button>
				}

				<div className={`markdown-editor__view ${mobile && `${openPreview?'markdown-editor__view--preview':'markdown-editor__view--editor'}`}`}>
					<Editor ref={editorContainer} scrollFunction={editorScroll}/>

					<div 
						className='markdown-editor__preview' 
						ref={previewContainer}
						onScroll={previewScroll}
					>
						<ReactMarkdown  
							className='markdown-body'
							children={input}
							remarkPlugins={[remarkGfm, emoji]}
							rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypeRaw, rehypeVideo]}
						/>							
					</div>
				</div>				
			</div>

			<Alerts/>
		</div>


	)
}