import { useContext } from "react"
import { GeneralContext } from "../Context/Context"
import { FaCheckCircle } from "react-icons/fa"
const Success = ({message}) => {
    const {isSuccess, setIsSuccess} = useContext(GeneralContext)
    return (
        <>
        <div>
        <div onClick={() => setIsSuccess(!isSuccess)} className={isSuccess ? "h-screen inset-0 fixed opacity-70 bg-black" : 'hidden'}/>
        
        <div  className={isSuccess && 'flex absolute right-0 left-0 top-52 flex-col items-center gap-4 bg-white shadow-lg p-10 border w-[20rem] rounded-lg mx-auto'}>
        <FaCheckCircle size={80} color='green'/>
        <h2>Session Created SuccessFully</h2>
        
        <h2 className='font-medium'>{message}!</h2>
            </div>
        </div>
        </>
    )
}
export default Success