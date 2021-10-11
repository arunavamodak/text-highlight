import React, { useEffect } from "react";
import HighlightPop from "react-highlight-pop";
import data from './sample.json';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { addMarker, removeMarker } from "./Actions/action";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const sections = data["_source"]["fullText"];

  const markers = useSelector(state => state.markers.markers);

  useEffect(() => {

    if (markers.length) {
      markers.forEach((item) => {

        let container = document.getElementById(item.section);

        const { childNodes } = container;

        console.log(childNodes);

        if (childNodes.length === 1) {

          let range = new Range();

          range.setStart(childNodes[0], item.start);
          range.setEnd(childNodes[0], item.end);

          let node = highlightRange(range, item.id);

          range.deleteContents();

          range.insertNode(node);
        }
        else {
          console.log(childNodes, container);
        }

        let wholeText = "";

        childNodes.forEach(node => {
          wholeText = wholeText + node.textContent;
        })

        let para = document.createElement("p")
        let textNode = document.createTextNode(wholeText);

        para.appendChild(textNode);
        para.setAttribute("id", item.section);
      });


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
    }

  }, [markers]);

  function highlightSelection() {
    let userSelection = window.getSelection();

    console.log(userSelection.getRangeAt(0));

    const temp = {
      id: new Date().toString(),
      text: userSelection.toString(),
      section: userSelection.baseNode.parentElement.id, //id of the section
      start: userSelection.getRangeAt(0).startOffset,
      end: userSelection.getRangeAt(0).endOffset,
    };

    dispatch(addMarker(temp));
  }

  function highlightRange(range, id) {
    let newNode = document.createElement("mark");

    // newNode.setAttribute("style", "background-color: yellow;");

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
        <p id="Introduction">
          mmemorially, human societies have been using herbs and their products as
          sources of medicine, nutrition, and industrial applications[1].As an example of the
          role of plant species in human life, in ancient Egypt, the first paper was
          made from papyrus (Cyperus papyrus L.), a species of the Cyperaceae family[2].Cyperaceae
          includes grass-like monocots, comprising around 5600 species and 100 genera, and the family
          is widespread on all continents with the exception of Antarctica.The second largest genus in this
          family is Cyperus, with ~950 species[3].Cyperus spp.are most commonly known as
          weeds, despite some cultures using them for medicinal purposes and as a source of food[4].Cyperus
          spp.predominantly exist in the wetlands throughout the globe in the tropical regions and act as source
          of primary productivity.The tubers, shoots, and fruits of this species are produced in larger
          quantities and act as a source of food for amphibians and aquatic animals[5].The traditional use
          of Cyperus plants has been reported from all over the world as a remedy against various human ailments
          [6]including treatment of stomach and bowel disorders, as diuretic, digestant, and lactodepurant purposes.
          The plant extracts also act as a selective drug for the treatment of bronchitis, blood disorders, menstrual
          irregularities, amenorrhea, diarrhea, dysentery, and inflammatory diseases[7].Interestingly and despite
          Cyperus including more than 950 species, the three most commonly reported species are purple
          nutsedge (Cyperus rotundus L.), yellow nutsedge (Cyperus esculentus L.), and C.papyrus.Cyperus
          rotundus is the most well-known species of Cyperus in South Asia, a perennial weed that grows best
          in high-moisture soil and reproduces easily through rhizomes and tubers[7].This species is indigenous
          to the tropical and subtropical parts of the Old World, and despite the fact that it can be found detrimental
          in cultivated fields, it has several beneficial uses as medicine since ancient times[8].Cyperus rotundus rhizomes
          and tubers are mentioned in Oriental traditional medicine to treat fever, digestive disorders,
          and menstrual irregularities in several countries including China, India, Iran, and Japan[9, 10].
          Cyperus esculentus L.is an edible perennial grass-like plant native to the Old World.This species
          exists widely throughout tropics and subtropics of North America[11].The earliest records of its
          use dated back to predynastic times about 6000 y ago in North America and Egypt; however, its different
          varieties are mostly found in Southern Europe, South-Middle East, and Africa[12].It has been also
          considered as a foodstuff since ancient times, especially in ancient Egypt.It is a crop of early
          domestication and was regarded important with the other crops of the Nile Valley.Its dry tubers have been
          found in tombs from predynastic times about 6000 y ago.Cyperus
          esculentus tubers were roasted and used as a sweetmeat in Egypt during
          the ancient times[12].Cyperus esculentus is widely cultivated for its edible tubers,
          called earth almonds or tigernuts[13], which are consumed as a popular snack in Africa and
          for making a sweet milk-like beverage, horchata de chufa, commonly consumed in Spain and other
          European and Latin-American countries[14].Tigernut is a rich source of protein and minerals making the beverage
          highly nutritious (phosphorus and potassium)[12].Cyperus papyrus L.is an aquatic sedge mostly known for its use
          in the preparation of the paper by the traditional Egypt, Greek, and Roman civilizations.Paper made from dried,
          pressed, and woven strips of culm pith had been used since 3500 BC by ancient civilizations
          in the Egypt and the Mediterranean Basin.It was the only widespread recording medium until the
          8th century in Europe[15].Other species of the Cyperus family include Cyperus compressus L.,
          Cyperus javanicus Houtt., and Cyperus monocephalus Roxb.(Cyperus cephalotes).For instance,
          C.compressus is a grass-like plant and is widely distributed across the tropical and subtropical
          regions of the world.In India, the powdered roots of C.compressus have long been
          used in traditional medicine by the Santhal tribes to treat intestinal helminthic infections[16].
          Examples of folk medicinal and edible uses of Cyperus spp.reported from different parts of the world
          are briefly shown in Table 1.Taken together, the multiple potentialities reported so far for the most
          widely exploited Cyperus spp.were considered.This review is the first of its kind that gives a comprehensive
          discussion on the recent findings related to chemical composition, biological activities, and
          pharmacological effects of such promissory naturally occurring matrices.The safety and toxicity
          effects of the Cyperus sp.extracts are also considered in the scope of the manuscript.The diagram
          showing various components discussed in the review are presented in Figure 1.
        </p>
        {/* {
          sections.map(item => {
            return (
              <div style={{ marginBottom: "60px" }} key={item.title}>
                <h1>{item.title}</h1>

                <p id="Introduction">
                  mmemorially, human societies have been using herbs and their products as sources of medicine, nutrition, and industrial applications [1]. As an example of the role of plant species in human life, in ancient Egypt, the first paper was made from papyrus (Cyperus papyrus L.), a species of the Cyperaceae family [2]. Cyperaceae includes grass-like monocots, comprising around 5600 species and 100 genera, and the family is widespread on all continents with the exception of Antarctica. The second largest genus in this family is Cyperus, with ~950 species [3]. Cyperus spp. are most commonly known as weeds, despite some cultures using them for medicinal purposes and as a source of food [4]. Cyperus spp. predominantly exist in the wetlands throughout the globe in the tropical regions and act as source of primary productivity. The tubers, shoots, and fruits of this species are produced in larger quantities and act as a source of food for amphibians and aquatic animals [5].The traditional use of Cyperus plants has been reported from all over the world as a remedy against various human ailments [6] including treatment of stomach and bowel disorders, as diuretic, digestant, and lactodepurant purposes. The plant extracts also act as a selective drug for the treatment of bronchitis, blood disorders, menstrual irregularities, amenorrhea, diarrhea, dysentery, and inflammatory diseases [7]. Interestingly and despite Cyperus including more than 950 species, the three most commonly reported species are purple nutsedge (Cyperus rotundus L.), yellow nutsedge (Cyperus esculentus L.), and C. papyrus. Cyperus rotundus is the most well-known species of Cyperus in South Asia, a perennial weed that grows best in high-moisture soil and reproduces easily through rhizomes and tubers [7]. This species is indigenous to the tropical and subtropical parts of the Old World, and despite the fact that it can be found detrimental in cultivated fields, it has several beneficial uses as medicine since ancient times [8]. Cyperus rotundus rhizomes and tubers are mentioned in Oriental traditional medicine to treat fever, digestive disorders, and menstrual irregularities in several countries including China, India, Iran, and Japan [9, 10].Cyperus esculentus L. is an edible perennial grass-like plant native to the Old World. This species exists widely throughout tropics and subtropics of North America [11]. The earliest records of its use dated back to predynastic times about 6000 y ago in North America and Egypt; however, its different varieties are mostly found in Southern Europe, South-Middle East, and Africa [12]. It has been also considered as a foodstuff since ancient times, especially in ancient Egypt. It is a crop of early domestication and was regarded important with the other crops of the Nile Valley. Its dry tubers have been found in tombs from predynastic times about 6000 y ago. Cyperus esculentus tubers were roasted and used as a sweetmeat in Egypt during the ancient times [12]. Cyperus esculentus is widely cultivated for its edible tubers, called earth almonds or tigernuts [13], which are consumed as a popular snack in Africa and for making a sweet milk-like beverage, horchata de chufa, commonly consumed in Spain and other European and Latin-American countries [14]. Tigernut is a rich source of protein and minerals making the beverage highly nutritious (phosphorus and potassium) [12].Cyperus papyrus L. is an aquatic sedge mostly known for its use in the preparation of the paper by the traditional Egypt, Greek, and Roman civilizations. Paper made from dried, pressed, and woven strips of culm pith had been used since 3500 BC by ancient civilizations in the Egypt and the Mediterranean Basin. It was the only widespread recording medium until the 8th century in Europe [15]. Other species of the Cyperus family include Cyperus compressus L., Cyperus javanicus Houtt., and Cyperus monocephalus Roxb. (Cyperus cephalotes). For instance, C. compressus is a grass-like plant and is widely distributed across the tropical and subtropical regions of the world. In India, the powdered roots of C. compressus have long been used in traditional medicine by the Santhal tribes to treat intestinal helminthic infections [16]. Examples of folk medicinal and edible uses of Cyperus spp. reported from different parts of the world are briefly shown in Table 1.Taken together, the multiple potentialities reported so far for the most widely exploited Cyperus spp. were considered. This review is the first of its kind that gives a comprehensive discussion on the recent findings related to chemical composition, biological activities, and pharmacological effects of such promissory naturally occurring matrices. The safety and toxicity effects of the Cyperus sp. extracts are also considered in the scope of the manuscript. The diagram showing various components discussed in the review are presented in Figure 1.
                </p>
                <p id={item.title}>{item["content"]}</p>
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
        } */}
      </HighlightPop>
    </div>
  );
}

export default App;

