import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Navbar } from "../../components/Navbar";

import { Link, useNavigate } from "react-router-dom";

function MyDocs() {
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function GetDocuments() {
      await axios
        .get("/documents", { withCredentials: true })
        .then((documents) => {
          console.log(documents.data);
          setDocs(documents.data);
        })
        .catch((err) => console.log(err));
    }
    GetDocuments();
  }, []);
  async function CreateDocument(type) {
    await axios
      .put(
        "/documents",
        {
          isStarterDocument: type == "starter" ? true : false,
          isNewDocument: true,
        },
        { withCredentials: true }
      )
      .then((document) => {
        console.log(document.data);
        navigate(`/docs/${document.data.documentId}`);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Navbar />
      <div className="h-[80px]"></div>
      <div className="px-4">
        <div className="border-b flex flex-cl gap-4 flex-col">
          <h1>Create New Doc</h1>
          <div className="flex gap-4">
            <div
              onClick={() => {
                CreateDocument("new");
              }}
              title="Create New Document"
              className="w-[100px] h-[100px] mb-10 rounded-md bg-slate-600 flex justify-center items-center text-[90px] text-center text-white hover:scale-105 transition-all duration-150 shadow-xl shadow-black/20 cursor-pointer"
            >
              <span className="mt-[-15px]">+</span>
            </div>
            <div
              onClick={() => {
                CreateDocument("starter");
              }}
              title="Create New Document"
              className="w-[100px] h-[100px] mb-10 rounded-md bg-white text-black flex justify-center items-center text-xs text-center  hover:scale-105 transition-all duration-150 shadow-xl shadow-black/20 cursor-pointer"
            >
              <span>Starter Sheet</span>
            </div>
          </div>
        </div>
        <div className="border-b  flex flex-cl gap-4 flex-col pb-10">
          <h1>Saved Documents</h1>
          <div className="flex gap-4 max-w-screen flex-wrap">
            {docs.map((doc, index) => {
              return (
                <Link to={`/docs/${doc.id}`} key={index}>
                  <div className="w-[120px] h-[150px] rounded-md bg-white shadow-xl shadow-black/20 flex justify-center items-center text-center text-xs cursor-pointer hover:scale-105 transition-all duration-200">
                    {doc.id}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDocs;
