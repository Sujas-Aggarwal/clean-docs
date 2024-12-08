import EditorHeader from "./header";
import "@mdxeditor/editor/style.css";
//import BlockTypeSelect
import {
  MDXEditor,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  imagePlugin,
  tablePlugin,
  frontmatterPlugin,
} from "@mdxeditor/editor";
function App() {
  return (
    <div className="flex flex-col w-full h-full my-0 bg-[rgba(239,246,255,0.5)]">
      <EditorHeader />
      <div className="h-[200px]"></div>
      <div className="content-block w-full flex justify-center items-center py-10">
        <MDXEditor
          contentEditableClassName="bg-white p-14 w-[827px] shadow-xl h-[1170px]"
          markdown=""
          plugins={[ 
            headingsPlugin(),
            listsPlugin(),
            linkPlugin(),
            quotePlugin(),
            markdownShortcutPlugin(),
            codeBlockPlugin(),
            imagePlugin(),
            tablePlugin(),
            frontmatterPlugin(),
            toolbarPlugin({
              toolbarClassName:
                "flex fixed top-[90px] left-0 w-full z-[1000] mx-auto bg-white border-y",
              toolbarContents: () => (
                <>
                  {" "}
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <CodeToggle />
                  <InsertImage />
                  <InsertTable />
                  <InsertThematicBreak />
                  <CreateLink />
                  <UndoRedo />
                </>
              ),
            }),
          ]}
        />
      </div>
    </div>
  );
}

export default App;
