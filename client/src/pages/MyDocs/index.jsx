import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Navbar } from "../../components/Navbar";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

function MyDocs() {
  const templates = [
    {
      name: "New Document",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png",
      template: "new",
    },
    {
      name: "Starter Sheet",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/1wyFqxsRmKm9q--7j4WRmBMn694YdhV6hmNrfh4rVm2E_400.png",
      template: "starter",
    },
    {
      name: "Letter Template",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/10e8_E36oj6_LuCRzckBFX_9oqbCHntmYB-jxB5U9gsw_400_2.png",
      template: "letter",
    }
  ];
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
          templateName: type,
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
        <div className="border-b flex flex-cl gap-4 flex-col pb-10">
          <h1>Templates</h1>
          <div className="flex gap-4">
            {templates.map((template, index) => {
              return (
                <div className="flex flex-col gap-2">
                  <div
                    key={index}
                    onClick={() => {
                      CreateDocument(template.template);
                    }}
                    title={template.name}
                    className="w-[150px] h-[200px] overflow-hidden outline
                    outline-gray-100 flex justify-center items-center
                    text-center hover:outline-blue-100 transition-all
                    duration-150 cursor-pointer"
                  >
                    <img src={template.img} alt="" />
                  </div>
                  <p className="font-thin">{template.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-t-[4px] pt-4 flex flex-cl gap-4 flex-col pb-10">
          <h1>Saved Documents</h1>
          <div className="flex flex-col gap-0 w-full">
            {docs.map((doc, index) => {
              return (
                <Link to={`/docs/${doc.id}`} key={index} className="z-10">
                  <div className="border-b-[2px] w-full p-2    flex  items-center   cursor-pointer hover:shadow-md hover:shadow-black/10 transition-all duration-200">
                    <img
                      src="https://images.freeimages.com/fic/images/icons/2813/flat_jewels/512/file.png"
                      className="w-[60px] h-[60px]"
                      alt="Document"
                    />
                    <p>{doc.name}</p>
                    <div className="flex ml-auto pr-4 gap-6 text-sm items-center">
                      {new Date(doc.updated_at)
                        .toString()
                        .split(" ")
                        .slice(1, 4)
                        .join(" ")}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          axios
                            .delete(`/documents/${doc.id}`, {
                              withCredentials: true,
                            })
                            .then(() => {
                              toast.success("Document Deleted");
                              let newDocs = docs.filter((d) => d.id !== doc.id);
                              setDocs(newDocs);
                            })
                            .catch((err) => toast.error("Failed to delete"));
                        }}
                        className="p-2 z-20 hover:scale-105 transition-all duration-150 px-4 text-center flex justify-center items-center bg-violet-300 rounded-sm"
                      >
                        Delete
                      </button>
                    </div>
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
