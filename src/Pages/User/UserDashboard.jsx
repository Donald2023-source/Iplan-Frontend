import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../Context/Context";
import color from '../../assets/Color.jpg';
import cap from '../../assets/Cap (2).jpg';
import { FaCheckCircle, FaTimes, FaUpload, FaUserCheck } from "react-icons/fa";

const UserDashboard = () => {
  const getSubjectIdFromLocalStorage = () => {
    try {
      return localStorage.getItem('selectedSubjectId') || '';
    } catch (error) {
      console.error('Error parsing selectedSubjectId from localStorage', error);
      return '';
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubjectId = e.target.value;
    localStorage.setItem('selectedSubjectId', selectedSubjectId);
    setSelectedSubjectId(selectedSubjectId);
  };

  const getLessonPlanIdFromLocalStorage = () => {
    try {
      return localStorage.getItem('selectedLessonPlanId') || '';
    } catch (error) {
      console.error('Error parsing selectedLessonPlanId from localStorage', error);
      return '';
    }
  };
  const {
    selectedSession, selectedSessionId, selectedTermId,selectedClassId, classId, selectedTerm, setSelectedSession,setSelectedTerm, setSelectedTermId, classes,sessions, terms, subjects, setClasses, setSessions, setTerms, setSelectedClassId, setSubjects, setClassId, setSelectedSessionId, fetchSessions, handleSessionChange,
    handleTermChange, fetchTerms, fetchSubjects, fetchClasses, handleClassSelect,classItems, isLoading, setIsLoading
  } = useContext(GeneralContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(getSubjectIdFromLocalStorage);
  const [title, setTitle] = useState('');
  const [lessonPlans, setLessonPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedLessonPlanId, setSelectedLessonPlanId] = useState(getLessonPlanIdFromLocalStorage);
  const [comments, setComments] = useState([]);
  const [isUploadDialogue, setIsUploadDialogue] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('')
  

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUploadSuccess =() => {
    setUploadSuccess(!uploadSuccess)
    
  }
  useEffect(() => {
    fetchSessions();
    fetchClasses();
  }, []);


  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
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
    localStorage.setItem('selectedSessionId', selectedSessionId);
  }, [selectedSessionId]);

  useEffect(() => {
    localStorage.setItem('classId', classId);
  }, [classId]);

  useEffect(() => {
    const storedSubjectId = localStorage.getItem('selectedSubjectId');
    if (storedSubjectId) {
      setSelectedSubjectId(storedSubjectId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedSession', JSON.stringify(selectedSession));
  }, [selectedSession]);

  useEffect(() => {
    localStorage.setItem('selectedTerm', JSON.stringify(selectedTerm));
  }, [selectedTerm]);

  useEffect(() => {
    localStorage.setItem('selectedTermId', selectedTermId);
  }, [selectedTermId]);

  useEffect(() => {
    const storedLessonPlanId = localStorage.getItem('selectedLessonPlanId');
    if (storedLessonPlanId) {
      setSelectedLessonPlanId(storedLessonPlanId);
    }
  }, []);

  const handleDialogue = () => {
    setIsUploadDialogue(!isUploadDialogue)
  }

  useEffect(() => {
    localStorage.setItem('selectedSubjectId', selectedSubjectId);
  }, [selectedSubjectId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (!title) {
      setErrorMessage('Title is required');
      return;
    }
    if (!selectedFile) {
      setErrorMessage('File is required');
      return;
    }

    const formData = new FormData();
    formData.append('lessonPlan', selectedFile);
    formData.append('title', title);

    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/subjects/${selectedSubjectId}/lessonPlans`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        console.log('File uploaded successfully', data);
        setTitle('');
        setSelectedFile(null);
        setIsLoading(false)
        setErrorMessage('');
        setUploadSuccess(true)
        setMessage('')
        // Fetch updated lesson plans after uploading a new lesson plan
        fetchUserLessonPlans();
      } else {
        setErrorMessage(data.error || 'Failed to upload file');
      }
    } catch (error) {
      setErrorMessage('Error uploading file: ' + error.message);
    }
  };

  const fetchUserLessonPlans = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/subjects/${selectedSubjectId}/lessonPlans`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setLessonPlans(data);
      } else {
        setLessonPlans([]);
      }
    } catch (error) {
      console.error('Error occurred', error.message);
    }
  };


  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/subjects/${selectedSubjectId}/lessonPlans/${selectedLessonPlanId}/comments`);
      const data = await response.json();
      console.log('Comments fetched Successfully', data);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments', error.message);
    }
  };

  const handleLessonPlanSelect = (lessonPlanId) => {
    localStorage.setItem('selectedLessonPlanId', lessonPlanId);
    setSelectedLessonPlanId(lessonPlanId);
    fetchComments();
  };

  useEffect(() => {
    if (selectedSessionId && selectedTermId && selectedClassId && selectedSubjectId) {
      fetchUserLessonPlans();
    }
  }, [selectedSessionId, selectedTermId, selectedClassId, selectedSubjectId]);

  console.log(selectedSubjectId);
  console.log(selectedLessonPlanId);

  return (
    <div>
  <div>
       <div>
            <div>
                </div>
                      <div className='mt-3'>
                           <div className="flex justify-between items-center shadow-lg py-3 bg-white rounded-xl px-8 my-3 mx-2">
                              <h2 className="font-bold mx-auto">04:10:00</h2>
                       </div>
                     </div>
                </div>
              <div className="mx-auto my-4 border lg:w-[80%] w-screen bg-[#252b63] py-12 lg:py-20  rounded-lg text-white">
          <h2 className="text-center text-3xl">Welcome <span className="font-medium">{firstName}!</span></h2>
        <h2 className="text-center py-4">Welcome to Iplan</h2>
    </div>
 </div>

    <div className="grid lg:grid-cols-4 gap-4 py-5 grid-cols-2 md:grid-cols-3 w-screen">
      {/* Sessions */}
      <div className="bg-white px-3 lg:px-5 w-fit mx-auto md:44 rounded-lg border py-2">
      <h2 className="font-medium text-center text-lg">Sessions</h2>
      <select className="rounded-xl p-2 focus:outline-none cursor-pointer w-[9rem] text-sm lg:w-64 border" value={selectedSessionId || ''} onChange={handleSessionChange}>
        <option value="">Select session</option>
        {sessions.map((session) => (
          <option key={session._id} value={session._id}>{session.name}</option>
        ))}
      </select>
      </div>

      {/* ====Terms====== */}
      <div className="bg-white px-3 lg:px-5 w-fit mx-auto rounded-lg border py-2">
      <h2 className="font-medium text-center text-lg">Terms</h2>
      <select  className="rounded-xl p-2 focus:outline-none cursor-pointer w-[9rem] lg:w-64 border" value={selectedTermId || ''} onChange={handleTermChange}>
        <option value="">Select term</option>
        {terms.map((term) => (
          <option key={term._id} value={term._id}>{term.name}</option>
        ))}
      </select>
      </div>

    {/* ====Class===== */}
    <div className="bg-white px-3 lg:px-5 w-fit mx-auto rounded-lg border py-2">
    <h2 className="font-medium text-center text-lg">Class</h2>
      <select required className="rounded-xl p-2 focus:outline-none cursor-pointer w-[9rem] lg:w-64 border" onChange={handleClassSelect} value={selectedClassId || ''}>
        <option value="">Select class</option>
        {classItems}
      </select>
      </div>

    {/* Subject */}
  <div className="bg-white px-3 lg:px-5 w-fit mx-auto rounded-lg border py-2">
  <h2 className="font-medium text-center text-lg">Subject</h2>
      <select className="rounded-xl p-2 focus:outline-none cursor-pointer w-[9rem] lg:w-64 border" value={selectedSubjectId || ''} onChange={handleSubjectChange}>
        <option value="">Select subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject.id}>{subject.name}</option>
        ))}
      </select>
  </div>

      {/* =====File Upload Dialogue ==== */}
    <div onClick={handleDialogue} className={isUploadDialogue ? "h-screen inset-0 fixed opacity-70 bg-black" : 'hidden'}/>

      <div className={isUploadDialogue ? "border shadow-lg bg-white fixed inset-0 rounded-lg w-fit mx-auto h-fit top-10" : 'hidden'}>
        
        <form className="flex flex-col rounded-lg gap-6 px-3 py-6 items-center" onSubmit={handleFileUpload}>
          <span className="flex justify-between w-[20rem]">
          <h2 className="font-medium">Upload Lesson Plan</h2>
          <FaTimes onClick={handleDialogue} className="cursor-pointer" size={25} color="black"/>
          </span>
          <div className="flex gap-3 items-center">
            <label className="text-sm">Title:</label>
            <input name="title" 
            value={title} 
            onChange={handleTitleChange} 
            placeholder="Please enter your lesson plan title" type="text"
            className="p-2 border w-[20rem] lg:w-[25rem] rounded-lg"
            />
          </div>

          <div className="flex gap-4 items-center">
            <label>File</label>
            <input className="p-2 lg:w-[25rem] rounded-lg border" name="lessonPlan" onChange={handleFileChange} type="file" />
          </div>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <button className='bg-blue-700 hover:scale-105 transition rounded-lg p-2 text-white' type="submit">Upload</button>
        </form>
      </div>
      </div>

{/* Upload Icon */}
      <FaUpload className="mx-auto cursor-pointer my-4" onClick={handleDialogue} size={55} color="blue"/>


    {/* Success Message */}
      <div onClick={handleUploadSuccess} className={uploadSuccess ? "h-screen inset-0 fixed opacity-80 bg-black" : 'hidden'}/>

      {uploadSuccess && (
        <div className="flex lg:w-80 left-0 right-0 fixed top-[40%] bg-white gap-6 flex-col items-center p-5 rounded-lg shadow-lg w-fit mx-auto">
          <FaCheckCircle size={60} color="green"/>
          <h4>Lesson Plan Uploaded successfully</h4>
          <h4 className="text-red-400">{message}</h4>
          <button onClick={handleUploadSuccess} className="p-2 border rounded-lg bg-green-700 text-white">Ok!</button>
        </div>
      )}


<div className="flex items-center justify-around">
      <div>
        <h2>My Lesson Plans</h2>
        <div>
          {Array.isArray(lessonPlans) &&
            lessonPlans.map((plan) => (
              <div key={plan._id} onClick={() => handleLessonPlanSelect(plan._id)}>
                <h2>{plan.title}</h2>
              </div>
            ))}
        </div>
      </div>

      <div>
        <div>
          {Array.isArray(comments) &&
            comments.map((comment) => (
              <div key={comment._id}>
                <fieldset className="shadow-lg hidden lg:flex items-center lg:text-md text-sm md:text-md justify-around rounded-lg bg-white  w-64">
       <input 
       type="text" 
       value={comment.text} 
       readOnly
       className=" text-wrap rounded-lg focus:outline-none p-2"
        />      
        <FaCheckCircle color="gray" size={10}/>   
       </fieldset>
              </div>
            ))}
        </div>
        </div>
        <button className="py-1 px-5 text-white bg-[#6675FF] rounded-lg hover:bg-[#4553d0] transition border">View </button>
    </div>
    {isLoading ? (
                 <div style={{"height": '100vh', 'width': '100vw', 'backgroundColor': 'black', 'opacity': '0.92', position : 'absolute', top: '0', display: "flex", justifyContent: 'center', alignItems:'center'}}>
            <ThreeDots visible={true} height="80" width="80" color="white" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}}wrapperClass=""/>
            </div>     
            ) : (console.log('Not Loading'))}
    </div>
  );
};

export default UserDashboard;
