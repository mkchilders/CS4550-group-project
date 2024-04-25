import { FaPlus, FaTrash } from "react-icons/fa";
import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";
import { EditorState, ContentState } from "draft-js";
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function FillInTheBlank({
  editQuestion,
  setEditQuestion,
  updateQuestion,
}: any) {
  const [editorState, setEditorState] = useState(() => {
    let content = ContentState.createFromText(
      editQuestion.question ? editQuestion.question : ""
    );
    return EditorState.createWithContent(content);
  });
  const updateAnswer = (id: any, ans: any) => {
    const newBlanks = editQuestion.blanks.map((c: any) => {
      if (c.id === id) {
        return { ...c, answer: ans };
      } else {
        return c;
      }
    });
    setEditQuestion({
      ...editQuestion,
      blanks: newBlanks,
    });
  };

  const removeBlank = (blankId: any) => {
    const newBlanks = editQuestion.blanks.filter((b: any) => b.id !== blankId);
    setEditQuestion({ ...editQuestion, blanks: newBlanks });
  };

  const addAnswer = () => {
    const newBlank = {
      id: editQuestion.blanks.length,
      answer: "",
    };
    setEditQuestion({
      ...editQuestion,
      blanks: [...editQuestion.blanks, newBlank],
    });
  };

  return (
    <>
      <div>
        Enter your question text, then define all possible correct answers for
        the blank.
        <br />
        Students will see the question followed by a small text box to type
        their answer.
      </div>
      <h5 className="mt-4">Question:</h5>
      <div className="border p-2">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onChange={() =>
            setEditQuestion({
              ...editQuestion,
              question: editorState.getCurrentContent().getPlainText(),
            })
          }
        />
      </div>
      <h5 className="mt-4">Answers:</h5>
      <div className="d-flex flex-column">
        {editQuestion.blanks.map((b: any) => (
          <div className="flex-row mb-2" key={b.id}>
            <span>Possible Answer: </span>
            <input
              type="text"
              placeholder={b.answer}
              onChange={(a) => updateAnswer(b.id, a.target.value)}
              className="p-2 w-25 ms-2"
            />
            <button
              className="btn btn-outline-danger mb-1 ms-2"
              onClick={() => {
                removeBlank(b.id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          className="btn btn-outline-danger w-25 p-2 mt-2"
          onClick={addAnswer}
        >
          <FaPlus className="mb-1 me-2" />
          <span> Add Another Answer</span>
        </button>
        <div className="column-gap-1 btn-toolbar mt-4">
          <button
            className="btn btn-light btn-outline-secondary"
            onClick={() => setEditQuestion([])}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              updateQuestion(editQuestion.id);
              setEditQuestion([]);
            }}
          >
            Update Question
          </button>
        </div>
      </div>
    </>
  );
}

export default FillInTheBlank;
