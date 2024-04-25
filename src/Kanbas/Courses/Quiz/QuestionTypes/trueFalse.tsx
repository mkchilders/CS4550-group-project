import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";
import { EditorState, ContentState } from "draft-js";
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TrueFalse({ editQuestion, setEditQuestion, updateQuestion }: any) {
  const [editorState, setEditorState] = useState(() => {
    let content = ContentState.createFromText(
      editQuestion.question ? editQuestion.question : ""
    );
    return EditorState.createWithContent(content);
  });
  return (
    <>
      <div>
        Enter your question and multiple answers, then select the one correct
        answer.
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
        <div className="flex-row mb-2">
          <input
            type="radio"
            id="correct"
            name="correct"
            key={editQuestion.id}
            checked={editQuestion.trueFalse === true}
            onChange={() => {
              setEditQuestion({
                ...editQuestion,
                trueFalse: true,
              });
            }}
            className="me-1"
          />
          <label htmlFor="correct" className="text-success">
            True
          </label>
        </div>
        <div className="flex-row mb-2">
          <input
            type="radio"
            id="correct"
            name="correct"
            key={editQuestion.id}
            checked={editQuestion.trueFalse === false}
            onChange={() => {
              setEditQuestion({
                ...editQuestion,
                trueFalse: false,
              });
            }}
            className="me-1 text-success"
          />
          <label htmlFor="correct" className="text-danger">
            False
          </label>
        </div>
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

export default TrueFalse;
