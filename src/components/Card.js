import React from 'react';

export default function Card(props) {
	let {
		onCardSelect,
		isOpen,
		card,
		matchId,
		set,
		taken,
	} = props;

	return (
		<div
			className={`Card ${taken ? 'CardTaken' : ''}`}
			onClick={() => onCardSelect({ matchId, set })}
		>
			{ isOpen && !taken && (
				<img
					className="CardImage"
					src={card}
					alt={`card${matchId}`}
				/>
			)}
		</div>
	)
}
