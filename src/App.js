// import React, { useState, useEffect } from "react";
// import './App.css';
// import data from './sample.json';
// import Highlighter from "react-highlight-words";

// function App() {

//   const [marks, setMarks] = useState([]);

//   useEffect(() => {
//     // console.log(marks);
//   }, [marks]);

//   const select = () => {
//     const selection = window.getSelection();

//     const t = [...marks];

//     t.push({
//       text: selection.toString(),
//       start: selection.getRangeAt(0).startOffset,
//       end: selection.getRangeAt(0).endOffset,
//       section: selection.anchorNode.parentNode.id
//     })

//     setMarks(t);
//   }

//   const getHighlightedText = (text, section) => {

//     const parts = marks.filter(item => item.section === section);

//     let t = text;

//     parts.map(part => {
//       const begin = text.slice(0, part.start)
//       const substr = text.slice(part.start, part.end + 1);
//       const end = text.slice(part.end, text.length);

//       t = (
//         <span>{begin}<span style={{ backgroundColor: "yellow" }}>{substr}</span>{end}</span>
//       )
//     })

//     return <p id="introduction" style={{ lineHeight: "25px" }}>{t}</p>;
//   }


//   return (
//     <div className="App">

//       <button onClick={() => {
//         select();
//       }}>Select</button>


//       <button onClick={(e) => {
//         const selection = window.getSelection();
//         console.log(selection.getRangeAt(0));
//         console.log(selection.toString());
//       }}>Deselect</button>

//       <h1>Introduction</h1>

//       <Highlighter
//         highlightClassName="YourHighlightClass"
//         searchWords={["and", "or", "the"]}
//         autoEscape={true}
//         textToHighlight={data.Introduction.Content}
//       />,


//       {/* <p id="introduction" style={{ lineHeight: "25px" }}></p> */}

//       {/* <p id="introduction" style={{ lineHeight: "25px" }}>{data.Introduction.Content}</p> */}
//       <br /><br /><br />
//       <h1>Conclusion</h1>
//       <p id="conclusion" style={{ lineHeight: "25px" }}>{data.Conclusion.Content}</p>
//     </div>
//   );
// }

// export default App;


import React, { useEffect } from "react";
import HighlightPop from "react-highlight-pop";
import data from './sample.json';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { addMarker, removeMarker } from "./Actions/action";

function App() {
  const dispatch = useDispatch();

  const markers = useSelector(state => state.markers.markers);

  useEffect(() => {
    markers.forEach((item) => {
      let node = highlightRange(item.selection, item.id);

      let range = item.selection;

      range.deleteContents();

      range.insertNode(node);
    });
  }, [markers]);

  function highlightSelection() {
    let userSelection = window.getSelection();

    const temp = {
      id: new Date().toString(),
      text: userSelection.toString(),
      selection: userSelection.getRangeAt(0),
      section: userSelection.anchorNode.parentNode.id,
    };

    dispatch(addMarker(temp));
  }

  function highlightRange(range, id) {
    let newNode = document.createElement("span");

    newNode.setAttribute("style", "background-color: yellow;");

    newNode.onclick = function () {
      let contents = document.createTextNode(newNode.innerText).wholeText;
      if (window.confirm("Do you want to deselect it?")) {
        deletenode(newNode, contents);
        dispatch(removeMarker(id));
      }
    };
    newNode.appendChild(range.cloneContents());
    return newNode;
  }

  function deletenode(node, i) {
    let contents = document.createTextNode(node.innerText);
    node.parentNode.replaceChild(contents, node);
  }

  return (
    <div className="App">
      <HighlightPop
        popoverItems={(itemClass) => (
          <>
            <span className={itemClass} onClick={() => highlightSelection()}>
              select
            </span>
          </>
        )}
      >
        <h1>Introduction</h1>
        <p id="introduction" style={{ lineHeight: "25px" }}>{data.Introduction.Content}</p>
        <br />
        <h1>Conclusion</h1>
        <p id="conclusion" style={{ lineHeight: "25px" }}>{data.Conclusion.Content}</p>
      </HighlightPop>
    </div>
  );
}

export default App;

