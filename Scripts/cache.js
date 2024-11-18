export const upload = () => {
    return new Promise(()=>{
      fetch("conf.json").then(r => r.json()).then(confData => {
        try{
          fetch(confData.url + "set", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'key': confData.token
            },
            body: JSON.stringify({
              key: confData.key,
              value: data
            })
          }).then(r => r.json())
            .then(r => {console.log(r);})
        }
        catch(error){
          reject(error)
        }
      })    
    })
}
  
  export const download = () => {
    return new Promise((resolve,reject)=>{
      fetch("conf.json").then(r => r.json()).then(confData => {
        try{
          fetch(confData.url + "get", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'key': confData.token
            },
            body: JSON.stringify({
              key: confData.key
            })
          }).then(r => r.json())
          .then(data => {resolve(data);})
        }catch(error) {
          reject(error)
        }
      })
    })   
  }