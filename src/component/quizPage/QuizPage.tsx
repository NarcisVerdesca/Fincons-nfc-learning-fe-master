import React, { useEffect, useState } from "react";
import QuestionModel from "../../models/QuestionModel";
import QuizModel from "../../models/QuizModel";
import { useParams, useNavigate } from "react-router-dom";
import QuizService from "../../services/QuizService";

import "./QuizPage.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
interface Props {
    quizId: number | undefined;
    setQuizId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const QuizPage = (props: Props) => {
    const navigate = useNavigate();
    const { idQuiz } = useParams();
    const quizId = parseInt(idQuiz!);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: number[] } | null>({});
    const [quiz, setQuiz] = useState<QuizModel | null>();
    const [questionList, setQuestionList] = useState<QuestionModel[] | null>([]);
    const [nameOfStudent, setnameOfStudent] = useState(null);
    const [lessonOfQuiz, setLessonOfQuiz] = useState<number | null>(null);
    const [totalScoreQuiz, setTotalScoreQuiz] = useState(null);
    const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [showRedoQuizButton, setShowRedoQuizButton] = useState(true);

    //variabile di stato per verificare se il quiz è stato già svolto dallo studente 
    const [maxSelectableAnswers, setMaxSelectableAnswers] = useState<number>(0);
    //variabile di stato per verificare se il quiz è stato già svolto dallo studente 
    const [quizAlreadyDone, setQuizAlreadyDone] = useState<boolean>(false);
    //variabile di stato per verificare se l'utente vuole rieseguire il quiz
    const [userWantToDoItAgain, setuserWantToDoItAgain] = useState<boolean>(false);

    useEffect(() => {
        const areAllQuestionsAnswered = () => {
            return questionList?.every(question => userAnswers?.[question.id] !== undefined) ?? false;
        };

        setShowSubmitButton(areAllQuestionsAnswered());
    }, [questionList, userAnswers]);


    useEffect(() => {

        const checkQuizStatus = async () => {
            try {
                const response = await QuizService.checkQuizResult(quizId);
                console.log(response);

                if (response.data) {
                    console.log("Il quiz è stato già svolto dallo studente.");
                    setQuizAlreadyDone(true);
                    if (userWantToDoItAgain) {
                        setCurrentQuestionIndex(0);
                        setUserAnswers(null);
                        setQuiz(null);
                        setQuestionList(null);
                        setnameOfStudent(null);
                        setTotalScoreQuiz(null);
                        setShowSubmitButton(false);
                        setQuizSubmitted(false);

                        getTheQuizById();

                        console.log("Sto richiamando il corso" + quiz?.title);
                    }
                } else {
                    console.log("Il quiz non è stato ancora svolto dallo studente.");
                    getTheQuizById();
                }
            } catch (error) {
                console.error("Errore durante il controllo dello stato del quiz:", error);
            }
        };

        const getTheQuizById = async () => {
            try {
                const res = await QuizService.getQuizById(quizId!);
                setQuiz(res.data);
                setLessonOfQuiz(res.data.lesson.id);
                console.log(res.data.lessons, "sono qui in QuizPage res.data.data.quiz");
                setQuestionList(res.data.questions);
            } catch (error) {
                console.error("Errore durante il recupero del quiz:", error);
                // Gestisci gli errori in base alle tue esigenze
            }
        };

        checkQuizStatus();
    }, [quizId, userWantToDoItAgain, quizSubmitted]);

    const currentQuestion = questionList?.[currentQuestionIndex];
    useEffect(() => {
        if (currentQuestion) {
            const maxSelectableAnswers = currentQuestion.answers.filter(answer => answer.correct).length;
            setMaxSelectableAnswers(maxSelectableAnswers);
        }
    }, [currentQuestion]);

    //prossima domanda
    const goToNextQuestion = () => {
        if (currentQuestionIndex < (questionList?.length ?? 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    //domanda precedente
    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    //verifica se tutte le domande sono state valorizzate
    const areAllQuestionsAnswered = () => {
        return questionList?.every(question => userAnswers?.[question.id] !== undefined);
    };

    const handleAnswerSelection = (questionId: number, answerId: number) => {
        setUserAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers };
            const currentQuestion = questionList?.[currentQuestionIndex];
            const maxCorrectAnswers = currentQuestion?.answers.filter(answer => answer.correct).length || 0;
            setMaxSelectableAnswers(maxCorrectAnswers);

            if (maxSelectableAnswers !== undefined) {
                // Verifica se la domanda corrente ha più di una risposta corretta
                const multipleCorrectAnswers = maxSelectableAnswers > 1;
                // Verifica se la risposta selezionata è già presente nell'array delle risposte per la domanda corrente
                const isAnswerSelected = updatedAnswers[questionId]?.includes(answerId);
                // Se l'opzione è già selezionata, rimuoviamola
                if (isAnswerSelected) {
                    updatedAnswers[questionId] = updatedAnswers[questionId]?.filter(id => id !== answerId);
                } else {
                    // Controlla se il numero massimo di risposte selezionate è stato raggiunto
                    if (updatedAnswers[questionId]?.length >= maxSelectableAnswers && multipleCorrectAnswers) {
                        // Se sì, non aggiungere ulteriori risposte
                        return updatedAnswers;
                    }
                    // Altrimenti, aggiungiamola all'array delle risposte
                    updatedAnswers[questionId] = updatedAnswers[questionId]
                        ? [...updatedAnswers[questionId], answerId]
                        : [answerId];
                }
                // Disabilita le checkbox non selezionate quando il numero massimo di risposte corrette è stato raggiunto
                if (multipleCorrectAnswers) {
                    const checkboxes = document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="question-${questionId}"]`);
                    checkboxes.forEach(checkbox => {
                        checkbox.disabled = !checkbox.checked && updatedAnswers[questionId]?.length >= maxSelectableAnswers;
                    });
                }
            } else {
                console.error("maxSelectableAnswers is undefined");
            }
            return updatedAnswers;
        });
    };

    const gotToLessonPage = (idLesson: any) => {
        console.log(idLesson)
        navigate("/lesson_page/" + idLesson);
    };

    const handleRedoQuiz = () => {
        setuserWantToDoItAgain(true);
        setShowRedoQuizButton(false);
    }

    const sendAnswers = async () => {
        if (!quizId || !quiz) {
            console.error('Quiz ID or quiz data not available');
            return;
        }

        const answersMap: { [key: number]: number[] } = {};
        Object.keys(userAnswers ?? {}).forEach((questionId) => {
            if (userAnswers) {
                const questionIdNum = parseInt(questionId, 10);
                answersMap[questionIdNum] = userAnswers[questionIdNum];
            }
        });

        console.log(answersMap);

        try {
            if (quizAlreadyDone) {
                console.log("Sto usando il metodo put");
                const response = await QuizService.reSendQuizResult(quizId, answersMap);
                setnameOfStudent(response.data.user.firstName);
                setTotalScoreQuiz(response.data.totalScore);
                setShowSubmitButton(false);
                setQuizSubmitted(true);
                setQuiz(null);
                setuserWantToDoItAgain(false);
            } else {
                console.log("Sto usando il metodo post");
                const response = await QuizService.sendQuizResult(quizId, answersMap);
                console.log('Risposte inviate con successo:', response.data);
                console.log('Total score: ', response.data.totalScore);
                console.log('Nome: ', response.data.user.firstName);
                //TODO - LEZIONE DA RIPETERE SETLESSONTOREPEAT
                setnameOfStudent(response.data.user.firstName);
                setTotalScoreQuiz(response.data.totalScore);
                setShowSubmitButton(false);
                setQuizSubmitted(true);
            }
        } catch (error) {
            console.error('Errore durante l\'invio delle risposte:', error);
            // Gestisci gli errori in base alle tue esigenze
        }
    };
    let scoreMessage = null;
    const totalScorePercentage = totalScoreQuiz !== null ? Math.floor(totalScoreQuiz) : null;
    if (totalScorePercentage !== null) {
        if (totalScorePercentage === 100) {
            scoreMessage = <span style={{ color: 'green' }}>Good job, {nameOfStudent}! You answered all the quiz questions correctly!</span>;
        } else if (totalScorePercentage == 0) {
            scoreMessage = <span style={{ color: 'red' }}>Too bad {nameOfStudent}, you failed the test. You answered only {totalScorePercentage}% of the quiz questions correctly.</span>;
        } else if (totalScorePercentage < 40) {
            scoreMessage = <span style={{ color: 'red' }}>Too bad {nameOfStudent}, you failed the test. You answered only {totalScorePercentage}% of the quiz questions correctly.</span>;
        } else if (totalScorePercentage >= 40 && totalScorePercentage < 60) {
            scoreMessage = <span style={{ color: 'red' }}>Failed test. You could do better {nameOfStudent}! You answered {totalScorePercentage}% of the quiz questions correctly. You are almost there!</span>;
        } else if (totalScorePercentage >= 60) {
            scoreMessage = <span style={{ color: 'green' }}>Test passed {nameOfStudent}! You answered {totalScorePercentage}% of the quiz questions correctly.</span>;
        }
    }

    const formattedDateLastModified = quiz?.lastModified ? new Date(quiz?.lastModified).toLocaleString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '/';
    const formattedDateCreate = quiz?.createDate ? new Date(quiz?.createDate).toLocaleString('it-IT', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '/';

    return (
        <>
            <Header />
            <div className="center-content">
                {quiz?.id && (
                    <div>
                        <h2>Quiz Of Lesson: {quiz?.lesson.title}</h2>
                    </div>
                )}
                {quizAlreadyDone && (
                    <div>
                        {showRedoQuizButton && (
                            <div style={{ textAlign: "center" }}>
                                <div className="alert alert-warning" role="alert">
                                    You have already taken this quiz! Do you want to try again?
                                </div>
                                <div>
                                    <button className="btn btn-outline-secondary" onClick={handleRedoQuiz}>REDO QUIZ</button>
                                </div>
                            </div>
                        )}
                    </div>


                )
                }

                {questionList && questionList.length > 0 && (
                    <div className="card card-quiz">
                        <div className="card-header header-quiz">
                            <h4 className="quiz-title"> {quiz?.title}</h4>
                            <p className="question-index">Question {currentQuestionIndex + 1} of {questionList.length}</p>
                        </div>
                        {!quizSubmitted && currentQuestion && (
                            <div>
                                <div className="text-question">
                                    <h5>{currentQuestion.textQuestion}</h5>
                                    {maxSelectableAnswers > 1 && (
                                        <div>
                                            <p>Select the {maxSelectableAnswers} correct answers.</p>
                                        </div>
                                    )}

                                </div>
                                <div className="answer-section d-flex flex-column  align-items-center">
                                    {currentQuestion.answers.map((answer) => (
                                        <div key={answer.id} className="form-check single-answer-section ">
                                            {currentQuestion.answers.filter(ans => ans.correct).length > 1 ? (
                                                // Se ci sono più risposte corrette, utilizza checkbox
                                                <input type="checkbox"
                                                    id={`answer-${answer.id}`}
                                                    name={`question-${currentQuestion.id}`}
                                                    value={answer.id}
                                                    checked={userAnswers?.[currentQuestion.id]?.includes(answer.id) || false}
                                                    onChange={() => handleAnswerSelection(currentQuestion.id, answer.id)} />
                                            ) : (
                                                // Altrimenti, utilizza radio button per vero o falso o per domande che contengono solo una risposta esatta
                                                <input type="radio"
                                                    id={`answer-${answer.id}`}
                                                    name={`question-${currentQuestion.id}`}
                                                    value={answer.id}
                                                    checked={userAnswers?.[currentQuestion.id]?.includes(answer.id) || false}
                                                    onChange={() => handleAnswerSelection(currentQuestion.id, answer.id)}
                                                    className="form-check-input" />
                                            )}
                                            <label className="form-check-label" htmlFor={`answer-${answer.id}`}>{answer.text}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="card-footer navigationButtons question-buttons-div">
                                    <button className="btn btn-light quiz-control-button" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                                        <i className="bi bi-arrow-left-circle"></i>
                                    </button>
                                    <button className="btn btn-light quiz-control-button" onClick={goToNextQuestion} disabled={currentQuestionIndex === questionList.length - 1 || !userAnswers?.[currentQuestion.id] || userAnswers[currentQuestion.id]?.length === 0}>
                                        <i className="bi bi-arrow-right-circle"></i>
                                    </button>
                                </div>
                                {showSubmitButton && (
                                    <div className="card-footer send-quiz-button">
                                        <button className="btn btn-outline-dark" disabled={!areAllQuestionsAnswered()} onClick={sendAnswers}>Send Quiz</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {quizSubmitted && (
                            <div className="quiz-submitted-message">
                                <h4 className="quiz-done-label">Quiz completed!</h4>
                                {scoreMessage && <div className="quiz-done-label-message">{scoreMessage}</div>}
                                {lessonOfQuiz && (
                                    <button className="btn btn-outline-secondary back-to-lesson-button" onClick={() => gotToLessonPage(lessonOfQuiz)}>Back to lesson</button>
                                )}
                            </div>
                        )}



                    </div>
                )}
                {userWantToDoItAgain && (
                    <div className="card text-dark bg-light mb-3 audit-quiz" style={{ maxWidth: "18rem;" }}>
                        <div className="card-header">Quiz info</div>
                        <div className="card-body">
                            <p className="card-text">Created by: {quiz?.createdBy} </p>
                            <p className="card-text">Created on: {formattedDateCreate} </p>
                            {quiz?.lastModified === null ? (
                                <p className="card-text">Modified by: {quiz?.createdBy}</p>
                            ) : (
                                <p className="card-text">Modified by: {quiz?.lastModifiedBy}</p>
                            )}

                            {quiz?.lastModifiedBy === null ? (
                                <p className="card-text">Modified on: {formattedDateCreate}</p>
                            ) : (
                                <p className="card-text">Modified on: {formattedDateLastModified}</p>
                            )}
                        </div>
                    </div>
                )

                }


            </div>



        </>

    );
};
export default QuizPage;