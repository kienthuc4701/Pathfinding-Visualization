import { usePointControl } from "@/hook/usePointControl";



export const PointControl = ()=> {
    const  {startPoint, endPoint, setStartPoint, setEndPoint} = usePointControl();
    return <div className="">{startPoint  && ''}</div>
}