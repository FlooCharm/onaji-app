import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function Board(props) {
	let [ selectedCards, setSelectedCards ] = useState([]);
	let [ shuffledCards, setShuffledCards ] = useState([]);
	let [ userScore, setUserScore ] = useState(0);

	useEffect(() => {
		let { cards } = props;
		const shuffled = cards.slice().sort(() => Math.random() - 0.5);
		setShuffledCards(shuffled);
	}, []);

	useEffect(() => {
		if(selectedCards.length === 2) {
			compareSelected(selectedCards);
		}
	}, [selectedCards]);

	const onCardSelect = (card) => {
		if(selectedCards.length < 2) {
			setSelectedCards(prevSelectedCards => {
				let newCards = prevSelectedCards.slice();
				newCards.push(card);
				return newCards;
			})

			let newShuffled = shuffledCards.slice();
			newShuffled.forEach(shuffledCard => {
				if(shuffledCard.matchId === card.matchId && shuffledCard.set === card.set) {
					shuffledCard.isOpen = true;
					return;
				}
			})
			setShuffledCards(newShuffled);
		}
	}

	const compareSelected = (selected) => {
		let aMatchId = selected[0].matchId;
		let aSet = selected[0].set;

		let bMatchId = selected[1].matchId;
		let bSet = selected[1].set;

		if(aMatchId === bMatchId) {
			if((aSet === 'h' && bSet === 'k') || (aSet === 'k' && bSet === 'h')) {
				setUserScore(prev => prev + 1);
				setTimeout(function(){
					let newShuffled = shuffledCards.slice();
					newShuffled.forEach(shuffledCard => {
						if(shuffledCard.matchId === aMatchId) {
							shuffledCard.taken = true;
						}
					})
					setShuffledCards(newShuffled);
				}, 4000);
			}
		} else {
			setTimeout(function(){ restartDeck(); }, 2000);
		}
		setSelectedCards([]);
	}

	const restartDeck = () => {
		let newShuffled = shuffledCards.slice();
		newShuffled.forEach(shuffledCard => {
			shuffledCard.isOpen = false;
		})
		setShuffledCards(newShuffled);
	}

	return (
		<div className="Board">
			Score: {userScore}
			<div className="Board-cards">
				{shuffledCards.map((card, index) => (
					<Card
						{...card}
						key={index}
						onCardSelect={(card) => onCardSelect(card)}
					/>
				))}
			</div>
		</div>
	)
}
