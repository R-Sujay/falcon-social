import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import { EmojiHappyIcon as EmojiHappyIconFilled, PhotographIcon as PhotographIconFilled } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import useSession from "../lib/useSession";
import uploadFile from "../lib/uploadFile";
import addPost from "../lib/addPost";
import useGetState from "../hooks/useGetState";
import { useRecoilState } from "recoil";
import { showEmojisState } from "../atoms/PostAtom";

function Input() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useRecoilState(showEmojisState);
  const { getPosts } = useGetState({ postId: "" });

  const { data: session } = useSession();

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    setShowEmojis(false);

    let imageUrl;

    if (selectedFile) {
      const fileUpload = await uploadFile(image).then((res) => {
        imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${res.bucketId}/files/${res.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      });
    }

    const promise = await addPost({
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      ...(image && { image: imageUrl }),
    }).then((res) => console.log(res));

    getPosts();

    setLoading(false);
    setInput("");
    setSelectedFile(null);
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

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div className={`mt-5 py-5 px-6 z-[300] bg-clip-padding backdrop-filter backdrop-blur rounded-3xl p-3 flex space-x-3 scrollbar-hide ${loading && "animate-pulse"}`}>
      <img src={session.user.image} alt="" className="h-11 w-11 rounded-full cursor-pointer" />
      <div className="divide-y divide-gray-700 w-full">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="What's New?" rows="2" className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]" />

          {selectedFile && (
            <div className="relative">
              <div className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer" onClick={() => setSelectedFile(null)}>
                <XIcon className="text-white h-5" />
              </div>
              <img src={selectedFile} alt="" className="rounded-2xl max-h-80 object-contain" />
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center space-x-1">
              <div className="icon" onClick={() => filePickerRef.current.click()}>
                {!selectedFile ? <PhotographIcon className="text-gray-500 h-[22px]" /> : <PhotographIconFilled className="text-[#1d9bf0] h-[22px]" />}
                <h1 className={`font-semibold text-sm hidden md:inline ${selectedFile ? "text-[#1d9bf0]" : "text-gray-500"}`}>Photo</h1>
                <input
                  type="file"
                  ref={filePickerRef}
                  hidden
                  onChange={(e) => {
                    if (!e.target.files[0].type.startsWith("image/")) return;
                    setImage(e.target.files[0]);
                    addImageToPost(e);
                  }}
                  accept=".png, .jpg, .jpeg, .gif"
                />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                {showEmojis ? <EmojiHappyIconFilled className="text-[#1d9bf0] h-[22px]" /> : <EmojiHappyIcon className="text-gray-500 h-[22px]" />}
                <h1 className={`font-semibold text-sm hidden md:inline ${showEmojis ? "text-[#1d9bf0]" : "text-gray-500"}`}>Emoji</h1>
              </div>

              {showEmojis && (
                <div className="z-[2000] absolute mt-[465px]">
                  <Picker
                    onSelect={addEmoji}
                    style={{
                      maxWidth: "320px",
                      borderRadius: "20px",
                      zIndex: 2000,
                    }}
                    theme="dark"
                  />
                </div>
              )}
            </div>
            <button className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default" disabled={!input && !selectedFile} onClick={sendPost}>
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
