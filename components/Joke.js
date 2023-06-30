function Joke({ result }) {
  return (
    <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-[#6e767d] text-sm font-semibold">{result.setup}</h1>
        <h6 className="font-bold max-w-[250px] text-xs">{result.punchline}</h6>
      </div>
    </div>
  );
}

export default Joke;
