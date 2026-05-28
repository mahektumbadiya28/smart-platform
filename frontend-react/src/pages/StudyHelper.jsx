import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
    toast
} from "react-toastify";

function StudyHelper() {
    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState([]);
    const [summary, setSummary] = useState("");
    const [pdf, setPdf] = useState(null);
    const [quiz, setQuiz] = useState([]);
    const [activeNoteId, setActiveNoteId] = useState(null);
    const [loadingQuiz, setLoadingQuiz] = useState(false);

    const headers = { Authorization: `Bearer ${token}` };

    const fetchNotes = async () => {
        try {
            const response = await API.get("/study/all/", { headers });
            setNotes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const addNote = async () => {
        if (!title || !content) return alert("Please fill in title and content");
        try {
            const response = await API.post(
                "/study/add/",
                { title, content },
                { headers }
            );
            setSummary(response.data.summary);
            setTitle("");
            setContent("");
            fetchNotes();
        } catch (error) {
            console.log(error);
            alert("Failed to add note");
        }
    };

    const uploadPDF = async () => {
        if (!title || !pdf) return alert("Please enter a title and select a PDF");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("pdf", pdf);
        try {
            const response = await API.post("/study/upload-pdf/", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setSummary(response.data.summary);
            toast.success("PDF Uploaded & AI Summary Generated 🚀");
            fetchNotes();
        } catch (error) {
            console.log(error);
            toast.error("Failed to upload PDF");
        }
    };

    const generateQuiz = async (noteId) => {
        setLoadingQuiz(true);
        setActiveNoteId(noteId);
        setQuiz([]);
        try {
            const response = await API.post(
                "/study/generate-quiz/",
                { note_id: noteId },
                { headers }
            );
            setQuiz(response.data);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.error || "Failed to generate quiz");
        } finally {
            setLoadingQuiz(false);
        }
    };

    return (
        <div className="flex bg-slate-950 min-h-screen text-white">
            <Sidebar />

            <div className="flex-1 p-8 space-y-8">
                <Navbar />

                <div>
                    <h1 className="text-3xl font-bold">Study Helper 📘</h1>
                    <p className="text-slate-400 text-sm mt-1">Add notes, get AI summaries & generate quizzes</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Add Note Form */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold mb-5">Add Note</h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Note Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 focus:border-cyan-500 focus:outline-none text-white placeholder-slate-500 px-4 py-3 rounded-xl text-sm transition-colors"
                                />
                                <textarea
                                    placeholder="Write your notes here..."
                                    rows="6"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 focus:border-cyan-500 focus:outline-none text-white placeholder-slate-500 px-4 py-3 rounded-xl text-sm transition-colors resize-none"
                                />
                                <button
                                    onClick={addNote}
                                    className="w-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
                                >
                                    + Add Note & Generate Summary
                                </button>
                            </div>
                        </div>

                        {/* PDF Upload */}
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                            <h2 className="text-lg font-semibold mb-4">Upload PDF</h2>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setPdf(e.target.files[0])}
                                className="w-full text-sm text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer"
                            />
                            <button
                                onClick={uploadPDF}
                                className="w-full mt-4 bg-violet-500 hover:bg-violet-400 active:scale-95 text-white font-semibold py-3 rounded-xl transition-all duration-200"
                            >
                                Upload PDF 📄
                            </button>
                        </div>

                        {/* AI Summary result */}
                        {summary && (
                            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5">
                                <h3 className="text-emerald-400 font-semibold mb-2">🤖 AI Summary</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">{summary}</p>
                            </div>
                        )}
                    </div>

                    {/* Notes List */}
                    <div className="xl:col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold">Saved Notes ({notes.length})</h2>

                        {notes.length === 0 ? (
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 text-center">
                                <p className="text-4xl mb-3">📘</p>
                                <p className="text-slate-400 text-sm">No notes yet. Add your first note!</p>
                            </div>
                        ) : (
                            notes.map((note) => (
                                <div
                                    key={note.id}
                                    className="bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-2xl p-5 transition-colors"
                                >
                                    <h3 className="font-bold text-white text-lg">{note.title}</h3>
                                    <p className="text-slate-400 text-sm mt-1 line-clamp-3">{note.content}</p>

                                    {note.summary && (
                                        <div className="mt-3 p-3 bg-slate-900 rounded-xl">
                                            <p className="text-xs text-cyan-400 font-semibold mb-1">🤖 AI Summary</p>
                                            <p className="text-slate-300 text-xs leading-relaxed">{note.summary}</p>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => generateQuiz(note.id)}
                                        disabled={loadingQuiz && activeNoteId === note.id}
                                        className="mt-4 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/40 text-violet-300 text-sm font-medium px-4 py-2 rounded-xl transition-all active:scale-95 disabled:opacity-60"
                                    >
                                        {loadingQuiz && activeNoteId === note.id ? "Generating..." : "Generate Quiz 🧠"}
                                    </button>
                                </div>
                            ))
                        )}

                        {/* Quiz Section */}
                        {quiz.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-lg font-semibold">Generated Quiz 🧠</h2>
                                    <span className="bg-violet-500/20 text-violet-400 text-xs px-2.5 py-1 rounded-lg border border-violet-500/30">
                                        {quiz.length} questions
                                    </span>
                                </div>

                                {quiz.map((q, i) => (
                                    <div
                                        key={q.id}
                                        className="bg-slate-800 border border-violet-500/30 rounded-2xl p-5"
                                    >
                                        <p className="font-semibold text-white mb-4">
                                            Q{i + 1}. {q.question}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                            {[q.option1, q.option2, q.option3, q.option4].map((opt, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${opt === q.answer
                                                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                                                        : "bg-slate-900 border-slate-700 text-slate-300"
                                                        }`}
                                                >
                                                    {String.fromCharCode(65 + idx)}. {opt}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-emerald-400 font-semibold">
                                            ✅ Correct Answer: {q.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudyHelper;