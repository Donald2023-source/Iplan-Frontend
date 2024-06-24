import Aside from "../../Components/aside"
import { FaCheck, FaCheckCircle, FaUser } from "react-icons/fa"
const AdminDashboard = () => {
    return (
        <>
        <div className="flex">
        <div className="fixed">
      <Aside/>
        </div>
        <div className="absolute left-80 w-[79%]">
          <div className="flex items-center justify-between px-10 py-2">
            <h2 className="font-medium text-lg">Dashboard</h2>
            <span className="flex items-center gap-4">
              <FaUser color="gray" size={25}/>
              <h2>UserName</h2>
            </span>
          </div>
          <hr className="ml-10 my-2" />
          <div className="flex gap-8">
            <div>
              <div>
          <div className="flex gap-7 ml-10">
            <section className="bg-[#FFEFE7] w-fit py-4 px-10 flex flex-col gap-2 rounded-lg">
              <h2 className="font-medium text-lg">Sections</h2>
              <h2 className="text-3xl font-bold">27</h2>
              <h4 className="text-[#FF5151]">Number of Sessions</h4>
            </section>

            <section className="bg-[#3784f146] w-fit py-4 px-6 flex flex-col gap-2 rounded-lg">
              <h2 className="font-medium text-lg">Terms</h2>
              <h2 className="text-3xl font-bold">3</h2>
              <h4 className="text-[#3786F1] text-sm">Maximum Number of Terms</h4>
            </section>

            <section className="bg-[#FFEFE7] w-fit py-4 px-10 flex flex-col gap-2 rounded-lg">
              <h2 className="font-medium text-lg">Classes</h2>
              <h2 className="text-3xl font-bold">6</h2>
              <h4 className="text-[#FF5151]">Number of classes</h4>
            </section>
          </div>
          <div className="ml-10 mt-7 border p-2 shadow-sm rounded-lg hover:scale-105 transition duration-500">
            <h2 className="font-medium text-lg">Benefits</h2>
            <p className="leading-8"><span className="font-medium">Iplan </span>is a versatile platform designed for educators to upload and share lesson Plans. It offers several benefits. Overall, iplan enhances communication, organization and continous improvement in educational planning</p>
          </div>

          <div className="ml-10 mt-6 p-2 py-4 flex flex-col gap-6 border shadow-sm rounded-lg">
            <h2 className="text-center font-bold">How to Use Iplan</h2>
            <span className="bg-[#E0E0E0] border py-2 px-1 rounded-md">
              <h2 className="text-[#686868] font-bold">Step 1.</h2>
              <h2 className="text-sm">Go to your Lesson Plans tab</h2>
            </span>

            <span className="bg-[#E0E0E0] border py-1 px-1 rounded-md">
              <h2  className="text-[#686868] font-bold">Step 2.</h2>
              <h2 className="text-sm">You can create a session or Term by clicking the plus button as it is on each labelled box</h2>
            </span>

            <span className="bg-[#E0E0E0] border py-1 px-1 rounded-md">
              <h2  className="text-[#686868] font-bold">Step 3.</h2>
              <h2 className="text-sm">You can view the lessonPlans By clicking the view button.</h2>
            </span>

            <span className="bg-[#E0E0E0] border py-1 px-1 rounded-md">
              <h2  className="text-[#686868] font-bold">Step 4.</h2>
              <h2 className="text-sm">You can comment on the lesson Plan as the appropriate space is provided for you.</h2>
            </span>

        
          </div>
          </div>
          </div>
          <div className="flex flex-col gap-5">
          <div className="w-[27rem] rounded-lg bg-[#1B204A] text-white border p-3">
            <h2 className="font-bold text-xl border-b py-2">Iplan</h2>
            <span>
            <h2 className="py-3 text-gray-400 font-bold">What is Iplan?</h2>
              <h4 className="leading-9">Things have been made easier!. Iplan is a good platform that helps you keep track of your lessonPlans. Make sure everything is right and set for proper learning</h4>
            </span>
            
          </div>
          
          <div className="border w-[27rem] hover:scale-105 cursor-pointer py-4  transition duration-500 bg-[#E0E0E0] rounded-lg">
            <h2 className="pl-4 pb-8 text-xl font-medium">Priorities</h2>

            <div className="flex flex-col gap-14">
              <span className="flex items-center gap-3 px-2 h-fit">
                <FaCheckCircle color="blue" size={20}/>
                <span className="flex flex-col">
                <h2 className="font-bold">Record Keeping</h2>
                <p>Iplan gives a safe platform for record keeping.</p>
                </span>
              </span>

              <span className="flex items-center gap-3 px-2">
                <FaCheckCircle color="blue" size={20}/>
                <span className="flex flex-col">
                <h2 className="font-bold">Easy to use.</h2>
                <p>Iplan has a very friendly User-Interface. </p>
                </span>
              </span>

              <span className="flex items-center gap-3 px-2">
                <FaCheckCircle color="blue" size={20}/>
                <span className="flex flex-col">
                <h2 className="font-bold">Available</h2>
                <p>Iplan is readily available site. </p>
                </span>
              </span>

              <span className="flex items-center gap-3 px-2">
                <FaCheckCircle color="blue" size={20}/>
                <span className="flex flex-col">
                <h2 className="font-bold">Secure</h2>
                <p>Iplan is readily available site. </p>
                </span>
              </span>
            </div>
          </div>
          </div>
          </div>
        </div>
        </div>

        </>
    )
}
export default AdminDashboard