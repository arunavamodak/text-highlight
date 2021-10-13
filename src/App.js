import React, { useEffect, useRef, useState } from "react";
import HighlightPop from "react-highlight-pop";
import data from './sample.json';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { addMarker, removeMarker } from "./Actions/action";
import axios from "axios";
import reactElementToJSXString from "react-element-to-jsx-string";

function App() {
  const dispatch = useDispatch();

  const sections = data["_source"]["fullText"];

  const main = useRef(null);

  const [articleJSX, setArticleJSX] = useState("");

  const markers = useSelector(state => state.markers.markers);

  useEffect(() => {
    console.log(articleJSX);
  }, [articleJSX]);

  useEffect(() => {

    markers.forEach((item) => {

      let node = highlightRange(item.range, item.id);

      item.range.deleteContents();

      item.range.insertNode(node);

    });

    setArticleJSX(reactElementToJSXString(main.current.innerHTML));

  }, [markers]);


  // axios.post(`https://api.df-dev.net/literature/review`, {
  //   "projectId": "PID-2021-000100",
  //   "solutionProcessId": "SPID-2021-000100",
  //   "highlightedText": [{
  //     "sourceCollectionId": "PMC_8486547",
  //     "markers": markers
  //   }]
  // }, {
  //   "headers": {
  //     "Authorization": "d10464db-2539-467f-b506-3f0dd60656c6"
  //   }
  // }).then(res => {
  //   console.log(res);
  // });


  function highlightSelection() {
    let userSelection = window.getSelection();

    const temp = {
      id: new Date().toString(),
      text: userSelection.toString(),
      section: userSelection.baseNode.parentElement.id, //id of the section
      range: userSelection.getRangeAt(0)
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
    <div className="App" id="App">
      <HighlightPop
        popoverItems={(itemClass) => (
          <>
            <span className={itemClass} onClick={(e) => {
              highlightSelection();
            }}>
              select
            </span>
          </>
        )}
      >
        <div ref={main}>
          <div>
            {
              sections.map(item => {
                return (
                  <div style={{ marginBottom: "60px" }} key={item.title}>
                    <h1>{item.title}</h1>
                    <div id={item.title} dangerouslySetInnerHTML={{ __html: item["content"] }} />
                    {
                      item.children.length > 0 ?
                        (
                          item.children.map(child => {
                            return (
                              <div style={{ marginBottom: "30px" }}>
                                <h3>{child.title}</h3>
                                <div id={item.title + child.title} dangerouslySetInnerHTML={{ __html: child["content"] }} />
                              </div>
                            )
                          })
                        ) : null
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </HighlightPop>
    </div>
  );
}

export default App;

