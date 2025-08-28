import { PencilRulerIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import {Link} from "@tanstack/react-router";

export default function Header() {

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="">
					<Link to="/" className="flex gap-4 text-lg">
          <PencilRulerIcon/>
					TODO Center
					</Link>
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
}
