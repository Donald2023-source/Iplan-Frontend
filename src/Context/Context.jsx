import React, { createContext, useEffect, useState } from 'react';

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {

  const getSessionIdFromLocalStorage = () => {
    try {
      return localStorage.getItem('selectedSessionId') || '';
    } catch (error) {
      console.error('Error parsing selectedSessionId from localStorage', error);
      return '';
    }
  };


  const getSessionFromLocalStorage = () => {
    try {
      return JSON.parse(localStorage.getItem('selectedSession')) || '';
    } catch (error) {
      console.error('Error parsing selectedSession from localStorage', error);
      return '';
    }
  };

  const getTermFromLocalStorage = () => {
    try {
      return JSON.parse(localStorage.getItem('selectedTerm')) || '';
    } catch (error) {
      console.error('Error parsing selectedTerm from localStorage', error);
      return '';
    }
  };

  const getTermIdFromLocalStorage = () => {
    try {
      return localStorage.getItem('selectedTermId') || '';
    } catch (error) {
      console.error('Error parsing selectedTermId from localStorage', error);
      return '';
    }
  };

  const getMyIdFromLocalStorage = () => {
    try {
      return localStorage.getItem('myId') || '';
    } catch (error) {
      console.error('Error parsing myId from localStorage', error);
      return '';
    }
  };
  
    

  const getClassIdFromLocalStorage = () => {
    try {
      return localStorage.getItem('classId') || '';
    } catch (error) {
      console.error('Error parsing classId', error)
    }
  };

  
  const getSubjectIdFromLocalStorage = () => {
    try {
      return localStorage.getItem('subjectId') || '';
    } catch (error) {
      console.error('Error parsing classId', error)
    }
  };



  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(getSessionIdFromLocalStorage);
  const [selectedSession, setSelectedSession] = useState(getSessionFromLocalStorage);
  const [selectedTerm, setSelectedTerm] = useState(getTermFromLocalStorage);
  const [selectedTermId, setSelectedTermId] = useState(getTermIdFromLocalStorage);
  const [classId, setClassId] = useState(getClassIdFromLocalStorage);
  const [selectedSubjectId, setSelectedSubjectId] = useState(getSubjectIdFromLocalStorage)
  const [lessonPlans, setLessonPlans] = useState([])
  const [selectedClassId, setSelectedClassId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [myId, setMyId] = useState(getMyIdFromLocalStorage)
  
  const [terms, setTerms] = useState([]);
  const [classes, setClasses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    staffId: ''
  });

  const [AdminForm, setAdminForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    staffId: '',
    adminKey: ''
  });

  const adminChange = (e) => {
    const { name, value } = e.target;
    setAdminForm({
      ...AdminForm,
      [name]: value
    });
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(AdminForm)
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Admin Created Successfully', data);
        setIsSuccess(true);
      } else {
        console.error('Error creating new Admin:', data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) {
        console.log('User created successfully:', data);
        setIsSuccess(true);
      } else {
        console.error('Error creating user:', data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
    setIsLoading(false);
  };




  const [AdminLoginForm, setAdminLoginForm] = useState({
    email: '',
    password: '',
    adminKey: ''
  });

  const AdminLoginChange = (e) => {
    const { name, value } = e.target;
    setAdminLoginForm({
      ...AdminLoginForm,
      [name]: value
    });
  };

  const handleAdminloginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(AdminLoginForm)
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login Successful:', data);
        setIsLoading(false);
        setIsSuccess(true);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      } else {
        console.error('Error logging in user:', data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
      setIsLoading(false);
    }
  };
  // const uploadLessonPlan = async (formData) => {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/lesson-plans/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Error uploading lesson plan: ${response.statusText}`);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error uploading lesson plan:', error);
  //   }
  // };
  
  const fetchSessions = async () => {
    try {
      const response = await fetch('http://localhost:3000/sessions');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error fetching sessions', error.message);
    }
  };

  const handleSessionChange = (e) => {
    const { value } = e.target;
    setSelectedSessionId(value);

    const selected = sessions.find(session => session._id === value);
    setSelectedSession(selected);
    setSelectedTerm('');
    setSelectedTermId('');
    };

  const handleTermChange = (e) => {
    const { value } = e.target;
    setSelectedTermId(value);

    const selected = terms.find(term => term._id === value);
    setSelectedTerm(selected);
  };


  const fetchTerms = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms`);
      const data = await response.json();
      setTerms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching terms', error.message);
      setTerms([]);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms/${selectedTermId}/classes/${selectedClassId}/subjects`);

      if (response.ok) {
        const data = await response.json();
        console.log('Subjects were fetched successfully', data);
        setSubjects(data);
      }
    } catch (error) {
      console.error('An error occurred when fetching subjects', error.message);
    }
  };
  
  const fetchClasses = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sessions/${selectedSessionId}/terms/${selectedTermId}/classes`);
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (error) {
      console.error('Error fetching classes', error.message);
    }
  };


  

  const handleClassSelect = (e) => {
    const id = e.target.value;
    const selectedClass = classes.find(classItem => classItem.id === parseInt(id));
    setSelectedClassId(id);
    setMyId(selectedClass._id); // Assuming `_id` is the MongoDB ObjectId you want to store
    console.log(`Selected class ID: ${id}, Object ID: ${selectedClass._id}`);
    localStorage.setItem('myId', selectedClass._id); // Save to localStorage
    fetchSessions();
  };
 
  

  const classItems = classes.map(classItem => (
    <option value={classItem.id} key={classItem.id}>
      {classItem.name}
    </option>
  ));

  const handleSubjectChange = (e) => {
    const selectedSubjectId = parseInt(e.target.value); // Parse as integer
    localStorage.setItem('selectedSubjectId', selectedSubjectId); // Store in localStorage
    setSelectedSubjectId(selectedSubjectId); // Update state
  };
  

  return (
    <GeneralContext.Provider
      value={{
        form,
        isLoading,
        isSuccess,
        setIsLoading,
        setIsSuccess,
        handleChange,
        handleSubmit,
        handleAdminSubmit,
        adminChange,
        AdminForm,
        user,
        setUser,
        AdminLoginChange,
        handleAdminloginSubmit,
        AdminLoginForm,
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
        classItems,
        myId,
        lessonPlans,
        selectedSubjectId,
        handleSubjectChange
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};