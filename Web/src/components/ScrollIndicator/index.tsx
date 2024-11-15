interface ScrollIndicatorProps {
	targetSection: string;
	arrowColor: string;
}

export function ScrollIndicator({
	targetSection,
	arrowColor,
}: ScrollIndicatorProps) {
	return (
		<div className="relative scroll-smooth flex justify-center items-center">
			<div className="absolute inset-x-0 bottom-64 sm:bottom-48 xl:bottom-4">
				<div className="flex flex-col justify-center items-center text-white">
					<a href={targetSection}>
						<svg
							className="sm:block w-10 h-10 sm:w-16 sm:h-16 animate-bounce"
							fill="none"
							stroke={arrowColor}
							stroke-width="2"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19 9l-7 7-7-7"></path>
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}
