import React, { useState, useEffect, useRef } from 'react';
import cardIndex from '../cardIndex.js';
import Card from './Card';
import Modal from 'react-modal';

function shuffleCards(cards) {
	return cards.slice().sort(() => Math.random() - 0.5)
}

const onaji = document.getElementById('onaji');
if (onaji) {
	Modal.setAppElement('#onaji');
}

export default function Board(props) {
	const [ shuffledCards, setShuffledCards ] = useState(shuffleCards(cardIndex));
	const [ selectedCards, setSelectedCards ] = useState([]);
	const [ clearedCards, setClearedCards ] = useState({});
	const [ userScore, setUserScore ] = useState(0);
	const [ shouldDisableAllCards, setShouldDisableAllCards ] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const timeout = useRef(null);

	const handleCardSelect = (index) => {
		if (selectedCards.length === 1) {
			setSelectedCards((prev) => [...prev, index]);
			setShouldDisableAllCards(true);
		} else {
			clearTimeout(timeout.current);
			setSelectedCards([index]);
		}
	};

	const checkCompletion = () => {
		if (Object.keys(clearedCards).length === (cardIndex.length / 2)) {
			setShowModal(true);
		}
	};

	const compareSelected = () => {
		const [first, second] = selectedCards;
		setShouldDisableAllCards(false);
		if (shuffledCards[first].matchId === shuffledCards[second].matchId) {
			setUserScore((prev) => prev + 1);
			setClearedCards((prev) => ({ ...prev, [shuffledCards[first].matchId]: true }));
			setSelectedCards([]);
			return;
		}
		// This is to flip the cards back after 500ms duration
		timeout.current = setTimeout(() => {
			setSelectedCards([]);
		}, 500);
	};

	const restartDeck = () => {
		setUserScore(0);
		setClearedCards({});
		setSelectedCards([]);
		setShowModal(false);
		setShouldDisableAllCards(false);
		// set a shuffled deck of cards
		setShuffledCards(shuffleCards(cardIndex));
	};

	useEffect(() => {
		let timeout = null;
		if (selectedCards.length === 2) {
			timeout = setTimeout(compareSelected, 300);
		}
		return () => {
			clearTimeout(timeout);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCards]);

	useEffect(() => {
		checkCompletion();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clearedCards]);

	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [showModal])
	
	const checkIsFlipped = (index) => {
		return selectedCards.includes(index);
	};
	const checkIsInactive = (card) => {
		return Boolean(clearedCards[card.matchId]);
	};

	return (
		<div className="Board">
			Score: {userScore}
			<div className="Board-cards">
				{shuffledCards.map((card, index) => (
					<Card
						{...card}
						key={index}
						index={index}
						isDisabled={shouldDisableAllCards}
						isInactive={checkIsInactive(card)}
						isFlipped={checkIsFlipped(index)}
						onCardSelect={handleCardSelect}
					/>
				))}
			</div>
			<Modal
				isOpen={showModal}
				className="Modal"
			>
				やった! \(^ . ^)/

				<button
					className="Button"
					onClick={restartDeck}
				>Restart</button>
			</Modal>
		</div>
	)
}
