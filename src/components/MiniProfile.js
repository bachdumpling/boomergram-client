import React, { useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import Dictionary from "./Dictionary";

function MiniProfile({ user, handleLogout }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [word, setWord] = useState("");

  const dictionaryArr = Object.keys(Dictionary);

  function lookUp(phrase) {
    for (const key in Dictionary) {
      if (phrase.toLowerCase().includes(key)) {
        setWord(key);
        return;
      }
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-between mt-14 ml-10">
        <img
          className="w-16 h-16 object-cover rounded-full border p-[2px]"
          src={user.avatar_url}
          alt
        />

        <div className="flex-1 mx-4">
          <h2 className="font-bold">{user.username}</h2>
          <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
        </div>
        <button
          onClick={handleLogout}
          className="text-blue-400 text-sm font-semibold"
        >
          Sign Out
        </button>
      </div>

      <div className="border-2 border-gray-200 rounded-md mt-10 ml-10 h-[350px] bg-white">
        <div className="text-center font-semibold pt-5 tracking-wide">
          Gen Z Dictionary ↓
        </div>

        <div className="relative p-4 rounded-md pb-5">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            // value={searchTerm}
            className="bg-gray-100 w-72 block pl-10 text-md sm:text-sm border-none rounded-md focus:ring-black focus:border-gray-600"
            type="text"
            placeholder="Which word is hurting your brain?"
          />
        </div>

        <div className="px-4">
          {searchTerm ? (
            <div className="-translate-y-3">
              <div className="bg-gray-100 w-72 items-center rounded-md shadow-md h-40 absolute overflow-y-auto scrollbar-thumb-gray-400 scrollbar-round cursor-pointer">
                {dictionaryArr
                  .filter((phrase) => {
                    if (searchTerm == "") {
                      return null;
                    } else if (
                      phrase.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return phrase;
                    }
                  })
                  .map((phrase, key) => {
                    return (
                      <div
                        onClick={() => {
                          lookUp(phrase);
                          setSearchTerm("");
                        }}
                        className="text-blue-500 flex flex-col justify-start truncate py-2 px-4 text-md font-semibold"
                      >
                        <p>{phrase}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : null}
        </div>

        {word ? (
          <div className="border-t-2 h-96 w-80 font-serif grid grid-flow-row grid-cols-1 grid-rows-2 justify-between">
            <div className="row-span-1">
              <div className="px-4 py-4 text-3xl font-bold text-blue-500 normal-case">
                {word}
              </div>

              <div className="text-lg px-4 normal-case">
                <span>{Dictionary[word]}</span>
              </div>
            </div>

            <div className=" w-80 h-10 flex px-4 mb-2 justify-end row-span-1">
              <XIcon
                onClick={() => setWord("")}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div className="border-t-2 h-full w-full font-serif text-center">
            <div className="pt-10 text-lg text-gray-500">No word to show</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MiniProfile;
