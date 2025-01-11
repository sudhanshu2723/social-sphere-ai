import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"



// state tells use wheater we have to show the spinner or not
type Props={
    state:boolean
    className?:string 
    children:React.ReactNode 
    color?:string 
}
// if state->true show the spinner; else show the children
export default function Loader({state,className,children,color}:Props){
    return state ? <div className={cn(className)}>
        <Spinner color={color}/>
    </div>: <div>{children}</div>
}