if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
       navigator.serviceWorker
            .register('/sw.js')
            .then(reg=>{
                console.log("Registration Success",reg);
            })
            .catch(err=>{
                console.error("Registration failed",err);
            })
    });
}