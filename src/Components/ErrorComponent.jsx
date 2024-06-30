import { useContext } from "react"
import { GeneralContext } from "../Context/Context"
import { FaCheckCircle, FaTimesCircle, FaXing } from "react-icons/fa"

const ErrorComponent = ({Error}) => {
    const {isFailed, setIsFailed} = useContext(GeneralContext)
    
    
    return (
        <>
        <div>
        <div onClick={() => setIsFailed(!isFailed)} className={isFailed ? "h-screen inset-0 fixed opacity-70 bg-black" : 'hidden'}/>
        
        <div  className={isFailed && 'flex absolute right-0 left-0 top-52 flex-col items-center gap-4 bg-white shadow-lg p-10 border w-[20rem] rounded-lg mx-auto'}>
        <FaTimesCircle color="red" size={80}/>
        <h2>An Error Occured</h2>
        <h2 className='font-medium'>{Error}!</h2>
            </div>
        </div>
        </>
    )
}
export default ErrorComponent;