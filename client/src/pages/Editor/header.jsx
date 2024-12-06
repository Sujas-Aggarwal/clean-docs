export default function EditorHeader() {
  return (
    <navbar className="flex justify-between items-center p-2">
      <span onClick={() => {}} className="cursor-pointer"></span>
      <div className="flex-grow">
        <div className="flex items-center text-sm px-4 gap-3 text-gray-600">
          <p className="option">File</p>
          <p className="option">Edit</p>
          <p className="option">View</p>
          <p className="option">Insert</p>
          <p className="option">Format</p>
          <p className="option">Tools</p>
          <button className="ml-auto">Share</button>
        </div>
      </div>
    </navbar>
  );
}
