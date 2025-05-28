import {GuestBook, CreateGuestBook} from "@types/types"
import { useState, useEffect } from "react";
import {createGuestBook, fetchGuestBookList, deleteGuestBook} from "../api/fetchGuestBook";
import {toast} from "react-toastify";


export const Guestbook = () => {
    //상태로 저장
    const [guestBooks, setGuestBooks] = useState<GuestBook[]>([]); //방명록
    const [name, setName] = useState(""); //이름
    const [password, setPassword] = useState(""); //비밀번호
    const [message, setMessage] = useState(""); //메시지

    useEffect(() => {
        loadGuestBooks();
    }, []);

    const loadGuestBooks = async () => {
        const data = await fetchGuestBookList();
        setGuestBooks(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())); //createAt을 비교하여 내림차순(최신순)
    };

    //등록 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newGuestBook: CreateGuestBook = { name, message, password };
        // 등록 성공하면 (true 값)
        const success = await createGuestBook(newGuestBook);
        if (success) {
            await loadGuestBooks(); // 목록 다시 불러오기
            handleReset(); //입력 필드 초기화
        }
    };

    //삭제함수
    const handleDelete = async (id: string) => {
        const password = prompt("삭제하려면 비밀번호를 입력하세요:");
        // 취소하면 아무것도 안 함
        if (!password) return;
        // 삭제 성공하면 (true 값)
        const success = await deleteGuestBook(id,password);
        if (success) {
            await loadGuestBooks(); // 목록 다시 불러오기
        }
    };

    //리셋함수
    const handleReset = () => {
        // 입력 필드 초기화
        setName("");
        setMessage("");
        setPassword("");
    }

    return (
        <div className="w-full max-w-5xl min-w-4xl p-6 backdrop-blur-md">
            <h1 className="text-6xl font-semibold text-gray-900 text-center mb-3">What Visitors Say</h1>
            <p className="text-lg text-gray-500 text-center mb-10">방명록을 남겨보세요.</p>

            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="👤 Name"
                        maxLength={20}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => {
                            const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 4);
                            setPassword(onlyNums);
                            // setPassword(e.target.value);
                        }}
                        placeholder="🔑 4자리 비밀번호"
                        maxLength={4}
                        required
                        className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-gray-500"
                    />

                </div>

                <textarea
                    placeholder="💬 Write your message..."
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-gray-500"
                />

                <div className="flex justify-end gap-3">
                    <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300" onClick={handleReset} >Reset</button>
                    <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Finish</button>
                </div>
            </form>

            {/* 방명록 리스트 */}
            <div className="mt-[60px] space-y-4 min-h-40 max-h-96 overflow-y-auto">

            {guestBooks.map((entry, index) => (
                    <div key={entry.id} className="p-4 bg-white/60 rounded-lg border border-gray-200 shadow-md">
                        <div className="flex justify-between items-center text-gray-700 text-sm">
                            <span>No. {guestBooks.length - index}</span>
                            <span>{entry.name}</span>
                            <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                            <button
                                onClick={() => handleDelete(entry.id)}
                                className="text-red-500 hover:text-red-700 text-xs"
                            >
                                ❌ 삭제
                            </button>
                        </div>
                        <p className="mt-2 text-gray-900">{entry.message}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};


