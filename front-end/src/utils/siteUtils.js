export default function getTimeIntervals(el1,el2){
    const getHours=(val)=>{
        let tempVal=(JSON.parse(JSON.stringify(val))).split(':')
        return parseInt(tempVal[0])
    }
    let t1=JSON.parse(JSON.stringify(el1))
    let t1c=getHours(t1)
    let t2=JSON.parse(JSON.stringify(el2))
    let intervals=[]
    for(let i=0; i<(24-(getHours(t1)-getHours(t2))+1);i++){
        intervals.push({label:t1c+":00",value:t1c+":00"})
        if(t1c!==24){
            t1c+=1
        }else{
            t1c=1
        }
    }
    return intervals
}