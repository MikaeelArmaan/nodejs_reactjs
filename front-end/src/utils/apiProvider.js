export const api_provider = (end_point)=>{
    return `${process.env.REACT_APP_PROXY}/${end_point}`;
}