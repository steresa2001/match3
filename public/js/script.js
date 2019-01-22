
$(function() {
    let myApp = (() => {
    	
    	function initialSetUp() {
    		const SvgCount = 11;

			let htmlString = '';
			let container = $('.container');
	    	for(let i = 0; i < SvgCount; i++) {
	    		htmlString += container.html();
	    	}
			container.append(htmlString);   
    	}
    	
    	initialSetUp();

    	setTimeout(function(){
    		const FindSvgElem = $('object');
	    	const SvgCount = FindSvgElem.length;
	    	const SvgQuestionMark = 'question_x5F_mark';
	    	const SvgQuestionMarkTransformStartPos = 't5,0';
	    	const SvgQuestionMarkTransformEndPos = 't0,0';
	    	const SvgQuestionMarkTransformStartDuration = 500;
	    	const SvgQuestionMarkTransformEndDuration = 500;
	    	const CardClickArea = $('.click-area');
	    	const FindCardImagesDiv = $('.flip-card-back');
	    	const Cover = $('.cover');

	    	function setAttributesForAllSvgs() {
	    		for(let i = 0; i < SvgCount; i++) {
	    			$(FindSvgElem).attr('class', 'card');
	    			$(FindSvgElem).attr('id', function(i, val) {
	    				val = 'svg';
	    				return val + (i+1);
	    			});
	    		}
	    	}

	    	function getCardsReady() {
	    		let num = 0;
		    	function randomNumber() {
		    		num = Math.ceil(Math.random() * 18);
		    		return num;
		    	}
		    	function InsertImageForCards() {
		    		let img = '';
		    		let imgName = '';
		    		for(let i = 0; i < FindCardImagesDiv.length; i++) {
		    			imgName = imagesArray[num][i].match(/([^\/]+)(?=\.\w+$)/)[0];
		    			img = `<img src="images/animals/${imagesArray[num][i]}" alt="${imgName}">`;
		    			$(FindCardImagesDiv[i]).append(img);
		    		}
		    	}
		    	randomNumber();
		    	InsertImageForCards();
	    	}
		    	
	    	function svgAnimationConfig (elem, innerElem) {
	    		let svg = document.getElementById(elem).contentDocument.getElementById(innerElem);
	    		let snapThis = Snap(svg);
		    	let control = snapThis.animate({ transform: SvgQuestionMarkTransformStartPos }, 
		    		SvgQuestionMarkTransformStartDuration, () => {
						control = snapThis.animate({ transform: SvgQuestionMarkTransformEndPos }, 
						SvgQuestionMarkTransformEndDuration);
		    	})
		 	}

		 	function closeCards() {
	 			setTimeout(function() {
	 				let resetCard = $('.flip-card').removeClass('card-flip');
	 			}, 1200);
	 		}

		 	function match3() {
		 		let matchArray = [];

		 		function clearMatchArray() {
		 			matchArray = [];
		 		}

			 	$(CardClickArea).each(function(){
			 		let findImg = '';
			 		let imgName = '';
			 		
			 		$(this).on('click', function(){
			 			$(this).closest($('.flip-card')).addClass('card-flip');
			 			findImg = $(this).closest($('.flip-card-back img'));
			 			imgName = findImg.prevObject[0].nextElementSibling.childNodes[3].children[0].alt;
			 			matchArray.push(imgName);

			 			toggleClickArea('none', '.2');
			 			$(this).parent().css('opacity', '1');
			 			setTimeout(function(){
			 				toggleClickArea('all', '1');
			 			}, 1200);

			 			if(matchArray.length === 2) {
			 				if(matchArray[0] === matchArray[1]) {
			 				}else {
			 					clearMatchArray();
			 					closeCards();
			 				}
			 			}
			 			if(matchArray.length === 3) {
			 				if(matchArray[0] === matchArray[1] && matchArray[1] === matchArray[2]) {
			 					setTimeout(function(){
			 						winnerMessage();
			 					}, 1000);
			 				}else {
			 					clearMatchArray();
			 					closeCards();
			 				}
			 			}
			 		})
			 	})
		 	}

		 	function toggleClickArea(pointerVal, opacityVal) {
		 		for(let i = 0; i < CardClickArea.length; i++) {
		 			$(CardClickArea[i]).css('pointer-events', pointerVal);
		 			$(CardClickArea[i]).parent().css('opacity', opacityVal);
		 		}
		 	}

		 	function clearCardImages() {
	    		let findCardImages = '';
	    		for(let i = 0; i < FindCardImagesDiv.length; i++) {
	    			findCardImages = $(FindCardImagesDiv[i]);
	    			$(findCardImages).empty();
	    		}
	    	}

	    	function winnerMessage() {
	    		let playAgainBtn = $('#play-again-btn');
	    		let winnerDialog = $('.winner-dialog');
	    		Cover.show();
	    		winnerDialog.show();

	    		playAgainBtn.on('click', function(){
		    		winnerDialog.hide();
		    		playAgain();
		    	})
	    	}

		 	function playAgain() {
		 		closeCards();
		 		setTimeout(function(){
		 			Cover.hide();
		 			clearCardImages();
		 			getCardsReady();
	    			match3();
		 		}, 1000);
		 	}

	    	setTimeout(() => {
	    		for(let i = 0; i < SvgCount; i++) {
	    			let selector = 'svg' + (i + 1);
		    		setInterval(() => {
						svgAnimationConfig(selector, SvgQuestionMark);
		    		}, 1000);
	    		}
	    		setAttributesForAllSvgs();
	    		getCardsReady();
	    		match3();
	    	}, 200);

	    	let imagesArray = 
	    								[
	    									['koala.jpg', 'monkey.jpg', 'panther.jpg', 'parrot.jpg', 'parrot.jpg', 'monkey.jpg', 'koala.jpg', 'panther.jpg', 'monkey.jpg', 'panther.jpg', 'koala.jpg', 'parrot.jpg'],
	    									['panther.jpg', 'monkey.jpg', 'parrot.jpg', 'koala.jpg', 'monkey.jpg', 'panther.jpg', 'monkey.jpg', 'parrot.jpg', 'panther.jpg', 'koala.jpg', 'parrot.jpg', 'koala.jpg'],
	    									['monkey.jpg', 'koala.jpg', 'parrot.jpg', 'panther.jpg', 'monkey.jpg', 'koala.jpg', 'parrot.jpg', 'panther.jpg', 'koala.jpg', 'monkey.jpg', 'parrot.jpg', 'panther.jpg'],
	    									['monkey.jpg', 'parrot.jpg', 'panther.jpg', 'parrot.jpg', 'koala.jpg', 'monkey.jpg', 'koala.jpg', 'panther.jpg', 'koala.jpg', 'panther.jpg', 'parrot.jpg', 'monkey.jpg'],
	    									['koala.jpg', 'monkey.jpg', 'parrot.jpg', 'panther.jpg', 'parrot.jpg', 'panther.jpg', 'monkey.jpg', 'panther.jpg', 'monkey.jpg', 'parrot.jpg', 'koala.jpg', 'koala.jpg'],
	    									['monkey.jpg', 'parrot.jpg', 'parrot.jpg', 'panther.jpg', 'parrot.jpg', 'monkey.jpg', 'koala.jpg', 'panther.jpg', 'koala.jpg', 'panther.jpg', 'monkey.jpg', 'koala.jpg'],
	    									['parrot.jpg', 'koala.jpg', 'panther.jpg', 'panther.jpg', 'koala.jpg', 'panther.jpg', 'parrot.jpg', 'monkey.jpg', 'koala.jpg', 'monkey.jpg', 'parrot.jpg', 'monkey.jpg'],
	    									['monkey.jpg', 'parrot.jpg', 'panther.jpg', 'koala.jpg', 'monkey.jpg', 'panther.jpg', 'koala.jpg', 'parrot.jpg', 'koala.jpg', 'parrot.jpg', 'panther.jpg', 'monkey.jpg'],
	    									['parrot.jpg', 'monkey.jpg', 'parrot.jpg', 'panther.jpg', 'monkey.jpg', 'parrot.jpg', 'koala.jpg', 'koala.jpg', 'monkey.jpg', 'panther.jpg', 'panther.jpg', 'koala.jpg'],
	    									['koala.jpg', 'panther.jpg', 'koala.jpg', 'monkey.jpg', 'panther.jpg', 'parrot.jpg', 'koala.jpg', 'parrot.jpg', 'monkey.jpg', 'panther.jpg', 'parrot.jpg', 'monkey.jpg'],
	    									['monkey.jpg', 'panther.jpg', 'koala.jpg', 'parrot.jpg', 'monkey.jpg', 'panther.jpg', 'koala.jpg', 'parrot.jpg', 'panther.jpg', 'parrot.jpg', 'monkey.jpg', 'koala.jpg'],
	    									['parrot.jpg', 'panther.jpg', 'monkey.jpg', 'panther.jpg', 'parrot.jpg', 'monkey.jpg', 'koala.jpg', 'panther.jpg', 'koala.jpg', 'monkey.jpg', 'parrot.jpg', 'koala.jpg'],
	    									['panther.jpg', 'panther.jpg', 'koala.jpg', 'monkey.jpg', 'parrot.jpg', 'monkey.jpg', 'parrot.jpg', 'koala.jpg', 'parrot.jpg', 'panther.jpg', 'koala.jpg', 'monkey.jpg'],
	    									['parrot.jpg', 'monkey.jpg', 'panther.jpg', 'panther.jpg', 'monkey.jpg', 'parrot.jpg', 'koala.jpg', 'panther.jpg', 'koala.jpg', 'monkey.jpg', 'parrot.jpg', 'koala.jpg'],
	    									['koala.jpg', 'monkey.jpg', 'koala.jpg', 'parrot.jpg', 'panther.jpg', 'monkey.jpg', 'koala.jpg', 'parrot.jpg', 'monkey.jpg', 'panther.jpg', 'panther.jpg', 'parrot.jpg'],
	    									['panther.jpg', 'koala.jpg', 'parrot.jpg', 'parrot.jpg', 'monkey.jpg', 'panther.jpg', 'koala.jpg', 'panther.jpg', 'monkey.jpg', 'koala.jpg', 'parrot.jpg', 'monkey.jpg'],
	    									['monkey.jpg', 'panther.jpg', 'monkey.jpg', 'parrot.jpg', 'monkey.jpg', 'koala.jpg', 'panther.jpg', 'parrot.jpg', 'koala.jpg', 'panther.jpg', 'parrot.jpg', 'koala.jpg'],
	    									['koala.jpg', 'parrot.jpg', 'koala.jpg', 'monkey.jpg', 'panther.jpg', 'parrot.jpg', 'panther.jpg', 'monkey.jpg', 'panther.jpg', 'monkey.jpg', 'koala.jpg', 'parrot.jpg'],
	    									['panther.jpg', 'monkey.jpg', 'panther.jpg', 'parrot.jpg', 'monkey.jpg', 'panther.jpg', 'parrot.jpg', 'koala.jpg', 'koala.jpg', 'monkey.jpg', 'parrot.jpg', 'koala.jpg']
	    								];

		    function playGame() {
		    	let playBtn = $('#play-btn');
		    	let welcomeDialog = $('.welcome-dialog');
		    	playBtn.on('click', function(){
		    		Cover.hide();
		    		welcomeDialog.hide();
		    	})
		    }
		    playGame();
    	}, 200);
	})();   
});
