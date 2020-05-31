import { retrieveData } from "../services/storage.service";

export const authHeader = async () => {
  return retrieveData("user").then(user => {
    if (user && user !== "undefined") {
      return "Bearer " + JSON.parse(user).token;
    } else {
      return "";
    }
  });
};


export const viewDateFormat = inputDate => {
    const date = new Date(inputDate);
    return `${appendZero(date.getDate())}/${appendZero(date.getMonth() + 1) }/${date.getFullYear()}`;
  };
  
  const appendZero = (num)=>{
    if(num < 10 && num > 0){
      return `0${num}`
    }
    return num;
  
  }

export const viewDateFormat2 = inputDate => {
  if (inputDate) {
    const date = new Date(inputDate).toISOString().slice(0, 10);
    return date;
  }
  return inputDate;
};
