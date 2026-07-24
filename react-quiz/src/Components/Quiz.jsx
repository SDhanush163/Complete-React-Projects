import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIdx = userAnswers.length;
  const isQuizComplete = activeQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => setUserAnswers((prev) => [...prev, selectedAnswer]),
    [],
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  );

  if (isQuizComplete) return <Summary userAnswers={userAnswers} />;

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIdx}
        index={activeQuestionIdx}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
