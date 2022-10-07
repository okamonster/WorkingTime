import React,{createContext,} from "react"

type StatusContextProps = {
    nowWorking:boolean,

};

const StatusContext = createContext<StatusContextProps>({
    nowWorking:false,

});

const StatusProvider = () => {
    

}