import { FC, useState } from "react";
import { WebSocketProvider } from "./context/WebSocketContextProvider";
import VoiceAgent from "./components/VoiceAgent";
import Modal from "./components/ui/Modal";
import { Button, Call, Header } from "./components/ui";
import CoinsIcon from "./assets/Coins.svg";
import ChartLineUp from "./assets/ChartLineUp.svg";
import ShieldCheck from "./assets/ShieldCheck.svg";

const App: FC = () => {
  const wsUrl = "ws://localhost:8080";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <WebSocketProvider url={wsUrl}>
      <div className="@container h-screen flex">
        <div className="max-w-[962px] py-16 mx-auto flex flex-col">
          <Header toggleModal={toggleModal} />

          <div className="flex flex-col h-full justify-center gap-8  ">
            <h1 className="text-8xl font-bold mt-8">
              Solving problems. <br /> Thousands at a time.
            </h1>
            <div className="text-sm">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </div>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={toggleModal}
            title="Calling Jesica"
            headerActions={
              <Button variant="danger" isRound onClick={toggleModal}>
                <Call />
              </Button>
            }
          >
            <VoiceAgent />
          </Modal>

          <footer>
            <ul className="flex justify-between font-bold text-lg">
              <li>
                <img src={CoinsIcon} alt="Coins" className="inline mr-2" />{" "}
                Reduce costs by 40%.
              </li>
              <li>
                <img
                  src={ChartLineUp}
                  alt="Chart Line Up"
                  className="inline mr-2"
                />{" "}
                Increase customer satisfaction by 30%.
              </li>
              <li>
                <img
                  src={ShieldCheck}
                  alt="Shield Check"
                  className="inline mr-2"
                />{" "}
                Trusted by those you know.
              </li>
            </ul>
          </footer>
        </div>
      </div>
    </WebSocketProvider>
  );
};

export default App;
