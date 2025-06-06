import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {   
    fetchAllTypes,
    fetchSubtypesByType,
    fetchAllImageTypes,
} from "../../api/commonAPI"; // ✅ Import APIs
import { createQuestions } from "../../api/masterAPI";
import { all_routes } from "../router/all_routes";
import DefaultEditor from "react-simple-wysiwyg";
import AlertComponent from "../../core/common/AlertComponent";
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

interface AddQuestionProps {
    onAddQuestion: (newQuestion: QuestionData) => void;
}

// ✅ Define the structure of a Question
interface QuestionData {
    id: number;
    type: string;
    subType: string;
    name: string;
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

    
    const [type, setType] = useState<string>("");
    const [subType, setSubType] = useState<string>("");
    const [imageType, setImageType] = useState<string>("");
    const [questionName, setQuestionName] = useState<string>("");
    const [questionNo, setQuestionNo] = useState<string>("");
    const [tested, setTested] = useState<string>("yes");
    const [testedCount, setTestedCount] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("Easy");
    const [weekly, setWeekly] = useState<string>("Yes");
    const [isNewQuestion, setIsNewQuestion] = useState<string>("Yes");
    const [content, setContent] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [transcription, setTranscription] = useState<string>("");
    const [dragAndDrop, setDragAndDrop] = useState<string>("");
    const [britishAnswer, setBritishAnswer] = useState<string>("");
    const [speakingAudio, setSpeakingAudio] = useState<File | null>(null);
    const [describeImage, setDescribeImage] = useState<File | null>(null);
    const [optionOne, setOptionOne] = useState<string>("");
    const [optionTwo, setOptionTwo] = useState<string>("");
    const [optionThree, setOptionThree] = useState<string>("");
    const [optionFour, setOptionFour] = useState<string>("");
    const [optionFive, setOptionFive] = useState<string>("");
    const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);

    const routes = all_routes;
    console.log(subType);

    // ✅ Fetch topics, question types, and types when component loads
    useEffect(() => {
        const loadData = async () => {
            try { 

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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("type_id", type);
        formData.append("sub_type_id", subType);
        formData.append("question_name", questionName);
        formData.append("difficulties", difficulty.toLowerCase());
        formData.append("weekly", (weekly === "Yes").toString());
        formData.append("new_question", (isNewQuestion === "Yes").toString());
        formData.append("question", content);
        formData.append("image_type", imageType);
        formData.append("answer_american", answer);
        formData.append("answer_british", britishAnswer);
        formData.append("transcription", transcription);
        formData.append("drag_drop", dragAndDrop);
        formData.append("option_one", optionOne);
        formData.append("option_two", optionTwo);
        formData.append("option_three", optionThree);
        formData.append("option_four", optionFour);
        formData.append("option_five", optionFive);
        formData.append("questionNo", questionNo);
        formData.append("tested", tested);
        formData.append("tested_count", testedCount);

        if (speakingAudio) formData.append("speak_audio_file", speakingAudio);
        if (describeImage) formData.append("image_file", describeImage);

        try {
            const response = await createQuestions(formData);

            if (response.success) {
                setAlert({ type: "success", message: response.message ?? "Operation successful" });
                setType("");
                setSubType("");
                setQuestionName("");
                setDifficulty("Easy");
                setWeekly("Yes");
                setIsNewQuestion("Yes");
                setSpeakingAudio(null);
                setDescribeImage(null);
                setOptionOne("");
                setOptionTwo("");
                setOptionThree("");
                setOptionFour("");
                setOptionFive("");
                setContent("");
                setAnswer("");
                setTranscription("");
                setDragAndDrop("");
                setBritishAnswer("");
                setImageType("");
                setQuestionNo("");
                setTested("yes");
                setTestedCount("");
            } else {
                setAlert({ type: "danger", message: response.message ?? "An error occurred" });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
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
                {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
                <div className="card p-4">
                    <h2>Add Question</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">                            

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
                            <div className="col-md-2">
                                <label className="form-label">Tested</label>
                               <select className="form-control" value={tested} onChange={(e) => setTested(e.target.value)}>
                                    <option value="yes"> Yes</option>
                                    <option value="no"> No</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Tested Count</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={testedCount}
                                    onChange={(e) => setTestedCount(e.target.value)}
                                    placeholder="Tested Count"
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Question No.</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={questionNo}
                                    onChange={(e) => setQuestionNo(e.target.value)}
                                    placeholder="Question No."
                                />
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
                            {(type === "1" || type === "2" || type === "4") &&
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
                            <Editor value={content} onTextChange={(e) => setContent(e.htmlValue ?? "")} />
                        </div>
                        {subType !== "4" && 
                        <div className="row mb-3">
                            <label className="form-label">Answer</label>
                            <Editor value={answer} onTextChange={(e) => setAnswer(e.htmlValue ?? "")} />
                        </div>
                        }
                            {subType === "20" && 
                            <div className="row mb-3">
                                <label className="form-label">Answer (In British)</label>
                                <textarea className="form-control" value={britishAnswer} onChange={(e) => setBritishAnswer(e.target.value)} />
                            </div>
                            }
                        
                        {(subType === "7" || subType === "22" || subType === "21" || subType === "15" || subType === "16" || subType === "18")  && 
                        <div className="row mb-3">
                            <label className="form-label">Transcription</label>
                            <textarea className="form-control" value={transcription} onChange={(e) => setTranscription(e.target.value)} />                          
                        </div>
                        }

                        {subType === "12"   && 
                        <div className="row mb-3">
                            <label className="form-label">Drag And Drop (Please Enter Value with ,)</label>
                            <textarea className="form-control" value={dragAndDrop} onChange={(e) => setDragAndDrop(e.target.value)} />
                            
                        </div>
                        }

                        {(subType === "10" || subType === "14" || subType === "13" || subType === "15" || subType === "16" || subType === "18" || subType === "21") &&
                        <>
                            <div className="mb-3">
                            <label className="form-label">Option One</label>
                            <textarea className="form-control" value={optionOne} onChange={(e) => setOptionOne(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Option Two</label>
                            <textarea className="form-control" value={optionTwo} onChange={(e) => setOptionTwo(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Option Three</label>
                            <textarea className="form-control" value={optionThree} onChange={(e) => setOptionThree(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Option Four</label>
                            <textarea className="form-control" value={optionFour} onChange={(e) => setOptionFour(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Option Five</label>
                            <textarea className="form-control" value={optionFive} onChange={(e) => setOptionFive(e.target.value)} />
                        </div>
                        </>
                        }
                        

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuestionAdd;
