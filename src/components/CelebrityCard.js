import { useEffect, useRef, useState } from "react";
import pencil from "../assets/pencil-solid.svg";
import trash from "../assets/trash-solid.svg";
const CelebrityCard = ({ isOpen, setIsOpen, celeb }) => {
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
    setIsOpen(!isOpen);
  };
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  const discardEdit = () => {
    setCelebName(`${celeb.first} ${celeb.last}`);
    setCelebGender(celeb.gender);
    setCelebCountry(celeb.country);
    setIsEdit(false);
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
        <div className="flex justify-start my-4 [&>div]:w-2/3">
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
            <p className="mb-1">Gender</p>
            {isEdit ? (
              <select
                ref={gender}
                value={celebGender}
                onChange={(e) => setCelebGender(e.target.value)}
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
                onChange={(e) => setCelebCountry(e.target.value)}
                className="px-2 py-1 -ml-1 rounded-lg outline-none border"
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
        <div className="flex justify-end my-4">
          {isEdit ? (
            <>
              <img
                src="test"
                alt="cancel"
                onClick={discardEdit}
              />
              <img
                src="test"
                alt="save"
                onClick={saveUserDetails}
              />
            </>
          ) : (
            <>
              <img
                src={pencil}
                alt="edit"
                onClick={toggleEdit}
                className="w-6 mx-1 px-1"
              />
              <img
                src={trash}
                alt="del"
                className="w-6 mx-1 px-1"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CelebrityCard;
