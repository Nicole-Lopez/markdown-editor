export const detectTwoKeys = (key1, key2, nextFun) => {
	let keyPressA = {
		[key1.key] : false,
		[key2.key] : false			
	}
	
	const onkeydownTwoKeys = (e) => {


		if (e.keyCode === key1.keyCode){	
			keyPressA[key1.key] = true
		}
	    
	    if (e.keyCode === key2.keyCode){
			keyPressA[key2.key] = true
	    }
	    
	    if(Object.values(keyPressA).every(val => val)){
	    	console.log('entro')
	    	nextFun(e)
	    }
	}

	const onkeyupTwoKeys = (e) => {
		if (e.keyCode === key1.keyCode) {
			keyPressA[key1.key] = false
	    }
	    if (e.keyCode === key2.keyCode) {
			keyPressA[key2.key] = false
	    }
	}


	return {
		onkeydownTwoKeys,
		onkeyupTwoKeys
	}
}