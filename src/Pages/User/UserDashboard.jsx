import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../Context/Context";
import color from '../../assets/Color.jpg';
import cap from '../../assets/Cap (2).jpg';





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
    setClasses,
    setSessions,
    setTerms,
    setSelectedClassId,
    setSubjects,
    setClassId,
    setSelectedSessionId,
    fetchSessions,
    handleSessionChange,
    handleTermChange,
    fetchTerms,
    fetchSubjects,
    fetchClasses,
    handleClassSelect,
    classItems
  } = useContext(GeneralContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(getSubjectIdFromLocalStorage);
  const [title, setTitle] = useState('');
  const [lessonPlans, setLessonPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedLessonPlanId, setSelectedLessonPlanId] = useState(getLessonPlanIdFromLocalStorage);
  const [comments, setComments] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    fetchSessions();
    fetchClasses();
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

  useEffect(() => {
    localStorage.setItem('selectedSubjectId', selectedSubjectId);
  }, [selectedSubjectId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
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
        setErrorMessage('');
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

  const FetchUserLessonPlans = async() =>{

  }

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
      <div className='bg-repeat w-screen flex'>
        <img className='w-[28rem] h-[18rem]' src={color} alt="" />
        <img className='w-[28rem] h-[18rem]' src={color} alt="" />
        <img className='w-[28rem] h-[18rem]' src={color} alt="" />
        <img className='w-[28rem] h-[18rem]' src={color} alt="" />
      </div>
      <div className='bg-black w-screen h-[18rem] absolute top-0 opacity-60'/>
      <div className='absolute flex items-center gap-4 top-20 left-[25%] lg:left-[40%]'>
        <span className='flex items-center gap-10'>
          <img className='h-16 rounded-[40%]' src={cap} alt="" />
          <h2 className='text-white font-medium text-3xl'>Iplan</h2>
        </span>
      </div>

      <select value={selectedSessionId || ''} onChange={handleSessionChange}>
        <option value="">Select session</option>
        {sessions.map((session) => (
          <option key={session._id} value={session._id}>{session.name}</option>
        ))}
      </select>

      <select value={selectedTermId || ''} onChange={handleTermChange}>
        <option value="">Select term</option>
        {terms.map((term) => (
          <option key={term._id} value={term._id}>{term.name}</option>
        ))}
      </select>

      <select onChange={handleClassSelect} value={selectedClassId || ''}>
        <option value="">Select class</option>
        {classItems}
      </select>

      <select value={selectedSubjectId || ''} onChange={handleSubjectChange}>
        <option value="">Select subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject.id}>{subject.name}</option>
        ))}
      </select>

      <div>
        <form onSubmit={handleFileUpload}>
          <div>
            <label>Title:</label>
            <input name="title" value={title} onChange={handleTitleChange} placeholder="Please enter your lesson plan title" type="text" />
          </div>

          <div>
            <label>Lesson Plan File:</label>
            <input name="lessonPlan" onChange={handleFileChange} type="file" />
          </div>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <button className='bg-blue-700 rounded-lg p-2 text-white' type="submit">Upload Lesson Plan</button>
        </form>
      </div>

      <div>
        <h2>My Lesson Plans</h2>
        <div>
          {Array.isArray(lessonPlans) &&
            lessonPlans.map((plan) => (
              <div key={plan._id} onClick={() => handleLessonPlanSelect(plan._id)}>
                <h2>{plan.title}</h2>
                {/* Ensure that 'plan.file' contains the correct URL */}
                {/* <PdfViewer fileUrl={plan.fileUrl} /> */}
              </div>
            ))}
        </div>
      </div>

      <div>
        <h2>Comments</h2>
        <div>
          {Array.isArray(comments) &&
            comments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.text}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
