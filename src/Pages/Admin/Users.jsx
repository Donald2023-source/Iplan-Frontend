import { useContext, useEffect } from "react"
import Nav from "../../Components/Nav"
import { GeneralContext } from "../../Context/Context"
const Users = () => {
    const {users, fetchUsers} = useContext(GeneralContext);

    useEffect(() => {
        fetchUsers()
    });
    return (
        <>
        <div>
            <Nav/>

            <div>
                <h4 className="text-center py-3 ">All users Will be displayed Here!</h4>
                
                <div>
                    <div>
                      <table className="w-screen">
                        <thead className="flex justify-between px-10">
                            <tr>FirstName</tr>
                            <tr>LastName</tr>
                            <tr>Email</tr>
                            <tr>StaffId</tr>
                            <tr>Password</tr>
                        </thead>

                        <div>
                            {users.map((user, id) => (
                                <tbody className="flex justify-between px-12">
                                    <tr className="w-10 text-sm">{user.firstName}</tr>
                                    <tr className="w-10 text-sm">{user.lastName}</tr>
                                    <tr className="w-10 text-sm">{user.password}</tr>
                                    <tr className="w-10 text-sm">{user.staffId}</tr>
                                    
                                </tbody>
                            ))}
                        </div>
                      
                      </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Users