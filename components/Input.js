import {
        CalendarIcon,
        ChartBarIcon,
        EmojiHappyIcon,
        PhotographIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
        addDoc,
        collection,
        serverTimestamp,
        updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function Input() {
        const [input, setInput] = useState("");
        const [selectedFile, setSelectedFile] = useState(null);
        const filePickerRef = useRef(null);
        const [loading, setLoading] = useState(false);
        const [showEmojis, setShowEmojis] = useState(false);

        const sendPost = async () => {
                if (loading) return;
                setLoading(true);

                const docRef = await addDoc(collection(db, "posts"), {
                        // id: session.user.uid,
                        // username: session.user.name,
                        // userImg: session.user.image,
                        // tag: session.user.tag,
                        text: input,
                        timestamp: serverTimestamp(),
                });

                const imageRef = ref(storage, `posts/${docRef.id}/image`);

                if (selectedFile) {
                        await uploadString(
                                imageRef,
                                selectedFile,
                                "data_url"
                        ).then(async () => {
                                const downloadURL = await getDownloadURL(
                                        imageRef
                                );
                                await updateDoc(doc(db, "posts", docRef.id), {
                                        image: downloadURL,
                                });
                        });
                }

                setLoading(false);
                setInput("");
                setSelectedFile(null);
                setShowEmojis(false);
        };

        const addImageToPost = (e) => {
                const reader = new FileReader();
                if (e.target.files[0]) {
                        reader.readAsDataURL(e.target.files[0]);
                }

                reader.onload = (readerEvent) => {
                        setSelectedFile(readerEvent.target.result);
                };
        };

        return (
                <div
                        className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll `}
                >
                        <img
                                src="https://lh3.googleusercontent.com/ogw/ADea4I5IC3Q4NpMUv1fxoduZiLcuQDuoB8CVEQAwZ0yOiQ=s32-c-mo"
                                alt=""
                                className="h-11 w-11 rounded-full cursor-pointer"
                        />
                        <div className="w-full divide-y divide-gray-700">
                                <div
                                        className={`${selectedFile && "pb-7"} ${
                                                input && "space-x-2.5"
                                        }`}
                                >
                                        <textarea
                                                value={input}
                                                onChange={(e) => {
                                                        setInput(
                                                                e.target.value
                                                        );
                                                }}
                                                className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                                                placeholder="What's Happening?"
                                                rows="2"
                                        />

                                        {selectedFile && (
                                                <div className="relative">
                                                        <div
                                                                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                                                                onClick={() =>
                                                                        setSelectedFile(
                                                                                null
                                                                        )
                                                                }
                                                        >
                                                                <XIcon className="text-white h-5" />
                                                        </div>
                                                        <img
                                                                src={
                                                                        selectedFile
                                                                }
                                                                alt=""
                                                                className="rounded-2xl max-h-80 object-contain"
                                                        />
                                                </div>
                                        )}
                                </div>
                                <div>
                                        <div className="flex items-center justify-between pt-2.5">
                                                <div className="flex items-center">
                                                        <div
                                                                className="icon"
                                                                onClick={() =>
                                                                        filePickerRef.current.click()
                                                                }
                                                        >
                                                                {selectedFile ===
                                                                null ? (
                                                                        <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                                                                ) : (
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                                aria-hidden="true"
                                                                                className="h-[22px] text-[#1d9bf0]"
                                                                        >
                                                                                <path
                                                                                        fill-rule="evenodd"
                                                                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                                                        clip-rule="evenodd"
                                                                                ></path>
                                                                        </svg>
                                                                )}
                                                                <input
                                                                        type="file"
                                                                        hidden
                                                                        onChange={
                                                                                addImageToPost
                                                                        }
                                                                        ref={
                                                                                filePickerRef
                                                                        }
                                                                />
                                                        </div>
                                                        <div className="icon rotate-90">
                                                                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                                                        </div>

                                                        <div
                                                                className="icon"
                                                                onClick={() =>
                                                                        setShowEmojis(
                                                                                !showEmojis
                                                                        )
                                                                }
                                                        >
                                                                {showEmojis ===
                                                                true ? (
                                                                        <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                                aria-hidden="true"
                                                                                className="text-[#1d9bf0] h-[22px]"
                                                                        >
                                                                                <path
                                                                                        fill-rule="evenodd"
                                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                                                                        clip-rule="evenodd"
                                                                                ></path>
                                                                        </svg>
                                                                ) : (
                                                                        <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                                                                )}
                                                        </div>

                                                        <div className="icon">
                                                                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                                                        </div>

                                                        {showEmojis && (
                                                                <Picker
                                                                        onSelect={
                                                                                addEmoji
                                                                        }
                                                                        style={{
                                                                                position: "absolute",
                                                                                marginTop: "465px",
                                                                                marginLeft: -40,
                                                                                maxWidth: "320px",
                                                                                borderRadius:
                                                                                        "20px",
                                                                        }}
                                                                        theme="dark"
                                                                />
                                                        )}
                                                </div>
                                                <button
                                                        className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:bg-opacity-50 disabled:cursor-default"
                                                        disabled={
                                                                !input.trim() &&
                                                                !selectedFile
                                                        }
                                                >
                                                        Tweet
                                                </button>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default Input;
