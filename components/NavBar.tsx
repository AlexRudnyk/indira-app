import { Great_Vibes } from "next/font/google";
import Mandala from "../public/mandala.png";
import Image from "next/image";
import { AuthNav, UserNav } from ".";
import Link from "next/link";

const great_vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const NavBar = () => {
  let isLoggedIn = true;

  return (
    <header className="shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)]">
      <div className="flex items-center ml-auto mr-auto w-[1280px] h-[96px] p-5 relative justify-between">
        <Link href="/">
          <span
            className={`${great_vibes.className} text-5xl text-[var(--primary)]`}
          >
            Indira
          </span>
          <Image
            src={Mandala}
            alt="logo"
            width={80}
            className="absolute top-[5px] left-[5px] -z-10 opacity-60"
          />
        </Link>
        <nav className="flex items-center">
          {isLoggedIn ? <UserNav /> : <AuthNav />}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
