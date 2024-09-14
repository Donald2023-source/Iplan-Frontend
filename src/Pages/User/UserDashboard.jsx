import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../Context/Context";
import color from "../../assets/Color.jpg";
import cap from "../../assets/Cap (2).jpg";
import {
  FaCheckCircle,
  FaEdit,
  FaTimes,
  FaUpload,
  FaUserCheck,
} from "react-icons/fa";
import MyPdfViewer from "../Admin/Viewer/lessonPlanViewer";
import { ThreeDots } from "react-loader-spinner";
import Nav from "../../Components/Nav";
import Success from "../../Components/success";
import { h2 } from "fontawesome";

const UserDashboard = () => {
  const getSubjectIdFromLocalStorage = () => {
    try {
      return localStorage.getItem("selectedSubjectId") || "";
    } catch (error) {
      console.error("Error parsing selectedSubjectId from localStorage", error);
      return "";
    }
  };

  const getLessonPlanIdFromLocalStorage = () => {
    try {
      return localStorage.getItem("selectedLessonPlanId") || "";
    } catch (error) {
      console.error(
        "Error parsing selectedLessonPlanId from localStorage",
        error
      );
      return "";
    }
  };
  const {
    selectedSession,
    selectedSessionId,
    selectedTermId,
    selectedClassId,
    classId,
    selectedTerm,
    setSelectedSession,
    setSelectedTerm,
    setSelectedTermId,
    classes,
    sessions,
    terms,
    subjects,
    fetchSessions,
    handleSessionChange,
    handleTermChange,
    fetchTerms,
    fetchSubjects,
    fetchClasses,
    handleClassSelect,
    classItems,
    isLoading,
    setIsLoading,
    setIsSuccess,
    isSuccess,
    setIsFailed
  } = useContext(GeneralContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    getSubjectIdFromLocalStorage
  );
  const [title, setTitle] = useState("");
  const [lessonPlans, setLessonPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedLessonPlanId, setSelectedLessonPlanId] = useState(
    getLessonPlanIdFromLocalStorage
  );

  const [isUploadDialogue, setIsUploadDialogue] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentLessonPlan, setCurrentLessonPlan] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedFile, setUpdatedFile] = useState(null);
  const [updateDialogue, setUpdateDialogue] = useState(false);

  const [time, setTime] = useState(new Date());

    //  console.log(time.toTimeString())
     useEffect(() => {
      setInterval(() => setTime(new Date()))
     }, [])

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUploadSuccess = () => {
    setUploadSuccess(!uploadSuccess);
  };
  useEffect(() => {
    fetchSessions();
    fetchClasses();
  }, []);

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      fetchTerms(selectedSessionId);
    }
  }, [selectedSessionId]);

  useEffect(() => {
    if (selectedTermId) {
      fetchClasses();
    }
  }, [selectedTermId]);

  useEffect(() => {
    if (selectedClassId) {
      fetchSubjects();
    }
  }, [selectedClassId]);

  useEffect(() => {
    if (selectedLessonPlanId) {
      fetchComments();
    }
  }, [selectedLessonPlanId]);

  useEffect(() => {
    if (selectedSubjectId) {
      fetchSubjects();
    }
  }, [selectedSubjectId]);

  useEffect(() => {
    localStorage.setItem("selectedSessionId", selectedSessionId);
  }, [selectedSessionId]);

  useEffect(() => {
    localStorage.setItem("classId", classId);
  }, [classId]);

  useEffect(() => {
    const storedSubjectId = localStorage.getItem("selectedSubjectId");
    if (storedSubjectId) {
      setSelectedSubjectId(storedSubjectId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSession", JSON.stringify(selectedSession));
  }, [selectedSession]);

  useEffect(() => {
    localStorage.setItem("selectedTerm", JSON.stringify(selectedTerm));
  }, [selectedTerm]);

  useEffect(() => {
    localStorage.setItem("selectedTermId", selectedTermId);
  }, [selectedTermId]);

  useEffect(() => {
    const storedLessonPlanId = localStorage.getItem("selectedLessonPlanId");
    if (storedLessonPlanId) {
      setSelectedLessonPlanId(storedLessonPlanId);
    }
  }, []);

  const handleDialogue = () => {
    setIsUploadDialogue(!isUploadDialogue);
  };

  useEffect(() => {
    localStorage.setItem("selectedSubjectId", selectedSubjectId);
  }, [selectedSubjectId]);

  const handleFileChange = (e) => {
    // const file = e.target.files[0]
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (!title) {
      setErrorMessage("Title is required");
      setIsLoading(false);
      return;
    }
    if (!selectedFile) {
      setErrorMessage("File is required");
      setIsLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("lessonPlan", selectedFile);
    formData.append("title", title);
  
    try {
      const response = await fetch(`https://iplan-backend.onrender.com/sessions/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/subjects/${selectedSubjectId}/lessonPlans`, {
        method: "POST",
        body: formData,
        // Do not set Content-Type header manually
      });
  
      const data = await response.json();
      setIsLoading(false);
  
      if (response.ok) {
        console.log("File uploaded successfully", data);
        setTitle("");
        setSelectedFile(null);
        setErrorMessage("");
        setUploadSuccess(true);
        fetchUserLessonPlans();
      } else {
        setErrorMessage(data.error || "Failed to upload file");
        setIsFailed(true);
        setMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Error uploading file: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const fetchUserLessonPlans = async () => {
    try {
      const response = await fetch(`https://iplan-backend.onrender.com/sessions/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/subjects/${selectedSubjectId}/lessonPlans`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setLessonPlans(data);
        console.log(data);
      } else {
        setLessonPlans([]);
      }
    } catch (error) {
      console.error("Error occurred", error.message);
    }
  };

  const handleLessonPlanSelect = (lessonPlanId, fileUrl) => {
    localStorage.setItem("selectedLessonPlanId", lessonPlanId);
    setSelectedLessonPlanId(lessonPlanId);
    window.open(fileUrl, "_blank");
    fetchComments();
  };
  

  useEffect(() => {
    if (
      selectedSessionId &&
      selectedTermId &&
      selectedClassId &&
      selectedSubjectId
    ) {
      fetchUserLessonPlans();
    }
  }, [selectedSessionId, selectedTermId, selectedClassId, selectedSubjectId]);

  // console.log(selectedSubjectId);
  // console.log(selectedLessonPlanId);

  const fetchComments = async () => {
    try {
      if (selectedLessonPlanId) {
        const response = await fetch(`https://iplan-backend.onrender.com/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/subjects/${selectedSubjectId}/lessonPlans/${selectedLessonPlanId}/comments`
        );

        if (response.ok) {
          const data = await response.json();
          setComments(data);
          console.log(data);
        } else {
          console.error("Failed to fetch comments:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  const handleUpdateLessonPlan = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", updatedTitle);
    if (updatedFile) {
      formData.append("lessonPlan", updatedFile);
    }

    try {
      const response = await fetch(
        `https://iplan-backend.onrender.com/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/subjects/${selectedSubjectId}/lessonPlans/${selectedLessonPlanId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Lesson Plan updated successfully", data);
        setLessonPlans((prev) =>
          prev.map((plan) => (plan._id === selectedLessonPlanId ? data : plan))
        );
        setUpdateDialogue(false);
        setMessage("Lesson Plan Updated Successfully");
        setIsSuccess(true);
      } else {
        console.error("Failed to update lesson plan", data.error);
        setErrorMessage(data.error || "Failed to update lesson plan");
        setMessage("Lesson Plan Updated");
      }
    } catch (error) {
      console.error("Error updating lesson plan:", error.message);
      setErrorMessage("Error updating lesson plan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubjectId = e.target.value;
    localStorage.setItem("selectedSubjectId", selectedSubjectId);
    setSelectedSubjectId(selectedSubjectId);
  };

  const handleUpdateDialogue = () => {
    setUpdateDialogue(!updateDialogue);
    setUpdatedTitle(plan.title);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // console.warn(`selectedLessonPlanId: ${selectedLessonPlanId}`);

  return (
    <div>
      <div>
        <div className="flex justify-between mx-auto mt-1 rounded-lg w-[98%] px-5 lg:px-20 bg-white py-2 shadow items-center">
          <text className="text-center w-full font-semibold hover:scale-105 transition">{time.toLocaleTimeString()}</text>
        </div>
        <div className="mx-auto my-4 border lg:w-[80%] w-screen bg-[#252b63] py-12 lg:py-20  rounded-lg text-white">
          <h2 className="text-center text-3xl">
            Welcome <span className="font-medium">{firstName}!</span>
          </h2>
          <h2 className="text-center py-4">Welcome to Iplan</h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-4 py-5 grid-cols-2 md:grid-cols-3 w-screen">
        {/* Sessions */}
        <div className="bg-white px-3 lg:px-5 w-fit mx-auto md:44 rounded-lg border py-2">
          <h2 className="font-medium text-center text-lg">Sessions</h2>
          <select
            className="rounded-xl p-2 focus:outline-none cursor-pointer w-[9rem] text-sm lg:w-64 border"
            value={selectedSessionId || ""}
            onChange={handleSessionChange}
          >
            <option value="">Select session</option>
            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.name}
              </option>
            ))}
          </select>
        </div>

        {/* ====Terms====== */}
        <div className="bg-white px-3 lg:px-5 w-fit mx-auto rounded-lg border py-2">
          <h2 className="font-medium text-center text-lg">Terms</h2>
          <select
            className="rounded-xl p-2 focus:outline-none cursor-pointer w-[9rem] lg:w-64 border"
            value={selectedTermId || ""}
            onChange={handleTermChange}
          >
            <option value="">Select term</option>
            {terms.map((term) => (
              <option key={term._id} value={term._id}>
                {term.name}
              </option>
            ))}
          </select>
        </div>

        {/* ====Class===== */}
        <div className="bg-white px-3 lg:px-5 w-fit mx-auto rounded-lg border py-2">
          <h2 className="font-medium text-center text-lg">Class</h2>
          <select
            required
            className="rounded-xl p-2 focus:outline-none cursor-pointer w-[9rem] lg:w-64 border"
            onChange={handleClassSelect}
            value={selectedClassId || ""}
          >
            <option value="">Select class</option>
            {classItems}
          </select>
        </div>

        {/* Subject */}
        <div className="bg-white px-3 lg:px-5 w-fit mx-auto rounded-lg border py-2">
          <h2 className="font-medium text-center text-lg">Subject</h2>
          <select
            className="rounded-xl p-2 focus:outline-none cursor-pointer w-[9rem] lg:w-64 border"
            value={selectedSubjectId || ""}
            onChange={handleSubjectChange}
          >
            <option value="">Select subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* =====File Upload Dialogue ==== */}
        <div
          onClick={handleDialogue}
          className={
            isUploadDialogue
              ? "h-screen inset-0 fixed opacity-70 bg-black"
              : "hidden"
          }
        />

        <div
          className={
            isUploadDialogue
              ? "border shadow-lg bg-white fixed inset-0 rounded-lg w-fit mx-auto h-fit top-10"
              : "hidden"
          }
        >
          <form
            className="flex flex-col rounded-lg gap-6 px-3 py-6 items-center"
            onSubmit={handleFileUpload}
          >
            <span className="flex justify-between w-[20rem]">
              <h2 className="font-medium">Upload Lesson Plan</h2>
              <FaTimes
                onClick={handleDialogue}
                className="cursor-pointer"
                size={25}
                color="black"
              />
            </span>
            <div className="flex gap-3 items-center">
              <label className="text-sm">Title:</label>
              <input
                name="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Please enter your lesson plan title"
                type="text"
                className="p-2 border w-[20rem] lg:w-[25rem] rounded-lg"x
              />
            </div>

            <div className="flex gap-4 items-center">
              <label>File</label>
              <input
                accept=".pdf" 
                required
                className="p-2 lg:w-[25rem] rounded-lg border"
                name="lessonPlan"
                onChange={handleFileChange}
                type="file"
              />
            </div>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <button
              className="bg-blue-700 hover:scale-105 transition rounded-lg p-2 text-white"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      </div>

      {/* Upload Icon */}
      <FaUpload
        className="mx-auto cursor-pointer my-4"
        onClick={handleDialogue}
        size={55}
        color="blue"
      />

      <div
        onClick={() => setUpdateDialogue(!updateDialogue)}
        className={
          updateDialogue
            ? "h-screen inset-0 fixed opacity-70 bg-black"
            : "hidden"
        }
      />

      {/* ======== Update Lesson plan========= */}
      {updateDialogue ? (
        <div className="absolute top-4 rounded-lg shadow-md right-0 left-0 w-fit mx-auto flex flex-col bg-white">
          <h2 className="text-center font-semibold py-4">Update Lesson Plan</h2>
          <form
            className="flex flex-col rounded-lg gap-6 px-3 py-6 items-center"
            onSubmit={handleUpdateLessonPlan}
          >
            <label>
              Title:
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="p-2 border w-[20rem] lg:w-[25rem] rounded-lg"
              />
            </label>
            <label>
              File:
              <input
                type="file"
                onChange={(e) => setUpdatedFile(e.target.files[0])}
                className="p-2 lg:w-[25rem] rounded-lg border"
              />
            </label>
            <button
              className="bg-blue-700 hover:scale-105 transition rounded-lg p-2 text-white"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      ) : (
        <h2 className="hidden">Man</h2>
      )}
    {isSuccess && (
     <Success message={message}/> 
    )}
    

      {/* Success Message */}
      <div
        onClick={handleUploadSuccess}
        className={
          uploadSuccess
            ? "h-screen inset-0 fixed opacity-80 bg-black"
            : "hidden"
        }
      />

      {uploadSuccess && (
        <div className="flex lg:w-80 left-0 right-0 fixed top-[40%] bg-white gap-6 flex-col items-center p-5 rounded-lg shadow-lg w-fit mx-auto">
          <FaCheckCircle size={60} color="green" />
          <h4>Lesson Plan Uploaded successfully</h4>
          <h4 className="text-red-400">{message}</h4>
          <button
            onClick={handleUploadSuccess}
            className="p-2 border rounded-lg bg-green-700 text-white"
          >
            Ok!
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-around">
<div className="flex">
  <div>
    {Array.isArray(lessonPlans) &&
      lessonPlans.map((plan) => (
        <div key={plan._id}>
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-between w-screen px-3">
            <span className="flex items-center justify-between w-screen px-8">
                <h2 className="font-semibold text-lg">Title: {plan.title}</h2>
                <h2 className="font-semibold">Comment: {plan.comments && plan.comments.length > 0 ? plan.comments[0].text : "No comments  available"}</h2>

                <button onClick={() => setIsPdfVisible(!isPdfVisible)} className="border py-3 px-9  bg-blue-800 text-white rounded">{isPdfVisible? "Close" : "View"}</button>
            </span>
               
          </div>

          {isPdfVisible && (
             <MyPdfViewer fileUrl={plan.file}/>
          )}
         
        </div>
        </div>
      ))}
      
  </div>
</div>


      </div>
      {isLoading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "black",
            opacity: "0.92",
            position: "absolute",
            top: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="white"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
       <h2 className="hidden">Man</h2>
      )}
    </div>
  );
};

export default UserDashboard;
