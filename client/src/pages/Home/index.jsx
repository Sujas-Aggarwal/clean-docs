import { setTitle } from "../../utils/generalFunctions";
import { Navbar } from "../../components/Navbar";
export const Home = () => {
  setTitle("Home");

  return (
    <div>
      <Navbar />
      <div
        className="w-full home-bg min-h-screen flex justify-center md:items-center gap-2 md:gap-0  text-white px-6 md:flex-row flex-col"
      >
        <h1 className="text-4xl font-bold font-[Poppins]">
          Don't Judge the UI, it was built in like 2 days
        </h1>
        <p className="md:mt-[-20px] md:ml-[10px] text-gray-300 font-[Poppins]">
          Trust me bro, its good
        </p>
      </div>
    </div>
  );
};
