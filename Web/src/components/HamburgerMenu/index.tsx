import { AnimatePresence, motion } from "framer-motion";
import { Divide as Hamburger } from "hamburger-react";
import { useState } from "react";

import { useAuth } from "@/contexts/auth";
import LogoutIcon from "@/assets/logout-icon.svg";

import { Button } from "../ui/button";

export const HamburgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { signOut, user } = useAuth();

	return (
		<div className="sm:hidden">
			<Hamburger
				toggled={isOpen}
				toggle={setIsOpen}
				color="#fff"
			/>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="font-roboto-flex font-black italic absolute top-[105px] right-0 w-full z-50 bg-blue-600 rounded-b-2xl ">
						<p className="text-center mt-4">
							Olá, {""}
							<span className="font-roboto-flex text-center">
								{user?.name?.split(" ")[0].toLocaleUpperCase()}
							</span>
						</p>

						<div>
							<Button
								onClick={signOut}
								className="text-md rounded-b-2xl">
								<img
									src={LogoutIcon}
									alt="Ícone de logout"
									className="brightness-0 invert"
								/>
								Sair
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
