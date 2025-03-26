import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    fetchAllTopics,
    fetchAllQuestionTypes,
    fetchAllTypes,
    fetchSubtypesByType,
    fetchAllImageTypes
} from "../../api/commonAPI"; // ✅ Import APIs
import { all_routes } from "../router/all_routes";
import DefaultEditor from "react-simple-wysiwyg";

interface AddQuestionProps {
    onAddQuestion: (newQuestion: QuestionData) => void;
}

// ✅ Define the structure of a Question
interface QuestionData {
    id: number;
    topic: string;
    type: string;
    subType: string;
    name: string;
    questionType: string;
    questionName: string;
    difficulty: string;
    weekly: string;
    newQuestion: string;
}

const QuestionAdd: React.FC<AddQuestionProps> = ({ onAddQuestion }) => {
    const [topics, setTopics] = useState<{ id: number; topic_name: string }[]>([]);
    const [questionTypes, setQuestionTypes] = useState<{ id: number; question_type_name: string }[]>([]);
    const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
    const [subtypes, setSubtypes] = useState<{ id: number; sub_name: string }[]>([]);
    const [imageTypes, setImageTypes] = useState<{ id: number; image_type: string }[]>([]);

    const [topic, setTopic] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [subType, setSubType] = useState<string>("");
    const [buttonName, setButtonName] = useState<string>("");
    const [questionType, setQuestionType] = useState<string>("");
    const [imageType, setImageType] = useState<string>("");
    const [questionName, setQuestionName] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("Easy");
    const [weekly, setWeekly] = useState<string>("Yes");
    const [isNewQuestion, setIsNewQuestion] = useState<string>("Yes");
    const [content, setContent] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [speakingAudio, setSpeakingAudio] = useState<File | null>(null);
    const [describeImage, setDescribeImage] = useState<File | null>(null);
    const routes = all_routes;
    console.log(type);

    // ✅ Fetch topics, question types, and types when component loads
    useEffect(() => {
        const loadData = async () => {
            try {
                const topicsRes = await fetchAllTopics();
                if (topicsRes.success) setTopics(topicsRes.data);

                const questionTypesRes = await fetchAllQuestionTypes();
                if (questionTypesRes.success) setQuestionTypes(questionTypesRes.data);

                const typesRes = await fetchAllTypes();
                if (typesRes.success) setTypes(typesRes.data);

                const imageTypeRes = await fetchAllImageTypes();
                if (imageTypeRes.success) setImageTypes(imageTypeRes.data);

            } catch (error) {
                console.error("Error fetching dropdown data:", error);
            }
        };

        loadData();
    }, []);

    // ✅ Fetch subtypes when type changes
    useEffect(() => {
        if (!type) return;

        const loadSubtypes = async () => {
            try {
                const res = await fetchSubtypesByType(Number(type));
                if (res.success) setSubtypes(res.data);
            } catch (error) {
                console.error("Error fetching subtypes:", error);
            }
        };

        loadSubtypes();
    }, [type]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "audio" | "image") => {
        if (e.target.files && e.target.files.length > 0) {
            if (type === "audio") {
                setSpeakingAudio(e.target.files[0]);
            } else {
                setDescribeImage(e.target.files[0]);
            }
        }
    };


    // ✅ Handle Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newQuestionData = {
            id: Math.floor(Math.random() * 1000),
            topic,
            type,
            subType,
            name: buttonName,
            questionType,
            questionName,
            difficulty,
            weekly,
            newQuestion: isNewQuestion,
            speakingAudio,  // ✅ Include Audio File
            describeImage,  // ✅ Include Image File
        };

        onAddQuestion(newQuestionData);

        // ✅ Reset Fields
        setTopic("");
        setType("");
        setSubType("");
        setButtonName("");
        setQuestionType("");
        setQuestionName("");
        setDifficulty("Easy");
        setWeekly("Yes");
        setIsNewQuestion("Yes");
        setSpeakingAudio(null);
        setDescribeImage(null);
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
                    <div className="my-auto mb-2">
                        <h3 className="page-title mb-1">Questions</h3>
                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <Link to={routes.adminDashboard}>Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="#">Questions</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Questions Add
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                        <div className="mb-2">
                            <Link
                                to={routes.question}
                                className="btn btn-primary d-flex align-items-center"
                            >
                                <i className="ti ti-square-rounded-arrow me-2" />
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card p-4">
                    <h2>Add Question</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            {/* Topic Dropdown */}
                            <div className="col-md-3">
                                <label className="form-label">Topic</label>
                                <select className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)}>
                                    <option value="">Select Topic</option>
                                    {topics.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.topic_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Dropdown */}
                            <div className="col-md-3">
                                <label className="form-label">Type</label>
                                <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="">Select Type</option>
                                    {types.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Subtype Dropdown */}
                            <div className="col-md-3">
                                <label className="form-label">Sub Type</label>
                                <select className="form-control" value={subType} onChange={(e) => setSubType(e.target.value)}>
                                    <option value="">Select Subtype</option>
                                    {subtypes.map((st) => (
                                        <option key={st.id} value={st.id}>
                                            {st.sub_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Question Type Dropdown */}
                            <div className="col-md-3">
                                <label className="form-label">Question Type</label>
                                <select className="form-control" value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                                    <option value="">Select Question Type</option>
                                    {questionTypes.map((qt) => (
                                        <option key={qt.id} value={qt.id}>
                                            {qt.question_type_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Question Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={questionName}
                                onChange={(e) => setQuestionName(e.target.value)}
                                placeholder="Question Name"
                            />
                        </div>

                        {/* Difficulty Level */}
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Difficulty</label>
                                <div>
                                    {["Easy", "Medium", "Hard"].map((level) => (
                                        <div className="form-check form-check-inline" key={level}>
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id={level}
                                                value={level}
                                                checked={difficulty === level}
                                                onChange={() => setDifficulty(level)}
                                            />
                                            <label className="form-check-label" htmlFor={level}>
                                                {level}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col">
                                <label className="form-label">Weekly</label>
                                <div>
                                    {["Yes", "No"].map((option) => (
                                        <div className="form-check form-check-inline" key={option}>
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                value={option}
                                                checked={weekly === option}
                                                onChange={() => setWeekly(option)}
                                            />
                                            <label className="form-check-label">{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col">
                                <label className="form-label">New Question</label>
                                <div>
                                    {["Yes", "No"].map((option) => (
                                        <div className="form-check form-check-inline" key={option}>
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                value={option}
                                                checked={isNewQuestion === option}
                                                onChange={() => setIsNewQuestion(option)}
                                            />
                                            <label className="form-check-label">{option}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            {subType === "8" &&
                                <div className="col-md-4">
                                    <label className="form-label">Image Type</label>
                                    <select className="form-control" value={imageType} onChange={(e) => setImageType(e.target.value)}>
                                        <option value="">Select Image Type</option>
                                        {imageTypes.map((qt) => (
                                            <option key={qt.id} value={qt.id}>
                                                {qt.image_type}
                                            </option>
                                        ))}
                                    </select>
                                </div>}
                            {/* ✅ Speaking Audio Upload */}
                            {(type === "1" || type === "2") &&
                                <div className="col-md-4">
                                    <label className="form-label">Speaking Audio File</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="audio/*"
                                        onChange={(e) => handleFileChange(e, "audio")}
                                    />
                                </div>
                            }
                            {/* ✅ Describe Image Upload */}
                            {subType === "8" &&
                                <div className="col-md-4">
                                    <label className="form-label">Describe Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, "image")}
                                    />
                                </div>
                            }
                        </div>


                        <div className="row mb-3">
                            <label className="form-label">Question</label>
                            <DefaultEditor value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>

                        <div className="row mb-3">
                            <label className="form-label">Answer</label>
                            <DefaultEditor value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuestionAdd;
