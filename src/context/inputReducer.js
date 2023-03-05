import {
	WRITE_INPUT,
	BASIC_SNIPPETS,
	TABLE_OF_CONTENTS,
	UNDO_INPUT,
	REDO_INPUT,
	FALSE_UPDATE_INPUT,
	NEW_UNDO,
	SET_CURRENTCURSOR,
	CLOSE_ALERT,
	CUSTOM_ALERT
} from './types';
import {markdownSnippets} from '../utils/functions/markdownSnippets'

export const initialState = {
    input: '',
    undo: [],
    redo: [],
    updateInput: false,
    currentCursor: 0,
    alert:false
}

export default function inputReducer (state= initialState, action){
    switch (action.type){
        case WRITE_INPUT:
            return{
                ...state,
                input: action.payload
            }

        case BASIC_SNIPPETS:
    		let textBeforeCursorPosition
		    let textAfterCursorPosition 
		    let isArray = Array.isArray(state.currentCursor)

			let markdown = markdownSnippets(action.payload, isArray? state.input.substring(state.currentCursor[0], state.currentCursor[1]) : null)

			if (isArray) {
	    		textBeforeCursorPosition = state.input.substring(0, state.currentCursor[0])
	    		textAfterCursorPosition =  state.input.substring(state.currentCursor[1], state.input.length)
		
			} else {
			    textBeforeCursorPosition = state.input.substring(0, state.currentCursor)
			    textAfterCursorPosition = state.input.substring(state.currentCursor, state.input.length)
			}	

            return{
                ...state,
                updateInput: true,
                input: textBeforeCursorPosition + markdown + textAfterCursorPosition
            }        


        case TABLE_OF_CONTENTS:
        	try {
				let table = '## Table of Contents'

				let allHeadings = state.input.match(/[\r\n]#+[ ]([aA-zZ].*)/g).map(e => e.substring(1))

				let levelHeading = allHeadings.map(e=> e.match(/#+/g)[0].length)
				let range = Array.from({length: Math.max(...levelHeading) - 1}, (v,k) => k + Math.min(...levelHeading))

				for (let i = 0; i < allHeadings.length; i++) {
					let cleanHeading = allHeadings[i].substring(levelHeading[i] + 1)

					table += `\n${'\t'.repeat(range.indexOf(levelHeading[i]))}- [${cleanHeading}](#${cleanHeading.toLowerCase().replace(/\s/g, "-")})`
				}

	            return{
	                ...state,
	                updateInput: true,
	                input: state.input.substring(0, state.currentCursor) + table + state.input.substring(state.currentCursor, state.input.length)
	            }   

        	} catch (err) {
		        return {
		            ...state,
		            alert:'Syntax error. Please, check your code.'
		        }
        	}


        case UNDO_INPUT:
			if (!state.undo.length) {
				break;
			} else {
				let aux = state.undo.filter((e, index)=> index !== state.undo.length - 1 )

	            return{
	                ...state,
	                updateInput: true,
	                input: aux.length ? aux[aux.length - 1]: '',
	                redo: [...state.redo, state.undo[state.undo.length - 1]],
	                undo: aux
	            }    
			}

        case REDO_INPUT:
			if (!state.redo.length) {
				break;
			} else {
				let aux = state.redo[state.redo.length - 1]

	            return{
	                ...state,
	                updateInput: true,
	                input: aux,
	                redo: state.redo.filter((e, index)=> index !== state.redo.length - 1 ),
	                undo: [...state.undo, aux]
	            }    
			}


        case FALSE_UPDATE_INPUT:
            return{
                ...state,
                updateInput:false
            }  

        case NEW_UNDO:
            return{
                ...state,
                undo: [...state.undo, state.input.slice(-1) === ' '? state.input.slice(0,-1) : state.input],
                redo: state.redo ? [] : state.redo
            }  

        case SET_CURRENTCURSOR:
            return{
                ...state,
                currentCursor:action.payload
            }  
         
        case CLOSE_ALERT:
	        return {
	            ...state,
	            alert: false
	        } 

        case CUSTOM_ALERT:
	        return {
	            ...state,
	            alert: action.payload
	        }  

        default :
        return {
            ...state,
        }
    }
}