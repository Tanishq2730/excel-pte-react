import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchAllTypes, fetchSubtypesByType, fetchAllImageTypes } from "../../api/commonAPI";
import { updateQuestions, fetcQuestionsById } from "../../api/masterAPI";
import { all_routes } from "../router/all_routes";
import DefaultEditor from "react-simple-wysiwyg";
import AlertComponent from "../../core/common/AlertComponent";
import ImageShowGlobal from "../../core/common/ImageShowGlobal";
import { image_url } from "../../environment";
import AudioPlayer from "../../core/common/AudioPlayer";

const QuestionEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
    const [subtypes, setSubtypes] = useState<{ id: number; sub_name: string }[]>([]);
    const [imageTypes, setImageTypes] = useState<{ id: number; image_type: string }[]>([]);

    // ✅ Form States
    const [type, setType] = useState<string>("");
    const [subType, setSubType] = useState<string>("");
    const [questionName, setQuestionName] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("Easy");
    const [weekly, setWeekly] = useState<string>("Yes");
    const [isNewQuestion, setIsNewQuestion] = useState<string>("Yes");
    const [content, setContent] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [britishAnswer, setBritishAnswer] = useState<string>("");
    const [transcription, setTranscription] = useState<string>("");
    const [dragAndDrop, setDragAndDrop] = useState<string>("");
    const [imageType, setImageType] = useState<string>("");
    const [speakingAudio, setSpeakingAudio] = useState<File | null>(null);
    const [describeImage, setDescribeImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string>("");
    const [audioURL, setAudioURL] = useState<string>("");
    const [optionOne, setOptionOne] = useState<string>("");
    const [optionTwo, setOptionTwo] = useState<string>("");
    const [optionThree, setOptionThree] = useState<string>("");
    const [optionFour, setOptionFour] = useState<string>("");
    const [optionFive, setOptionFive] = useState<string>("");
    const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);

    const routes = all_routes;

    // ✅ Fetch Existing Question Data
    useEffect(() => {
        const loadQuestionData = async () => {
            if (!id) return;
            try {
                const response = await fetcQuestionsById(Number(id));
                if (response.success && response.data) {
                    const q = response.data;
                    setType(q.type_id.toString());
                    setSubType(q.sub_type_id.toString());
                    setQuestionName(q.question_name);
                    setDifficulty(q.difficulties.charAt(0).toUpperCase() + q.difficulties.slice(1));
                    setWeekly(q.weekly ? "Yes" : "No");
                    setIsNewQuestion(q.new_question ? "Yes" : "No");
                    setContent(q.question);
                    setAnswer(q.answer_american);
                    setBritishAnswer(q.answer_british);
                    setTranscription(q.transcription);
                    setDragAndDrop(q.drag_drop);
                    setOptionOne(q.option_one);
                    setOptionTwo(q.option_two);
                    setOptionThree(q.option_three);
                    setOptionFour(q.option_four);
                    setOptionFive(q.option_five);
                    setImageType(q.image_type);
                    setImageURL(`${image_url}${q.describe_image}`);
                    setAudioURL(`${image_url}${q.speak_audio_file}`);

                }
            } catch (error) {
                console.error("Error fetching question:", error);
            }
        };

        loadQuestionData();
    }, [id]);

    // ✅ Fetch Dropdown Data
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

    // ✅ Handle File Upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "audio" | "image") => {
        if (e.target.files && e.target.files.length > 0) {
            if (type === "audio") {
                setSpeakingAudio(e.target.files[0]);
            } else {
                setDescribeImage(e.target.files[0]);
            }
        }
    };

    // ✅ Handle Form Submission
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
        if (speakingAudio) formData.append("speak_audio_file", speakingAudio);
        if (describeImage) formData.append("image_file", describeImage);

        try {
            const response = await updateQuestions(Number(id), formData);
            console.log("Response:", response);
            
            if (response.success) {
                setAlert({ type: "success", message: "Question updated successfully!" });
               // setTimeout(() => navigate(routes.question), 2000);
            } else {
                setAlert({ type: "danger", message: response.errors ?? "An error occurred" });
            }
        } catch (error) {
            console.error("Error updating question:", error);
            setAlert({ type: "danger", message: "Failed to update question" });
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <h3>Edit Question</h3>
                {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
                <div className="card p-4">
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
                            {subType === "8" &&
                                <div className="col-md-3">
                                    <label className="form-label">Describe Image</label>
                                    <ImageShowGlobal
                                        src={imageURL}
                                        alt="image"
                                        className="img-fluid rounded"
                                        width={200}
                                    />
                                </div>
                            }
                            {(type === "1" || type === "2") &&
                                <div className="col-md-3">
                                    <label className="form-label">Audio File</label>
                                    <div className="mb-3">
                                        <AudioPlayer src={audioURL} className="my-audio-player" />
                                    </div>
                                </div>
                            }
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
                                    <label className="form-label">Audio File</label>
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
                        {subType !== "4" &&
                            <div className="row mb-3">
                                <label className="form-label">Answer</label>
                                <DefaultEditor value={answer} onChange={(e) => setAnswer(e.target.value)} />
                            </div>
                        }
                        {subType === "20" &&
                            <div className="row mb-3">
                                <label className="form-label">Answer (In British)</label>
                                <textarea className="form-control" value={britishAnswer} onChange={(e) => setBritishAnswer(e.target.value)} />
                            </div>
                        }

                        {(subType === "7" || subType === "22" || subType === "21" || subType === "15" || subType === "16" || subType === "18") &&
                            <div className="row mb-3">
                                <label className="form-label">Transcription</label>
                                <textarea className="form-control" value={transcription} onChange={(e) => setTranscription(e.target.value)} />
                            </div>
                        }

                        {subType === "12" &&
                            <div className="row mb-3">
                                <label className="form-label">Drag And Drop (Please Enter Value with ,)</label>
                                <textarea className="form-control" value={dragAndDrop} onChange={(e) => setDragAndDrop(e.target.value)} />

                            </div>
                        }

                        {(subType === "10" || subType === "14" || subType === "13" || subType === "15" || subType === "16" || subType === "18" || subType === "20" || subType === "21") &&
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

export default QuestionEdit;
