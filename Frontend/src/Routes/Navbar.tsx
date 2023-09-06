import { useNavigate } from "react-router-dom"

export function Navbar() {
    const navigate = useNavigate()

    return (
        <div style={{boxShadow: "rgb(241,215,182) 0px 13px 15px"}} className="fixed top-0 w-full h-14 bg-[rgb(241,215,182)] flex items-center px-5">
            <h2 onClick={()=> navigate("/")} style={{fontFamily:"cursive"}} className="text-blue-500 text-left font-bold text-2xl cursor-pointer">RoboAI</h2>
        </div>
    )
}
