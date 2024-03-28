import db from "./src/Kanbas/Database/index.js";
function QuizRoutes(app) {
  app.post("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const newQuiz = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.quizzes.push(newQuiz);
    res.send(newQuiz);
  });
//   app.get("/api/courses/:cid/modules", (req, res) => {...});
}
export default QuizRoutes;