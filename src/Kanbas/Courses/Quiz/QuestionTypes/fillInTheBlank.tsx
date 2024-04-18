import { FaPlus } from "react-icons/fa";

function FillInTheBlank({
  editQuestion,
  setEditQuestion,
  updateQuestion,
}: any) {
  const updateAnswer = (id: any, ans: any) => {
    const newBlanks = editQuestion.blanks.map((c: any) => {
      if (c.id === id) {
        return { ...c, answer: ans };
      } else {
        return c;
      }
    });
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
      <input
        type="text"
        placeholder={editQuestion.question}
        className="p-2 w-100"
        onChange={(e) =>
          setEditQuestion({
            ...editQuestion,
            question: e.target.value,
          })
        }
      />
      <h5 className="mt-4">Answers:</h5>
      <div className="d-flex flex-column">
        {editQuestion.blanks.map((b: any) => (
          <div className="flex-row mb-2">
            <span>Possible Answer: </span>
            <input
              type="text"
              placeholder={b.answer}
              onChange={(a) => updateAnswer(b.id, a.target.value)}
              className="p-2 w-25"
            />
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
