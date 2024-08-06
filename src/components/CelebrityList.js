import { useState } from "react";
import CelebrityCard from "./CelebrityCard";
import celebrities from "../data/celebrities.json";

const CelebrityList = () => {
  const [celebIndex, setCelebIndex] = useState(null);

  const handleCelebIndex = (index) => {
    setCelebIndex((previndex) => (previndex === index ? null : index));
  };
  return (
    <div className="py-2 w-1/2 m-auto">
      <div>
        <input
          type="text"
          placeholder="Search user"
          className="w-full border rounded-lg px-2 py-1 outline-none"
        />
      </div>
      <main className="py-4">
        {celebrities.map((celeb) => {
          return (
            <CelebrityCard
              key={celeb.id}
              isOpen={celebIndex === celeb.id}
              setIsOpen={() => handleCelebIndex(celeb.id)}
              celeb={celeb}
            />
          );
        })}
      </main>
    </div>
  );
};

export default CelebrityList;
