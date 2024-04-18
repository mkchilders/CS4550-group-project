import { FaPlus } from "react-icons/fa";

function MultipleChoice({
  editQuestion,
  setEditQuestion,
  updateQuestion,
}: any) {
  const updateIsCorrect = (id: any) => {
    const newChoices = editQuestion.choices.map((c: any) => {
      if (c.id === id) {
        return { ...c, isCorrect: true };
      } else {
        return { ...c, isCorrect: false };
      }
    });
    setEditQuestion({ ...editQuestion, choices: newChoices });
  };

  const updateAnswer = (id: any, ans: any) => {
    const newChoices = editQuestion.choices.map((c: any) => {
      if (c.id === id) {
        return { ...c, answer: ans };
      } else {
        return c;
      }
    });
    setEditQuestion({ ...editQuestion, choices: newChoices });
  };

  const addAnswer = () => {
    const newChoice = {
      id: editQuestion.choices.length,
      answer: "",
      isCorrect: false,
    };
    setEditQuestion({
      ...editQuestion,
      choices: [...editQuestion.choices, newChoice],
    });
  };

  return (
    <>
      <div>
        Enter your question and multiple answers, then select the one correct
        answer.
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
        {editQuestion.choices.map((c: any) => (
          <div className="flex-row mb-2">
            <input
              type="radio"
              id="correct"
              name="correct"
              key={c.id}
              checked={c.isCorrect}
              onChange={() => {
                updateIsCorrect(c.id);
              }}
              className="me-1"
            />
            <label htmlFor="correct" className={c.isCorrect ? "me-4" : "me-3"}>
              {c.isCorrect ? "Correct Answer" : "Possible Answer"}
            </label>
            <input
              type="text"
              placeholder={c.answer}
              onChange={(a) => updateAnswer(c.id, a.target.value)}
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

export default MultipleChoice;
