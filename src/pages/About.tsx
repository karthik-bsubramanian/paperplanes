import { useNavigate } from "react-router-dom"

export const About = ()=>{
    const navigate = useNavigate();
    return <div className="mt-50">
       <div className="mx-auto">
        <span className="flex justify-center text-xl font-semibold">Explore more topics</span>
        <button 
        onClick={()=>{navigate('/topics')}}
        className="rounded-3xl shadow-[0_0_0_0.5px_rgba(0,0,0,0.4)] px-2 p-2 mt-2 mx-auto flex justify-center cursor-pointer">Start Reading</button>

        </div>
    </div> 
}