// 질문 수정, 삭제, 추가
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addNewQuestion, deleteQuestion, editQuestion, fetchInterview} from "@api/fetchInterviews";
import {Interview} from "@interfaces/types";

export const UpdateInterview = () => {
    const { id } = useParams<{ id: string }>();

    //state(상태관리 필요한 것) -> 인터뷰 내용, 수정중인 항목
    const [interview, setInterview] = useState<Interview | null>(null); //인터뷰
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null); //항목이 수정 중인지 여부
    const [showModal, setShowModal] = useState(false); //질문 추가 모달창 여부
    const [newQuestion, setNewQuestion] = useState(''); //새 질문
    const [newAnswer, setNewAnswer] = useState(''); //새 답변

    useEffect(() => {
        const loadInterviewData = async () => {
            if (!id) return;
            const interviewData = await fetchInterview(id);
            setInterview(interviewData); // 인터뷰 데이터를 상태에 저장
        };
        loadInterviewData();
    }, [id]); // id가 바뀔 때마다 새로 고침

    // [edit_버튼1] 항목 수정 모드(toggle): 이전에 저장한 editingQuestionId(prev)와 비교하여 수정 모드 시작 혹은 종료
    const handleToggleEdit = (questionId: string) => {
        setEditingQuestionId((prev) => (prev === questionId ? null : questionId));
    };

    // [edit] 수정내용 상태 저장: 수정 후 ui부터 반영하기 위해
    const handleQuestionChange = (questionId: string, field: 'question' | 'answer', value: string) => {
        if (interview) {
            const updatedQuestions = interview.questions.map((q) =>
                q.id === questionId ? { ...q, [field]: value } : q
            )
            setInterview({ ...interview, questions: updatedQuestions });
        }
    };

    // [edit_button2] 수정내용 DB 저장:
    const handleSaveEdit = async (questionId: string) => {
        if (!interview) return;
        //수정하려는 내용 찾기
        const questionToUpdate = interview.questions.find(q => q.id === questionId);

        if (!questionToUpdate) return;

        // 수정된 내용을 DB에 반영
        const response = await editQuestion(interview.interviewee.id, questionId, questionToUpdate.question, questionToUpdate.answer);

        if (response) setEditingQuestionId(null);

    };
    
    // [delete_button1] 삭제 버튼 클릭 시 삭제 확인
    const handleDelete = (questionId: string) => {
        if (!interview) return;
        //삭제하려는 내용 찾기
        const questionToDelete = interview.questions.find(q => q.id === questionId);

        // 질문 정보가 있을 경우
        if (questionToDelete) {
            const isConfirmed = window.confirm(
                `질문: "${questionToDelete.question}"\n답변: "${questionToDelete.answer}"\n정말로 삭제하시겠습니까?`
            );

            if (isConfirmed) {
                // 삭제 진행
                handleDeleteQuestion(questionId);
            }
        }
    };

    // [delete_button2] 삭제 DB 저장
    const handleDeleteQuestion = async (questionId: string) => {
        if (!interview) return;

        // 질문 삭제
        const updatedQuestions = interview.questions.filter(q => q.id !== questionId);

        // DB에서 삭제 요청
        await deleteQuestion(interview.interviewee.id, questionId);

        // ui에 질문 삭제 반영
        setInterview({ ...interview, questions: updatedQuestions });

    };

    // [add]
    const handleAddNewQuestion = async () => {
        if (!newQuestion || !newAnswer) {
            alert("질문과 답변을 모두 입력해주세요.");
            return;
        }
        if (!id) return;
        const res = await addNewQuestion(id, newQuestion, newAnswer);
            if(res) {
                setNewQuestion('');
                setNewAnswer('');
                setShowModal(false);
                const updatedInterview = await fetchInterview(id); // 새로 추가된 질문을 포함하여 인터뷰 데이터 갱신
                setInterview(updatedInterview);
            }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">인터뷰 수정</h1>
                <div className="w-20 h-1 bg-custom mx-auto mt-4 rounded-full"></div>
            </header>

            <div id="update-container">
                {interview ? (
                    <>
                    <div className="flex justify-between items-center mb-[20px]">
                        {/* 제목 */}
                        <h2 className="text-2xl font-bold">
                            {interview.interviewee.name} {interview.interviewee.role}님 인터뷰
                        </h2>
                        {/* 질문 추가 버튼 */}
                        <button
                            className="bg-black text-white text-sm px-4 py-2 rounded-lg transition-colors hover:bg-gray-900"
                            onClick={() => setShowModal(true)}
                        >
                            <i className="fas fa-plus mr-2"></i>질문 추가
                        </button>
                    </div>
                        <div>
                            {interview.questions.map((q, index) => (
                                <div
                                    key={q.id}
                                    id={`question-${q.id}`}
                                    className="bg-white rounded-lg border border-gray-300 p-8 space-y-4 hover:shadow-md transition-shadow duration-300 mb-2"

                                >

                                    {/* 질문 인덱스 */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="w-10 h-10 flex items-center justify-center bg-custom text-white bg-black rounded-full font-medium shadow-sm">Q</span>
                                            <h3 className="ml-4 text-lg font-medium text-gray-800">질문 {index + 1}</h3>
                                        </div>

                                        {/* 버튼(수정/삭제) 출력 부분 */}
                                        <div className="space-x-2">
                                            <button
                                                className="edit-button !rounded-button px-4 py-2 text-gray-600 hover:bg-gray-100"
                                                onClick={() => {
                                                    console.log("수정/저장 버튼 클릭됨, editingQuestionId:", editingQuestionId, "q.id:", q.id);
                                                    if (editingQuestionId === q.id) {
                                                        // 수정 버튼 클릭시, 수정 모드가 끝나고 저장이 되도록 함
                                                        handleSaveEdit(q.id);
                                                    } else {
                                                        // 수정 모드로 전환
                                                        handleToggleEdit(q.id);
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-edit mr-2"></i>
                                                {editingQuestionId === q.id ? '저장' : '수정'}
                                            </button>
                                            <button
                                                className="!rounded-button px-4 py-2 text-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(q.id)}
                                            >
                                                <i className="fas fa-trash-alt mr-2"></i>삭제
                                            </button>
                                        </div>
                                    </div>

                                    {/* 질문 & 답변 출력 부분 */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">질문</label>
                                            <textarea
                                                className="w-full rounded-lg border-gray-300 focus:border-custom focus:ring focus:ring-custom focus:ring-opacity-50 bg-gray-50"
                                                rows={2}
                                                value={editingQuestionId === q.id ? q.question : q.question} // 수정된 질문 내용
                                                onChange={(e) => handleQuestionChange(q.id, 'question', e.target.value)} // 질문 변경
                                                readOnly={editingQuestionId !== q.id} // 수정 중이 아닌 질문은 읽기 전용
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">답변</label>
                                            <textarea
                                                className="w-full rounded-lg border-gray-300 focus:border-custom focus:ring focus:ring-custom focus:ring-opacity-50 bg-gray-50"
                                                rows={4}
                                                value={editingQuestionId === q.id ? q.answer : q.answer} // 수정된 답변 내용
                                                onChange={(e) => handleQuestionChange(q.id, 'answer', e.target.value)} // 답변 변경
                                                readOnly={editingQuestionId !== q.id} // 수정 중이 아닌 질문은 읽기 전용
                                            />
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>인터뷰 데이터를 불러오는 중입니다...</p>
                )}

                {/* 질문 추가 모달 */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
                            <h3 className="text-xl font-bold mb-6">새 질문 추가</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">질문</label>
                                    <textarea
                                        className="w-full rounded-lg border-gray-300 focus:border-custom focus:ring focus:ring-custom focus:ring-opacity-50"
                                        rows={3}
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                        placeholder="새로운 질문을 입력하세요"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">답변</label>
                                    <textarea
                                        className="w-full rounded-lg border-gray-300 focus:border-custom focus:ring focus:ring-custom focus:ring-opacity-50"
                                        rows={5}
                                        value={newAnswer}
                                        onChange={(e) => setNewAnswer(e.target.value)}
                                        placeholder="답변을 입력하세요"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end space-x-4">
                                <button
                                    className="!rounded-button px-6 py-2 bg-gray-500 text-white hover:bg-gray-600"
                                    onClick={() => setShowModal(false)}
                                >
                                    취소
                                </button>
                                <button
                                    className="!rounded-button px-6 py-2 bg-custom text-black hover:bg-custom/90"
                                    onClick={handleAddNewQuestion}
                                >
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};