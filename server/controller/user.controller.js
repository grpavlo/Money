const db = require("../db")


const registration = (body) => {
    return new Promise(async function (resolve, reject) {
        const {email, password} = body
        console.log(email)
        await db.query('INSERT INTO client (email, password) VALUES ($1, $2) RETURNING *', [email,password], (error, results) => {
            if (error) {
                reject(error)
                console.log(error.constraint)
                resolve(error.constraint)
            }else {
                if(email===results.rows[0].email && password===results.rows[0].password ){
                    resolve(
                        {
                            m: "good",
                            a:results.rows[0].id
                        })
                }
            }
        })
    })
}

const login = (body) => {
    return new Promise(async function (resolve, reject) {
        const {email, password} = body
        await db.query(`SELECT EXISTS (SELECT * FROM client WHERE email = '${email}')`, async (error, results) => {
            if (error) {
                reject(error)
                console.log(error)
                resolve("error")
            } else {
                if (results.rows[0].exists) {
                    await db.query(`SELECT EXISTS (SELECT * FROM client WHERE password = '${password}')`, (error, results) => {
                        if (error) {
                            reject(error)
                            console.log(error)
                            resolve({
                                m:"error",
                            })
                        }else{
                            if(results.rows[0].exists) {

                                db.query(`SELECT * FROM client WHERE email = '${email}'`,(error, results) => {
                                    resolve(
                                        {
                                            m: "good",
                                            a:results.rows[0].id
                                        })
                                })
                            }else {
                                resolve({
                                    m:"password error",
                                })
                            }
                        }
                    })
                } else {
                    resolve({
                        m:"email error",
                    })
                }
            }
        })
    })
}


const  forgot = body=>{


    return new Promise(async function(resolve, reject){

        const {email, password} = body
        await  db.query(`SELECT EXISTS (SELECT * FROM client WHERE email = '${email}')`, async (error,results)=> {
            if(error){
                reject(error)
                console.log(error)
                resolve("error")
            }else {
                console.log(results.rows[0].exists)

                if (results.rows[0].exists) {
                    await db.query(`UPDATE client SET password = '${password}' WHERE email = '${email}'  `, async (error,results)=> {
                        if (error) {
                            reject(error)
                            console.log(error)
                            resolve("error")
                        }else{
                            resolve("good")
                        }
                    })
                }else {
                    resolve("error")
                }


            }
        })
    })
}

const  getId = body=>{


    return new Promise(async function(resolve, reject){

        const {nick} = body

        await  db.query(`SELECT * FROM client WHERE nick = '${nick}'`, async (error,results)=> {
            if(error){
                reject(error)
                console.log(error)
                resolve("error")
            }else {
                    resolve(JSON.stringify({
                        mes:"good",
                        id:results.rows[0].id
                    }))

            }
        })

    })
}

const  money = body=>{


    return new Promise(async function(resolve, reject){

        const {id,nM,month} = body
        await  db.query(`INSERT INTO money (client_id,`+month+`) VALUES ('${id}','${JSON.stringify(nM)}') RETURNING *`, async (error,results)=> {
            if(error){
                reject(error)
                console.log(error)
                resolve("error")
            }
        })

    })
}

const  total = body=>{


    return new Promise(async function(resolve, reject){

        const {id,month} = body
        console.log(month)
        await  db.query(`SELECT `+month+` FROM money WHERE client_id  = '${id}' `, async (error,results)=> {
            if(error){
                reject(error)
                console.log(error)
                resolve("error")
            }else {
                let arr=[]
                let length = results.rows.length


                for(let i = 0; i<results.rows.length;i++){
                    if(month==="january"){
                        if(results.rows[i].january !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].january))
                        }

                    }else  if(month==="february"){
                        if(results.rows[i].february !==null) {
                            arr = arr.concat(JSON.parse(results.rows[i].february))
                        }
                    }else  if(month==="march"){
                        if(JSON.parse(results.rows[i].march )!==null){
                            arr=arr.concat(JSON.parse(results.rows[i].march ))
                        }

                    }else  if(month==="april"){
                        if(results.rows[i].april !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].april ))
                        }

                    }else  if(month==="may"){
                        if(results.rows[i].may !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].may ))
                        }

                    }else  if(month==="june" ){
                        if(results.rows[i].june !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].june ))
                        }

                    }else  if(month==="july"){
                        if(results.rows[i].july !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].july ))
                        }

                    }else  if(month==="august"){
                        if(results.rows[i].august !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].august ))
                        }

                    }else  if(month==="september"){
                        if(results.rows[i].september !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].september ))
                        }

                    }else  if(month==="october"){
                        if(results.rows[i].october !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].october ))
                        }

                    }else  if(month==="november"){
                        if(results.rows[i].november !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].november  ))
                        }

                    }else  if(month==="december"){
                        if(results.rows[i].december !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].december ))
                        }
                    }

                }

                console.log(arr)

                resolve(JSON.stringify({
                    arr:arr,
                    length:length
                }))

            }
        })

    })
}

const  income = body=>{


    return new Promise(async function(resolve, reject){

        const {id,nM,month} = body

        await  db.query(`INSERT INTO income (client_id,`+month+`) VALUES ('${id}','${JSON.stringify(nM)}') RETURNING *`, async (error,results)=> {
            if(error){
                reject(error)
                console.log(error)
                resolve("error")
            }
        })

    })
}

const  totalIncome = body=>{


    return new Promise(async function(resolve, reject){

        const {id,month} = body
        console.log(month)
        await  db.query(`SELECT `+month+` FROM income WHERE client_id  = '${id}' `, async (error,results)=> {
            if(error){
                reject(error)
                console.log(error)
                resolve("error")
            }else {
                let arr=[]
                let length = results.rows.length


                for(let i = 0; i<results.rows.length;i++){
                    if(month==="january"){
                        if(results.rows[i].january !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].january))
                        }

                    }else  if(month==="february"){
                        if(results.rows[i].february !==null) {
                            arr = arr.concat(JSON.parse(results.rows[i].february))
                        }
                    }else  if(month==="march"){
                        if(JSON.parse(results.rows[i].march )!==null){
                            arr=arr.concat(JSON.parse(results.rows[i].march ))
                        }

                    }else  if(month==="april"){
                        if(results.rows[i].april !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].april ))
                        }

                    }else  if(month==="may"){
                        if(results.rows[i].may !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].may ))
                        }

                    }else  if(month==="june" ){
                        if(results.rows[i].june !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].june ))
                        }

                    }else  if(month==="july"){
                        if(results.rows[i].july !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].july ))
                        }

                    }else  if(month==="august"){
                        if(results.rows[i].august !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].august ))
                        }

                    }else  if(month==="september"){
                        if(results.rows[i].september !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].september ))
                        }

                    }else  if(month==="october"){
                        if(results.rows[i].october !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].october ))
                        }

                    }else  if(month==="november"){
                        if(results.rows[i].november !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].november  ))
                        }

                    }else  if(month==="december"){
                        if(results.rows[i].december !==null) {
                            arr=arr.concat(JSON.parse(results.rows[i].december ))
                        }
                    }

                }

                console.log(arr)

                resolve(JSON.stringify({
                    arr:arr,
                    length:length
                }))

            }
        })

    })
}

const deleteDB = body=>{
    const {nM,nameBd,month} = body
    console.log("10 "+nM)
    console.log(nameBd)
    console.log(month)
    return new Promise(async function(resolve, reject) {

        await  db.query(`DELETE  FROM `+nameBd+` WHERE `+month+`  = '${nM}' RETURNING *`, async (error,results)=> {


        })
    })
}


module.exports = {
    registration,
    login,
    forgot,
    getId,
    money,
    total,
    income,
    totalIncome,
    deleteDB
}