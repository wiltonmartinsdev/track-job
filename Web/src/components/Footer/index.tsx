export function Footer() {
	return (
		<footer className="border border-blue-700 bg-blue-600 h-14 flex justify-center items-center rounded-t-2xl fixed bottom-0 left-0 right-0 z-10">
			<div className="flex flex-col items-center justify-center gap-0.5">
				<a
					href="https://devwiltonmartins.vercel.app"
					target="_blank"
					rel="noopener noreferrer"
					className="text-white text-xs hover:text-black hover:font-semibold hover:text-sm transition-all duration-300">
					Desenvolvido por Wilton Lira Martins 👨🏻‍💻
				</a>

				<p className="text-white text-xs hover:text-black hover:font-semibold cursor-default">
					Copyright &copy; 2025 - Todos os direitos reservados
				</p>
			</div>
		</footer>
	);
}
