import { useEffect, useRef, useState } from "react";
import pencil from "../assets/pencil-solid.svg";
import trash from "../assets/trash-solid.svg";
import discard from "../assets/discard-cross.svg";
import save from "../assets/save-tick.svg";

const CelebrityCard = ({
  isOpen,
  setIsOpen,
  celeb,
  isEditing,
  setIsEditing,
  setIsVisible,
  setIsDeleteConfirmed,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [celebName, setCelebName] = useState(`${celeb.first} ${celeb.last}`);
  const [celebGender, setCelebGender] = useState(celeb.gender);
  const [celebCountry, setCelebCountry] = useState(celeb.country);
  const [celebAge, setCelebAge] = useState(celeb.country);
  const [celebDescription, setCelebDescription] = useState(celeb.description);
  const name = useRef();
  const country = useRef();
  const age = useRef();
  const gender = useRef();

  const toggleView = () => {
    if (!isEditing) {
      setIsOpen(!isOpen);
    }
  };
  const toggleEdit = () => {
    setIsEdit(true);
    setIsEditing(true);
  };
  const discardEdit = () => {
    setCelebName(`${celeb.first} ${celeb.last}`);
    setCelebGender(celeb.gender);
    setCelebCountry(celeb.country);
    setIsEdit(false);
    setIsEditing(false);
  };

  const calculateAgeByDob = (dob) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    const birthYear = Number(dob.substr(0, 4));
    const birthMonth = Number(dob.substr(5, 2));
    const birthDate = Number(dob.substr(8, 2));

    let age = currentYear - birthYear;
    age = currentMonth >= birthMonth && currentDate >= birthDate ? age : --age;
    return age;
  };

  const saveUserDetails = () => {
    setCelebName(name.current.value);
    setCelebGender(gender.current.value);
    setCelebCountry(country.current.value);
    setIsEdit(false);
    setIsEditing(false);
  };

  const showDeleteConfirmationDialog = () => {
    setIsVisible(true);
    setIsDeleteConfirmed({ delete: false, id: celeb.id });
  };
  useEffect(() => {
    setCelebAge(calculateAgeByDob(celeb.dob));
  }, []);

  return (
    <div className="w-full border rounded-lg my-4 px-4 cursor-pointer transition-all duration-500">
      <div
        className="flex justify-between items-center"
        onClick={toggleView}
      >
        <div className="flex items-center">
          <img
            src={celeb.picture}
            alt="avatar"
            className="w-12 h-12 p-1 rounded-full"
          ></img>
          {isEdit ? (
            <input
              ref={name}
              type="text"
              value={celebName}
              onChange={(e) => setCelebName(e.target.value)}
              className="px-2 py-1 outline-none border"
            />
          ) : (
            <p className="px-2">{celebName}</p>
          )}
        </div>
        <p className="p-2 -mt-1">
          <span
            className={`inline-block p-1 border-b-2 border-r-2 transition-all duration-500 ${
              isOpen ? "-rotate-[135deg]" : "rotate-45"
            }`}
          ></span>
        </p>
      </div>
      {isOpen && (
        <div className="flex justify-start items-center my-4 [&>div]:w-2/3">
          <div>
            <p className="mb-1 ml-1">Age</p>
            {isEdit ? (
              <div className="border w-24 rounded-lg">
                <input
                  ref={age}
                  type="number"
                  value={celebAge}
                  onChange={(e) => setCelebAge(e.target.value)}
                  className="px-1 py-1 ml-1 outline-none w-8"
                />
                <span className="px-1">Years</span>
              </div>
            ) : (
              <p className="py-1 ml-1">{celebAge} Years</p>
            )}
          </div>
          <div>
            <p className="mb-1 -mt-2 align-top">Gender</p>
            {isEdit ? (
              <select
                ref={gender}
                value={celebGender}
                onChange={(e) => setCelebGender(e.target.value)}
                className="w-fit mr-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Rather not say">Rather not say</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="capitalize">{celebGender}</p>
            )}
          </div>
          <div>
            <p className="mb-1">Country</p>
            {isEdit ? (
              <input
                ref={country}
                type="text"
                value={celebCountry}
                onChange={(e) => {
                  setCelebCountry(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key >= 0 && e.key <= 9) e.preventDefault();
                }}
                className="px-2 py-1 -ml-1 rounded-lg outline-none border w-full"
              />
            ) : (
              <p className="py-1">{celebCountry}</p>
            )}
          </div>
        </div>
      )}
      {isOpen && (
        <div className="mb-2">
          <p className="py-2">Description</p>
          {isEdit ? (
            <textarea
              value={celebDescription}
              onChange={(e) => setCelebDescription(e.target.value)}
              className="w-full resize-none min-h-24 p-1 rounded-lg outline-none border"
            ></textarea>
          ) : (
            <p>{celebDescription}</p>
          )}
        </div>
      )}
      {isOpen && celebAge >= 18 && (
        <div className="flex justify-end my-4 items-center">
          {isEdit ? (
            <>
              <img
                src={discard}
                alt="cancel"
                className="w-12 h-12 mx-1 px-1"
                onClick={discardEdit}
              />
              <img
                src={save}
                alt="save"
                className="w-12 h-12 mx-1 px-1"
                onClick={saveUserDetails}
              />
            </>
          ) : (
            <>
              <img
                src={trash}
                alt="del"
                onClick={showDeleteConfirmationDialog}
                className="w-8 mx-3 mt-2 px-1"
                title="Delete User"
              />
              <img
                src={pencil}
                alt="edit"
                onClick={toggleEdit}
                className="w-7 mx-3 mt-2 px-1"
                title="Edit User Details"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CelebrityCard;
