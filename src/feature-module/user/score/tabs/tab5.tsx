import React, { useState } from "react";

interface ScoreDetail {
    category: string;
    score: number;
    maxScore: number;
}

interface Question {
    id: number;
    title: string;
    type: string;
    audioSrc: string;
    scores: ScoreDetail[];
    maxScore: number;
    userScore: number;
    summary: string;
    highlightedWord: string;
}

const questions: Question[] = [
    {
        id: 1,
        title: "Aging",
        type: "Summarize Spoken Text",
        audioSrc: "audio-sample.mp3",
        scores: [
            { category: "Content", score: 1.4, maxScore: 2 },
            { category: "Grammar", score: 1.0, maxScore: 2 },
            { category: "Form", score: 1.0, maxScore: 2 },
            { category: "Vocabulary", score: 2.0, maxScore: 2 },
        ],
        maxScore: 10,
        userScore: 7.4,
        summary:
            "The speaker was talking about ageing. Firstly, he mentioned the mysteries of ageing. He then stated that ageing is influenced by lifestyle. Moreover, he also discussed the implications of life span. Furthermore, he described the structure of society. In conclusion, the speaker was talking about ageing.",
        highlightedWord: "longer",
    },
];

const Tab5: React.FC = () => {
    const [remarks, setRemarks] = useState<{ [key: number]: string }>({});

    const handleRemarkChange = (id: number, value: string) => {
        setRemarks({ ...remarks, [id]: value });
    };
    return (
        <div className="container mt-4">
            {questions.map((question) => (
                <div key={question.id} className="card mb-4 shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>{question.id}. {question.title}</h5>
                        <small className="text-muted">({question.type})</small>
                    </div>
                    <div className="card-body">
                        <audio controls className="w-100 mb-3">
                            <source src={question.audioSrc} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                        <table className="table table-bordered">
                            <tbody>
                                {question.scores.map((score, index) => (
                                    <tr key={index}>
                                        <td>{score.category}:</td>
                                        <td>{score.score} / {score.maxScore}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="alert alert-secondary">
                            <strong>Max Score:</strong> {question.maxScore} &nbsp; <strong>Your Score:</strong> {question.userScore}
                        </div>
                        <p className="mt-3">
                            {question.summary.split(" ").map((word, index) => (
                                <span key={index} className={word === question.highlightedWord ? "text-danger fw-bold" : ""}>
                                    {word} &nbsp;
                                </span>
                            ))}
                        </p>
                        <div className="form-group mt-3">
                            <label htmlFor={`remark-${question.id}`} className="font-weight-bold">Add Remark:</label>
                            <textarea
                                id={`remark-${question.id}`}
                                className="form-control"
                                placeholder="Enter your remark here..."
                                value={remarks[question.id] || ""}
                                onChange={(e) => handleRemarkChange(question.id, e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tab5;
