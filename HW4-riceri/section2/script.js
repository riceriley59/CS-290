// Your solution goes here 
function isStrongPassword(password){
    if(password.length < 8){
        return false;
    }else if(password.toLowerCase().includes("password")){
        return false;
    }else if(password === password.toLowerCase()){
        return false;
    }

    return true;
}