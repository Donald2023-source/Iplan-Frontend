import { useContext, useState } from "react";
import { GeneralContext } from "../Context/Context";

const Worksheet = () => {
  const { selectedClass, selectedSubject } = useContext(GeneralContext);
  const weeks = Array.from({ length: 11 }, (_, i) => `week${i + 1}`);
  const [checkedWeeks, setCheckedWeeks] = useState(
    weeks.reduce((acc, week) => ({ ...acc, [week]: false }), {})
  );
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedWeeks((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  }
  return (
    <div>
      {console.warn(selectedSubject)}
      <p className="text-xl">Subject Name: {selectedSubject}</p>
      <p className="text-xl">Class: {selectedClass}</p>
      <div>
        {weeks.map((week) => (
          <div key={week} className="flex flex-col mb-4">
            <h2 className="text-center font-bold capitalize">{week} :</h2>
            <div className="flex justify-around items-center">
              <input type="file" />
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={week}
                  checked={checkedWeeks[week]}
                  onChange={handleCheckboxChange}
                />
                <h2 className={checkedWeeks[week] ? 'flex' : 'hidden'}>Seen</h2>
              </span>
              <textarea
                name="comment"
                className="border"
                readOnly
                rows="1"
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Worksheet;
