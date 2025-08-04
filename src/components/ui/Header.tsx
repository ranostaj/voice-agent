import React from "react";
import { useWebSocketContext } from "../../hooks/useWebSocketContext";
import Button from "./Button";
import clsx from "clsx";

interface HeaderProps {
  toggleModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleModal }) => {
  const { isOpen } = useWebSocketContext();

  return (
    <header>
      <nav className="flex flex-row items-center justify-between">
        <ul className="flex flex-row items-center gap-12">
          <li className="text-lg font-bold">
            <a href="#" className="hover:text-primary-80 group active">
              Home{" "}
              <span className="group-hover:bg-primary-40 w-full h-1 block group-[.active]:bg-primary-40"></span>
            </a>
          </li>
          <li className="text-lg font-bold ">
            <a href="#" className="hover:text-primary-80 group">
              Products{" "}
              <span className="group-hover:bg-primary-40 w-full h-1 block"></span>
            </a>
          </li>
          <li className="text-lg font-bold">
            <a href="#" className="hover:text-primary-80 group">
              Organization{" "}
              <span className="group-hover:bg-primary-40 w-full h-1 block"></span>
            </a>
          </li>
          <li className="text-lg font-bold">
            <a href="#" className="hover:text-primary-80 group">
              Account{" "}
              <span className="group-hover:bg-primary-40 w-full h-1 block"></span>
            </a>
          </li>
          <li className="text-lg font-bold">
            <a href="#" className="hover:text-primary-80 group">
              Help{" "}
              <span className="group-hover:bg-primary-40 w-full h-1 block"></span>
            </a>
          </li>
        </ul>
        <Button variant="secondary" onClick={toggleModal}>
          <span
            className={clsx(
              "w-[12px] h-[12px] rounded-full border border-white animate-pulse mr-2",
              {
                "bg-green-500": isOpen,
                "bg-red-500": !isOpen,
              }
            )}
          ></span>{" "}
          Call Jesica
        </Button>
      </nav>
    </header>
  );
};
