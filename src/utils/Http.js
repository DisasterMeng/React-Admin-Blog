import qs from 'querystring'

const BASE_URL = "http://127.0.0.1:5050/"

const getFormData = (params)=> {
        let formData = new FormData()
        for (var key in params) {
            formData.append(key, params[key])
        }
        return formData
    }


const  request=(method,url,params='')=>{

        let requestUrl = BASE_URL + url

        if(params && method==='GET'){
                requestUrl += ('?'+qs.stringify(params))
        }

        if (url.startsWith('https://') || url.startsWith('http://')){
                requestUrl = url
        }

        console.log(requestUrl)
        console.log(params)

        let config  = {
                method:method,
                credentials:'include',
                redirect:'follow',
        } 

        if (params&&method === 'POST'){
                config['body'] = getFormData(params)
        }
     

        return new Promise((resole,reject)=>{
                fetch(requestUrl,config)
                .then(res=>{
                        if (res.status===401){
                                reject("")
                        }else{
                                resole(res.json())    
                        }
                })
                .catch(err=>{
                        reject(err)
                })
        })

}



export default class Http{
        static get(url,params=''){
                return request('GET',url,params)
        }

        static post(url,params=''){
                return request('POST',url,params)
        }
}

