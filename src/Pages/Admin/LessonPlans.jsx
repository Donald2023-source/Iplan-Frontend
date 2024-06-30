import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../Context/Context";
import color from '../../assets/Color.jpg';
import cap from '../../assets/Cap (2).jpg';
import user from '../../assets/personal.jpg';
import { FaHome, FaBook, FaPlus, FaComment, FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import PdfViewer from "./Viewer/lessonPlanViewer";
import Success from "../../Components/success";
import { ThreeDots } from "react-loader-spinner";
import Error from "../../Components/ErrorComponent";
import ErrorComponent from "../../Components/ErrorComponent";

const LessonPlans = () => {
  const getSubjectIdFromLocalStorage = () => {
    try {
      return localStorage.getItem('selectedSubjectId') || '';
    } catch (error) {
      console.error('error parsing selectedSubject Id from localstorage', error);
      return '';
    }
  }

  const { selectedSession, selectedSessionId, selectedTermId, selectedClassId, classId, selectedTerm, setSelectedSession, setSelectedTerm, setSelectedTermId, classes, sessions,terms, setSelectedSessionId, fetchSessions, handleSessionChange, handleTermChange, fetchTerms, fetchSubjects, fetchClasses, handleClassSelect, classItems, myId, setIsSuccess, isSuccess, isLoading, setIsLoading, isFailed, setIsFailed, Error,
    setError
  } = useContext(GeneralContext);

  const [newTerm, setNewTerm] = useState({ name: '', startDate: '', endDate: '' });
  const [selectedSubjectId, setSelectedSubjectId] = useState(getSubjectIdFromLocalStorage);
  const [lessonPlans, setLessonPlans] = useState([]);
  const [newSession, setNewSession] = useState({
    name: '',
    year: '',
    startDate: '',
    endDate: ''
  });
  

  const [isVisible, setIsVisible] = useState(false);
  const[isConfirm, setIsConfirm] = useState(false);
  const[createSessionDialogue, setCreateSessionDialogue] = useState(false);
  const[isTermList, setIsTermList] = useState(false);
  const [createTermDialogue, setCreateTermDialogue] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [commentSuccessFul, setCommentSuccessFul] = useState(false);
  const [isSideVisible, setIsSideVisible]=useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentFileUrl, setCurrentFileUrl] = useState(null);
  const [selectedLessonPlanIds, setSelectedLessonPlanIds] = useState([]);
  const [comments, setComments] = useState({});
  const [message, setMessage] = useState('');


  const toggleConfirmation = () => {
    setIsConfirm(!isConfirm)
  };
  const toggleTermList = () => {
    setIsTermList(!isTermList)
  };
  const toggleCreateTermDialogue = () => {
    setCreateTermDialogue(!createTermDialogue)
  }
  const toggleDialogue = () => {
    setCreateSessionDialogue(!createSessionDialogue)
  }
  const handleVisibility = () => {
    setIsVisible(!isVisible)
  };
  const toggleTermDelete  = () => {
    setIsDelete(!isDelete)
  };

  const handleCommentToggle = () => {
    setToggleComment(!toggleComment)
  }
  const handlePdfViewer = (fileUrl) => {
    setCurrentFileUrl(fileUrl);
    setIsViewerVisible(!isViewerVisible);
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
    if (myId) {
      fetchSubjects();
    }
  }, [myId]);

  useEffect(() => {
    if (selectedClassId) {
      fetchSubjects();
    }
  }, [selectedClassId]);

  useEffect(() => {
    localStorage.setItem('selectedSessionId', selectedSessionId);
  }, [selectedSessionId]);

  useEffect(() => {
    localStorage.setItem('classId', classId);
  }, [classId]);

  useEffect(() => {
    localStorage.setItem('selectedSession', JSON.stringify(selectedSession));
  }, [selectedSession]);

  useEffect(() => {
    localStorage.setItem('myId', myId);
  }, [myId]);

  useEffect(() => {
    localStorage.setItem('selectedSubjectId', selectedSubjectId);
  }, [selectedSubjectId]);

  useEffect(() => {
    localStorage.setItem('selectedTerm', JSON.stringify(selectedTerm));
  }, [selectedTerm]);

  useEffect(() => {
    localStorage.setItem('selectedTermId', selectedTermId);
  }, [selectedTermId]);

  const handleSubjectChange = (e) => {
    setSelectedSubjectId(e.target.value);
  };

  const createSession = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:3000/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSession),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }
      const responseData = await response.json();
     
      console.log('Session created successfully:', responseData);
      setIsSuccess(true);
      setIsLoading(false)
      setMessage(responseData.message);
      fetchSessions();
    } catch (error) {
      console.error('Error creating new session:', error.message);
      setIsLoading(false)
      setError(error.message)
      setIsFailed(true)
    }
  };

  const deleteSession = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log('Session deleted', data);
      fetchSessions();
      setSelectedSessionId('');
      setSelectedSession('');
      setIsLoading(false);
      toggleConfirmation();
      setSelectedTermId('');
      setSelectedTerm('');
      
    } catch (error) {
      console.error('Error deleting session', error.message);
      setError(error.message)
    }
  };
 
  const deleteSelectedLessonPlans = async () => {
    setIsLoading(true)
    try {
      const deletePromises = selectedLessonPlanIds.map(lessonPlanId => {
        return fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms/${selectedTermId}/classes/${classId}/subjects/${selectedSubjectId}/lessonPlans/${lessonPlanId}`, {
          method: 'DELETE',
        });
      });

      await Promise.all(deletePromises);
      
      console.log('Selected lesson plans deleted');
      setIsLoading(false);
      fetchLessonPlans(); 
      setSelectedLessonPlanIds([]); 
    } catch (error) {
      console.error('Error deleting lesson plans', error.message);
    }
  };
  
  const createNewTerm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTerm)
      });
      if (!response.ok) {
        throw new Error('Failed to create Term');
      };
      const responseData = await response.json();
      setIsLoading(false);
      console.log('Term Created Successfully', responseData);
      fetchTerms(selectedSessionId);

    } catch (error) {
      console.error('Error creating term', error.message);
      setIsLoading(false);
      setError(error.message);
      setIsFailed(true)
    }
  };

  const deleteTerm = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms/${selectedTermId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setIsLoading(false)
      console.log('Term deleted', data);
      fetchTerms(selectedSessionId);
      setSelectedTermId('');
      setSelectedTerm('');
      toggleTermDelete();
      createSessionDialogue();
    } catch (error) {
      console.error('Error deleting term', error.message);
      setIsFailed(true)
    }
  };

  const fetchLessonPlans = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/lessonPlans`);
      if (response.ok) {
        console.log('Lesson plans fetched successfully');
      }
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        setLessonPlans(data);
      } else {
        setLessonPlans([]);
      }
    } catch (error) {
      console.error('Error fetching lesson Plans ', error.message);
    }
  };

  useEffect(() => {
    if (selectedSessionId && selectedTermId && selectedClassId && myId) {
      fetchLessonPlans();
    }
  }, [selectedSessionId, selectedTermId, selectedClassId]);

  console.log(`SessionId ${selectedSessionId}`);
  console.log(`TermId: ${selectedTermId}`);
  console.log(`selected Class Id: ${selectedClassId}`);
  console.log(`My Id ${myId}`);
  console.log(`SubjectId: ${selectedSubjectId}`);
  console.log(`SelectedSession: ${selectedSession}`)

  const handleLessonPlanCheckboxChange = (e, lessonPlanId) => {
    if (e.target.checked) {
      setSelectedLessonPlanIds(prevIds => [...prevIds, lessonPlanId]);
      console.log(`LessonPlan Id ${lessonPlanId}`);
    } else {
      setSelectedLessonPlanIds(prevIds => prevIds.filter(id => id !== lessonPlanId));
    }
  };

  const handleCommentChange = (e, lessonPlanId) => {
    setComments({
      ...comments,
      [lessonPlanId]: e.target.value
    });
  };

  const submitComment = async (lessonPlanId) => {
    const comment = comments[lessonPlanId];
    if (!comment) return;

    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/lessonPlans/${lessonPlanId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: comment }),
      });
      
      setCommentSuccessFul(true)
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const responseData = await response.json();
      console.log('Comment submitted successfully:', responseData);
      setCommentSuccessFul(false)
      setCommentSuccessFul(responseData.message)
      fetchLessonPlans();
      alert(commentSuccessFul)
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    }
  };

  return (
    <>
    <div className="flex">
        <div className="bg-[#F2F5E5] relative w-screen h-screen">
              <div className="relative">
          <div className="flex justify-between items-center py-3 bg-white rounded-xl px-8 my-3 mx-2">
         <h2 className="font-bold mx-auto">04:10:00</h2>     
     </div>


          <section className="mx-auto my-4 border lg:w-[80%] w-screen bg-[#252b63] py-12 lg:py-20  rounded-lg text-white">
            <h2 className="text-center text-3xl">Welcome <span className="font-medium">Afodia!</span></h2>
            <h2 className="text-center py-4">Lets view the lesson plans available</h2>
          </section>
          
          <div className="flex items-center lg:flex-row  flex-col gap-2">

          <div className="border mx-auto p-2 w-screen lg:w-fit lg:px-5 text-sm flex flex-col items-center bg-white rounded-lg">
            
            <h2 className="font-medium text-center text-lg">Sessions</h2>
            <div className="flex w-fit items-center gap-7 py-2">
            <select className="rounded-xl p-2 focus:outline-none cursor-pointer w-44 border" value={selectedSessionId} onChange={handleSessionChange}>
              <option value="">Select session</option>
              {sessions.map((session) => (
                <option key={session._id} value={session._id}>{session.name}</option>
              ))}
            </select>

            <button onClick={handleVisibility} className="border p-2 rounded-xl w-10 bg-[#4339F2] text-white cursor-pointer hover:scale-110 hover:transition duration-600">All</button>

            <FaPlus onClick={toggleDialogue} className="cursor-pointer hover:scale-125 hover:transition duration-600" color="#4339F2" size={20}/>
            <FaTrash onClick={toggleConfirmation} className="cursor-pointer hover:scale-110 hover:transition duration-600" color="#252b63" size={20}/>
            </div>
            <div className={isVisible ? 'block' : 'hidden'}>
              {sessions.map((session) => (
                <h2 className="text-center flex py-2 justify-center items-center gap-2" key={session._id}>
                  {session.name} {session._id === selectedSessionId ? <div className="bg-green-800 h-4 rounded-xl w-4"/> : ""}
                </h2>
              ))}
            </div>
          </div>
          
         
           <form className={createSessionDialogue ? "flex flex-col justify-center mx-auto z-50 m-auto p-10 bg-white h-fit shadow-lg rounded-xl lg:top-[-10rem] inset-0 fixed lg:w-[30rem] gap-12" : 'hidden'} onSubmit={createSession}>
              <span className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-center text-[#002E]">Create Session</h2>
              <FaTimes onClick={toggleDialogue} className="cursor-pointer" color="black" size={25}/>
            </span>
            <input
              type="text"
              name="name"
              value={newSession.name}
              onChange={(e) => setNewSession({ ...newSession, name: e.target.value })}
              placeholder="Session name"
              required
              className="p-2 rounded-md border"
            />

            <input
              type="number"
              name="year"
              value={newSession.year}
              onChange={(e) => setNewSession({ ...newSession, year: e.target.value })}
              placeholder="Year"
              required
              className="p-2 rounded-md border"
            />

            <input
              type="date"
              name="startDate"
              value={newSession.startDate}
              onChange={(e) => setNewSession({ ...newSession, startDate: e.target.value })}
              placeholder="Start Date"
              required
              className="p-2 rounded-md border"
            />

            <input
              type="date"
              name="endDate"
              value={newSession.endDate}
              onChange={(e) => setNewSession({ ...newSession, endDate: e.target.value })}
              placeholder="End Date"
              required
              className="p-2 rounded-md border"
            />
            <button onClick={toggleDialogue} className="bg-[#6675FF] text-white p-2 rounded-lg hover:scale-105 transition" type="submit">Create Session</button>

          </form>

          <div onClick={toggleDialogue} className={createSessionDialogue ? "bg-black h-screen fixed inset-0 opacity-70" : 'hidden'}/>  

          {/* =====Messages====== */}
            {isSuccess && (
              <Success message={message}/>
            )}
          
          {isFailed && (
            <ErrorComponent Error={Error}/>
          )}
          {/* ===== Term! ======= */}
         <div className="bg-white w-fit mx-auto rounded-lg border py-2">
          <h2 className="font-medium text-center text-lg">Terms</h2>
        <div className=" p-2 w-screen justify-center lg:w-fit mx-auto lg:px-5 text-sm flex gap-7 items-center ">
          <select className="rounded-xl p-2 focus:outline-none cursor-pointer w-44 border" value={selectedTermId} onChange={handleTermChange}>
            <option value="">Terms</option>
            {terms.map((term) => (
              <option key={term._id} value={term._id}>{term.name}</option>
            ))}
          </select>

          <button onClick={toggleTermList} className="border p-2 rounded-xl w-10 bg-[#4339F2] text-white cursor-pointer hover:scale-110 hover:transition duration-600">All</button>

          <FaPlus onClick={toggleCreateTermDialogue} className="cursor-pointer  hover:scale-125 hover:transition duration-600" color="#4339F2" size={20}/>
          <FaTrash onClick={toggleTermDelete} className="cursor-pointer hover:scale-110 hover:transition duration-600" color="#252b63" size={20}/>
          </div>
          {terms.map((term) =>(
            <h2 className={isTermList ? "text-center py-2 relative top-0" : 'hidden'} key={term._id}>{term.name}</h2>
          ))}
          </div>

            {/* =======Create Term ======== */}
          <div>
            <form className={createTermDialogue ? "flex flex-col justify-center z-50 m-auto p-10 bg-white h-fit shadow-lg w-fit px-16 rounded-xl lg:top-[-10rem] inset-0 fixed lg:w-[30rem] gap-12" : 'hidden'}  onSubmit={createNewTerm}>
              <span className="flex justify-around items-center">
              <h2 className="text-2xl font-bold text-center text-[#002E]">Create Term</h2>
              <FaTimes onClick={toggleCreateTermDialogue} className="
              cursor-pointer " size={15} color="black"/>
              </span>
              <fieldset>
                <input
                  type="text"
                  value={newTerm.name}
                  onChange={(e) => setNewTerm({ ...newTerm, name: e.target.value })}
                  placeholder="Please Enter the term name"
                  required
                  className="p-2 rounded-md border w-[20rem] lg:w-[25rem]"
                />
              </fieldset>

              <fieldset>
                <input
                  type="date"
                  value={newTerm.startDate}
                  onChange={(e) => setNewTerm({ ...newTerm, startDate: e.target.value })}
                  placeholder="Please Enter the start date"
                  required
                  className="p-2 rounded-md border w-[20rem] lg:w-[25rem]"
                />
              </fieldset>

              <fieldset>
                <input
                  type="date"
                  value={newTerm.endDate}
                  onChange={(e) => setNewTerm({ ...newTerm, endDate: e.target.value })}
                  placeholder="Please Enter the end date"
                  required
                  className="p-2 rounded-md border w-[20rem] lg:w-[25rem]"
                />
              </fieldset>
              <button onClick={toggleCreateTermDialogue} className="bg-[#6675FF] text-white p-2 rounded-lg" type="submit">Create New Term</button>
            </form>
          </div>

          <div onClick={toggleCreateTermDialogue} className={createTermDialogue ? "bg-black h-screen fixed inset-0 opacity-70" : 'hidden'}/>


            {/*======= Class Select======= */}
          <div className="bg-white flex items-center p-4 lg:w-[24rem] rounded-lg mx-auto">
          <h2 className="font-medium py-2 text-center">Please Select A Class</h2>
          <select className="rounded-xl p-2 focus:outline-none cursor-pointer w-60 border"  onChange={handleClassSelect} value={selectedClassId}>
            <option value="">Select Class</option>
            {classItems}
          </select>
          </div>
          </div>

            {/* ========Lesson plans======= */}
          <h1 className="font-medium text-lg text-center py-3">View Lesson Plans</h1>
          {lessonPlans.map(plan => (
            <div className="flex flex-col bg-white items-start" key={plan._id}>
              <span className="lg:hidden flex justify-center">
              <h2 className="text-center w-screen py-2 font-medium">Subject: {plan.subjectName}</h2>
              <button>View</button>
              </span>


              {/* ========Comment====== */}
              <div className="flex items-center justify-between mx-auto w-[95%]">
                <input
                  type="checkbox"
                  checked={selectedLessonPlanIds.includes(plan._id)}
                  onChange={e => handleLessonPlanCheckboxChange(e, plan._id)}
                />
                <h2 className="lg:text-md hidden">{plan.title}</h2>
                <h2 className="lg:block hidden">{plan.subjectName}</h2>          
             
             <fieldset  className="shadow-lg hidden lg:flex items-center lg:text-md text-sm md:text-md justify-around rounded-lg bg-white  w-64">
              
                <input
                type="text"
                  placeholder="Add a comment"
                  value={comments[plan._id] || ''}
                  onChange={(e) => handleCommentChange(e, plan._id)}
                  className=" text-wrap rounded-lg focus:outline-none p-2"
                  required
                />
                <FaTelegram className="cursor-pointer"  onClick={() => submitComment(plan._id)}  color="#6675FF" size={20}/>
                </fieldset>

              <FaComment onClick={handleCommentToggle} className="lg:hidden cursor-pointer" color="#6675FF" size={20}/>
               
               
          {/* {isViewerVisible && (
            <div>
              <FaTimes className="cursor-pointer" size={30} color="black" onClick={() => setIsViewerVisible(false)} /> */}
              
            {/* </div>
          )} */}
  
            {/* {plan.comments && plan.comments.map((comment, index) => (
                <div key={index} className="border p-2 mt-2 rounded-lg">
                  {comment.text}
                </div>
               
              ))} */}
             <button onClick={() => handlePdfViewer(plan.fileUrl)} className="py-1 px-5 text-white bg-[#6675FF] rounded-lg hover:bg-[#4553d0] transition border">
                  View
                </button>

                {isVisible && (
                  <PdfViewer fileUrl={plan.fileUrl}/>
                )}
             
               <FaTrash onClick={deleteSelectedLessonPlans} className="cursor-pointer" color="#6675FF" size={20}/>
            </div>

            <div onClick={handleCommentToggle} className={toggleComment ? "h-screen inset-0 fixed opacity-60 bg-black" : 'hidden'}/>

            <div className={toggleComment ? "fixed top-[40%] rounded-lg h-fit inset-0 py-5 w-fit px-7 left-8 flex flex-col items-center lg:hidden bg-white" : 'hidden'}>
              <fieldset  className="flex border  items-center lg:text-md text-sm md:text-md justify-around rounded-lg bg-white w-72">
                <input
                type="text"
                  placeholder="Add a comment"
                  value={comments[plan._id] || ''}
                  onChange={(e) => handleCommentChange(e, plan._id)}
                  className=" text-wrap rounded-lg focus:outline-none p-4"
                />
                <FaTelegram className="cursor-pointer"  onClick={() => submitComment(plan._id)}  color="#6675FF" size={20}/>

                </fieldset>
                <FaTelegram className="cursor-pointer mt-5"  onClick={() => submitComment(plan._id)}  color="#6675FF" size={50}/>
                </div>
                <PdfViewer fileUrl = {plan.fileUrl}/>
            </div>
            
          ))}
        </div>


       {/* Delete Session Dialogue*/}
        </div>
        <div onClick={toggleConfirmation} className={isConfirm ? "h-screen inset-0 fixed opacity-60 bg-black" : 'hidden'}/>
      </div>

      <div className={isConfirm ? "border z-50 inset-0 fixed h-fit mx-auto top-[18rem] bg-white shadow-xl w-fit p-4 rounded-xl" : 'hidden'}>
              <h2>Are You sure you want to delete this Session?</h2>
              <span className="flex justify-end gap-10 mt-10">
                <button onClick={toggleConfirmation} className="border px-5 py-1 rounded-lg hover:bg-black hover:text-white transition duration-500">No</button>
                <button onClick={deleteSession} className="border px-5 py-1 rounded-lg hover:bg-black hover:text-white transition duration-500">Yes</button>
              </span>
              </div> 

                  {/* Delete Term Dialogue */}
              <div onClick={toggleTermDelete} className={isDelete ? "h-screen inset-0 fixed opacity-60 bg-black" : 'hidden'}/>
              
              <div className={isDelete ? "border z-50 inset-0 fixed h-fit mx-auto top-[18rem] bg-white shadow-xl w-fit p-4 rounded-xl" : 'hidden'}>
              <h2>Are You sure you want to delete this Term?</h2>
              <span className="flex justify-end gap-10 mt-10">
                <button onClick={toggleTermDelete} className="border px-5 py-1 rounded-lg hover:bg-black hover:text-white transition duration-500">No</button>
                <button onClick={deleteTerm} className="border px-5 py-1 rounded-lg hover:bg-black hover:text-white transition duration-500">Yes</button>
              </span>
              </div> 

              <div>
              {isLoading ? (
                 <div style={{"height": '100vh', 'width': '100vw', 'backgroundColor': 'black', 'opacity': '0.92', position : 'absolute', top: '0', display: "flex", justifyContent: 'center', alignItems:'center'}}>
            <ThreeDots visible={true} height="80" width="80" color="white" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}}wrapperClass=""/>
            </div>     
            ) : (console.log('Not Loading'))}
              </div>
    </>
  );
}

export default LessonPlans;
