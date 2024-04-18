function TrueFalse({ editQuestion, setEditQuestion, updateQuestion }: any) {
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
