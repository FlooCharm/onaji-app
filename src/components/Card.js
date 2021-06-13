import React from 'react';

export default function Card(props) {
	let {
		index,
		onCardSelect,
		cardImage,
		matchId,
		isFlipped,
		isDisabled,
		isInactive,
	} = props;
	const handleClick = () => {
		!isFlipped && !isDisabled && onCardSelect(index);
	};

	return (
		<div
			className={`Card ${isInactive ? 'CardTaken' : ''}`}
			onClick={handleClick}
		>
			{ isFlipped && !isInactive && (
				<img
					className="CardImage"
					src={cardImage}
					alt={`card${matchId}`}
				/>
			)}
		</div>
	)
}
