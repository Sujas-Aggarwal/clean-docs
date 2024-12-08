import { useState } from "react";
import { Link } from "react-router-dom";

export default function EditorHeader({
  documentName = "Untitled",
  setDocumentName = (title) => {},
  saveFunction = () => {},
  isSaving = false,
}) {
  const [title, setTitle] = useState(documentName);
  function printPage() {
    window.print();
  }
  return (
    <div className="flex print:hidden z-[1000] flex-col h-[90px] justify-center items-center bg-white w-full fixed top-0 left-0">
      <div className="h-[35px] w-full flex px-4 items-center gap-1 bg-white ">
        <Link to={"./.."}>
          <img
            width={30}
            height={30}
            className="mb-[-6px]"
            src="https://images.freeimages.com/fic/images/icons/2813/flat_jewels/512/file.png"
            alt=""
          />
        </Link>
        <input
          min={1}
          max={20}
          className="font-[600] text-xl outline-none mb-[-6px]"
          value={title}
          onChange={(e) => {
            if (e.target.value.includes(" ") || e.target.value.length > 20)
              return;
            setDocumentName(e.target.value);
            setTitle(e.target.value);
          }}
        />
        <div className="ml-auto"></div>
        {isSaving ? (
          <div className="flex ml-auto gap-2 justify-center items-center">
            <img src="/cloud.gif" alt="saving" className="w-[25px]" />
            <p className="text-sm px-1">Saving...</p>
          </div>
        ) : (
          <div className="flex ml-auto gap-1 justify-center items-center">
            <img src="/cloud.svg" alt="" className="w-[20px]" />
            <p className="text-sm px-1 pr-2 ">All changes saved</p>
          </div>
        )}
        <button
          onClick={saveFunction}
          className="text-xs px-3  py-[6px] bg-blue-500 rounded-sm text-white hover:bg-blue-600 active:bg-blue-700"
        >
          Save Changes
        </button>
        <h1 className="text-sm font-extralight text-center absolute top-[15px] left-[50%] translate-x-[-50%] md:flex hidden gap-1">
          Clean Docs <p className="text-[10px] text-gray-400 mt-[-2px]">Dev</p>
        </h1>
      </div>
      <nav className="flex justify-between items-center h-[45px] bg-white  w-full">
        <span onClick={() => {}} className="cursor-pointer"></span>
        <div className="flex-grow">
          <div className="flex items-center  text-sm px-4 gap-3 text-gray-600">
            <p className="option cursor-pointer">File</p>
            <p className="option cursor-pointer">Edit</p>
            <p className="option cursor-pointer">View</p>
            {/* <p className="option">Insert</p> */}
            {/* <p className="option">Format</p> */}
            <p onClick={printPage} className="option cursor-pointer">Export</p>
            <button className="ml-auto border rounded-full p-1 px-3 text-center flex justify-center items-center hover:bg-blue-900 hover:text-white transition-all duration-300">
              Share
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
