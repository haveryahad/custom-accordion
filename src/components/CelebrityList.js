import { useRef, useState } from "react";
import CelebrityCard from "./CelebrityCard";
import celebrities from "../data/celebrities.json";
import DeleteDialog from "./DeleteDialog";
import BlurOverlay from "./BlurOverlay";

const CelebrityList = () => {
  const [listOfCelebrities, setListOfCelebrities] = useState(celebrities);
  const [celebIndex, setCelebIndex] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState({
    delete: false,
    id: null,
  });
  const search = useRef();

  const handleCelebIndex = (index) => {
    setCelebIndex((previndex) => (previndex === index ? null : index));
  };
  const handleIsDeleteConfirmed = (id) => {
    setIsDeleteConfirmed({ delete: true, id: id });
    setIsVisible(false);
  };

  const handleIsDeleteCancelled = (flag) => {
    setIsDeleteConfirmed({ delete: false, id: null });
    setIsVisible(flag);
  };
  const searchCelebrities = () => {
    const filteredCelebrities = celebrities.filter((celeb) => {
      return (
        celeb.first.toLowerCase().search(search.current.value) !== -1 ||
        celeb.last.toLowerCase().search(search.current.value) !== -1
      );
    });
    setListOfCelebrities(filteredCelebrities);
  };
  return (
    <div className="py-2 w-2/5 mt-8 mx-auto">
      {isVisible && (
        <>
          <BlurOverlay />
          <DeleteDialog
            isDeleteConfirmed={isDeleteConfirmed}
            handleDeleteConfirm={(id) => handleIsDeleteConfirmed(id)}
            handleCancelDelete={() => handleIsDeleteCancelled(false)}
          />
        </>
      )}
      <div>
        <input
          ref={search}
          type="text"
          placeholder="Search user"
          className="w-full border rounded-lg px-2 py-1 outline-none"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyUp={searchCelebrities}
        />
      </div>
      <main className="py-4">
        {listOfCelebrities.map((celeb) => {
          return isDeleteConfirmed.delete &&
            isDeleteConfirmed.id === celeb.id ? (
            <></>
          ) : (
            <CelebrityCard
              key={celeb.id}
              isOpen={celebIndex === celeb.id}
              setIsOpen={() => handleCelebIndex(celeb.id)}
              celeb={celeb}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setIsVisible={setIsVisible}
              setIsDeleteConfirmed={setIsDeleteConfirmed}
            />
          );
        })}
      </main>
    </div>
  );
};

export default CelebrityList;
