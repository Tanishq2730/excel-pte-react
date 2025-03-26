// src/feature-module/question/AddQuestion.tsx
import React, { useState } from "react";

interface AddQuestionProps {
    onAddQuestion: (newQuestion: any) => void;
}

const QuestionEdit: React.FC<AddQuestionProps> = ({ onAddQuestion }) => {
    const [topic, setTopic] = useState<string>("Practice");
    const [type, setType] = useState<string>("");
    const [buttonName, setButtonName] = useState<string>("");
    const [questionType, setQuestionType] = useState<string>("Real Question");
    const [testTime, setTestTime] = useState<string>("");
    const [questionName, setQuestionName] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("Easy");

    // ✅ Handle Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newQuestion = {
            id: Math.floor(Math.random() * 1000), // Temporary ID
            topic,
            type,
            name: buttonName,
            imageType: "N.A.",
            questionType,
            questionName,
        };

        onAddQuestion(newQuestion);

        // ✅ Reset Fields
        setTopic("Practice");
        setType("");
        setButtonName("");
        setQuestionType("Real Question");
        setTestTime("");
        setQuestionName("");
        setDifficulty("Easy");
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="card p-4">
                    <h2>Add Question</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Topic</label>
                                <input type="text" className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)} />
                            </div>
                            <div className="col">
                                <label className="form-label">Type</label>
                                <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} placeholder="Select Your Choice" />
                            </div>
                            <div className="col">
                                <label className="form-label">Button Name</label>
                                <input type="text" className="form-control" value={buttonName} onChange={(e) => setButtonName(e.target.value)} />
                            </div>
                            <div className="col">
                                <label className="form-label">Question Type</label>
                                <input type="text" className="form-control" value={questionType} onChange={(e) => setQuestionType(e.target.value)} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Question Name</label>
                            <input type="text" className="form-control" value={questionName} onChange={(e) => setQuestionName(e.target.value)} placeholder="Question Name" />
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Difficulty</label>
                                <div>
                                    {["Easy", "Medium", "Hard"].map((level) => (
                                        <div className="form-check form-check-inline" key={level}>
                                            <input type="radio" className="form-check-input" id={level} value={level} checked={difficulty === level} onChange={() => setDifficulty(level)} />
                                            <label className="form-check-label" htmlFor={level}>
                                                {level}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuestionEdit;
