export const upload = (data) => {
    return new Promise((resolve)=>{
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
            .then(r => {resolve(r.result);})
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
        .then(data => {resolve(data.result);})
      }catch(error) {
        reject(error)
      }
    })
  })   
}

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    fetch("conf.json").then(r => r.json()).then(confData => {
      fetch("http://ws.cipiaceinfo.it/credential/login", { 
        method: "POST",
        headers: {
          "content-type": "application/json",
          "key": confData.token
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(r => r.json())
      .then(r => {resolve(r.result); 
      })
      .catch(reject);
    });
  });
}
