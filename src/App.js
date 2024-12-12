import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [textErr, setTextErr] = useState(false);
  const [searchErr, setSearchErr] = useState(false);
  const [replaceErr, setReplaceErr] = useState(false);

  const findAndEdit = () => {
    setTextErr(text === "");
    setSearchErr(searchInput === "");
    setReplaceErr(replaceText === "");

    if (text && searchInput && replaceText) {
      const updatedText = text
        .split(" ")
        .map((item) => (item.toLowerCase() === searchInput.toLowerCase() ? replaceText : item))
        .join(" ");
      setText(updatedText);
    }
  };

  return (
    <div className="container-item">
      <h1>Find And Replace</h1>
      <div className="find-and-replace-container">
        <div className="input-container">
          <input
            type="text"
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSearchErr(false);
            }}
            className="input-item"
            placeholder="search here...."
          />
          {searchErr && <p className="err">Search term cannot be empty</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            onChange={(e) => {
              setReplaceText(e.target.value);
              setReplaceErr(false);
            }}
            className="input-item"
            placeholder="replace with..."
          />
          {replaceErr && <p className="err">Replacement text cannot be empty</p>}
        </div>

        <button
          type="button"
          onClick={findAndEdit}
          className="replace-button"
        >
          Find & Replace
        </button>
      </div>
      <textarea
        onChange={(e) => {
          setText(e.target.value);
          setTextErr(false);
        }}
        value={text}
        className="text-area"
        placeholder="Enter text here..."
      />
      {textErr && <p className="err">Text cannot be empty</p>}
    </div>
  );
}

export default App;
