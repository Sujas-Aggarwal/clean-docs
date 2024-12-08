import React from "react";
import { Editor } from "react-draft-wysiwyg";

export default Documentation;
import { convertFromRaw, EditorState } from "draft-js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

function Documentation() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      convertFromRaw({
        entityMap: {},
        blocks: [
          {
            key: "15rhj",
            text: "Journey-",
            type: "header-one",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 8,
                style: "BOLD",
              },
              {
                offset: 0,
                length: 8,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "3ena7",
            text: "Honestly, initially taking on this challenge, I thought this would be an easy competition as according to my thought process at that time, I could just do the following -",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 170,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "f3vu4",
            text: "1. Pick any ready-made MDX editor and store the documents in MySQL database.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 76,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "5rac5",
            text: "2. Use Websockets to just instantaneously update docs and enable real-time collaboration.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 89,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "2mirk",
            text: "3. To Enable Multi Page, I would rely on the editor inbuild feature and for optimization, I could just somehow enable conditional rendering using webassembly or something simpler.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 179,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "1u8s",
            text: "But, I didn't knew, that this was gonna be a hell of a ride.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 60,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "9mp86",
            text: "Day 1 :",
            type: "header-two",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 7,
                style: "BOLD",
              },
              {
                offset: 0,
                length: 7,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "8hd5b",
            text: "The Start was quite convenient. I had the authentication flow set up with React (Vite), NodeJS, and MariaDB technologies.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 121,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "aiapj",
            text: "I started by enabling tailwind support but forgot to allow typescript which I regretted a lot later.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 100,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "b4ao0",
            text: "I did some research on what Google Docs is all about and Microsoft Word do under the hood,",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 90,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "2253b",
            text: "through that research, I got to know about a lot of things, for instance -",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 74,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "11kng",
            text: "WYSIWYG (What you see is what you get) Editors",
            type: "unordered-list-item",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 46,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "3d8s1",
            text: "I scrolled through a lot of documentation about different editors, each offering great features. Some were free, while some were paid such as syncfusion.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 153,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "1clbm",
            text: "In the end, I settled for QuillJS which is widely popular and extremely easy to use.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 84,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "8f8g4",
            text: 'But you know - "विनाश काले विपरीत बुद्धि"!',
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 42,
                style: "fontfamily-Tahoma",
              },
              {
                offset: 16,
                length: 24,
                style: "BOLD",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "48v4g",
            text: "I somehow convinced myself that I couldn't customize Quill and needed to switch to a more customizable editor and lucky me, I found tiptap editor which was still good but but but....",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 182,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "86n9n",
            text: 'I suddenly got the feeling that this is too much customizable and is not very good with back supporting copy paste from ms word and google docs and decided to shift to a completely new editor which I am currently using that is "react-draft-wysiwyg" which is kind of extension to "draft-js" and it was very much to my liking, very customizable yet easy to use.',
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 359,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "78idq",
            text: "I ended up sleeping good that night thinking i have more than enough time to implement the rest of the features not knowing what was waiting for me.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 148,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "2kmb0",
            text: "Day 2 :",
            type: "header-two",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 7,
                style: "BOLD",
              },
              {
                offset: 0,
                length: 7,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "f7n7p",
            text: "I woke up pretty that day, thinking that the hard part was over and only the easy part remained while the reality was just the opposite.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 136,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "92p0a",
            text: "I started working on the editor and released a Basic version 0.0.1 and was quite satisfied with that.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 101,
                style: "fontfamily-Tahoma",
              },
              {
                offset: 47,
                length: 19,
                style: "color-rgb(44,130,201)",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "5kij6",
            text: "This version still did not supported saving or anything, but was good as a blank paper destined to be forgotten.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 112,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "au3jh",
            text: "I was feeling busy with some other matters that day and decided to end the day with some minor bug fixes.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 105,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "bukfu",
            text: "Day 3 :",
            type: "header-two",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 7,
                style: "BOLD",
              },
              {
                offset: 0,
                length: 7,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "5j43e",
            text: "Today was the day, I realized how much trouble I am in.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 55,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "3b2sl",
            text: "I woke up early to run my fingers across the keyboard in my own editor feeling proud that I suddenly realised, there was no Table Button in the toolbar!",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 152,
                style: "fontfamily-Tahoma",
              },
              {
                offset: 124,
                length: 13,
                style: "ITALIC",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "a13bd",
            text: 'I researched about it, searched it everywhere, looked for documentation, gpts, github repos, and what not only to realize that the format draftjs saves the document that is "blocks", it can\'t support tables!',
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 207,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "g1iv",
            text: 'Once again, I found myself scrolling through documentation of various new rich text editors to help me remove the weights of my neck and this time I found "mdxEditor".',
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 167,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "4k59d",
            text: "A Simple and Sweet Markdown editor which supported Markdown! You can check it by going here /markdown. ",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 103,
                style: "fontfamily-Tahoma",
              },
              {
                offset: 92,
                length: 11,
                style: "color-rgb(44,130,201)",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "939lo",
            text: "I hope you noticed, yes, markdown don't support text color, font size and a lot of other limitations like the bullet points not working etc.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 140,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "e0sbi",
            text: "During this same time, I got to know that implementing websockets would not be as easy as I initially thought since I found about Operational Transformations, Conflict Free Replicated Data Types, and I knew that implementing these would definitely require a lot of time and effort.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 281,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "3d8h3",
            text: "Hence, I compromised with the table and fell back to this editor.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 65,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "eh8sb",
            text: "Midnight - Time was tight, I had 4 hours to implement the complete realtime collaboration feature while working on the UI and removing the minor bugs.",
            type: "header-four",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 11,
                style: "BOLD",
              },
              {
                offset: 0,
                length: 150,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "2cerb",
            text: 'Around 12AM, I finally finished everything, using the help of "express-ws" library which helped my simply my code complexity in the backend.',
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 140,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "7h32b",
            text: "------------------------------------------------------------------------------------------------------------------",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 114,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "4j2j4",
            text: "After this, I made some more minor upgrades and here I am writing, this documentation to brag about the app I made.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 115,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "d8mhp",
            text: "TBH, I am proud of this regardless of how it turned out.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 56,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "a2udo",
            text: "Thanks for reading,",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 19,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "7imii",
            text: "I like to write and I love to listen.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 37,
                style: "fontfamily-Tahoma",
              },
            ],
            entityRanges: [],
            data: {},
          },
          {
            key: "bp75u",
            text: "Contact me on - sujaskhadria@gmail.com  ",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [
              {
                offset: 0,
                length: 40,
                style: "fontfamily-Tahoma",
              },
              {
                offset: 16,
                length: 24,
                style: "BOLD",
              },
            ],
            entityRanges: [],
            data: {},
          },
        ],
      })
    )
  );

  return (
    <div className="w-[80%] mx-auto">
      <Navbar/>
      <div className="h-[60px] fixed bg-white top-0 left-0 z-10 w-full"></div>
      <div className="h-[60px]"></div>
      <Editor toolbarClassName="hidden" editorState={editorState} onEditorStateChange={setEditorState} />
      <p className="pb-8 italic font-bold  text-right">~ Created using <Link className="text-indigo-600" to="/">Clean Docs</Link></p>
    </div>
  );
}
