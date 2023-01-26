import React from "react";
import { PieChart } from 'react-minimal-pie-chart';


import iconLeft from "../icon/5.png"
import iconDelete from "../icon/12s.png"
import iconG from "../icon/11s.png"
import iconOk from "../icon/9S.png"
import "../Main/Main.css"
import "./Operations.css"
import Modal from "react-modal";


const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(34,34,34,0.77)'
    },
    content: {
        top: '55%',
        left: '52%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height:"705px",
        width: "490px",
        background:"#390081",

    },
};

let number=0
let point= true
let boolean= true
let arrMain= [];
let arrTotal = [];
let  moneyList,PRODUCTSSUM,LEISURESUM, TRANSPORTSUM,CAFESUM ,PRESENTSSUM ,HEALTHSUM,OTHERSUM ,SALARYSUM = 0
const Operations = () =>{
    let id = localStorage.getItem("id")
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const  [balance, setBalance] = React.useState("")
    const  [month, setMonth] = React.useState("")
    const  [name, setName] = React.useState("")

    const  [arr, setArr] = React.useState([])

    const  [globalSum, setglobalSum] = React.useState(0)
    const  [globalSumincome, setglobalSumincome] = React.useState(0)

    const  [difference, setDifference] = React.useState(0)

    const  [nameList, setNameList] = React.useState(0)

    const urlParams = new URLSearchParams(window.location.search);
    let monthOld = urlParams.get('month')

    function count(){
        if(boolean){

            fetch("http://localhost:3001/api/total",{
                method:"post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:id,
                    month:monthOld
                })
            }).then(response => {
                return response.text();
            }).then(data => {

                console.log(data)
                arrTotal=JSON.parse(data).arr
                LEISURESUM= 0
                TRANSPORTSUM= 0
                CAFESUM = 0
                PRESENTSSUM= 0
                HEALTHSUM = 0
                PRODUCTSSUM=0

                for(let i = 0; i<JSON.parse(data).length;i++){
                    if(JSON.parse(data).arr[i].name==="PRODUCTS"){
                        PRODUCTSSUM = Number(PRODUCTSSUM)+Number(JSON.parse(data).arr[i].money)
                    }else  if(JSON.parse(data).arr[i].name==="LEISURE"){
                        LEISURESUM = Number(LEISURESUM)+Number(JSON.parse(data).arr[i].money)
                    }else  if(JSON.parse(data).arr[i].name==="TRANSPORT"){
                        TRANSPORTSUM = Number(TRANSPORTSUM)+Number(JSON.parse(data).arr[i].money)
                    }else  if(JSON.parse(data).arr[i].name==="CAFE"){
                        CAFESUM = Number(CAFESUM)+Number(JSON.parse(data).arr[i].money)
                    }else  if(JSON.parse(data).arr[i].name==="PRESENTS"){
                        PRESENTSSUM = Number(PRESENTSSUM)+Number(JSON.parse(data).arr[i].money)
                    }else  if(JSON.parse(data).arr[i].name==="HEALTH"){
                        HEALTHSUM= Number(HEALTHSUM)+Number(JSON.parse(data).arr[i].money)
                    }
                }



            })

            fetch("http://localhost:3001/api/totalIncome",{
                method:"post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:id,
                    month:monthOld
                })
            }).then(response => {
                return response.text();
            }).then(data => {

                console.log(data)
                arrMain = JSON.parse(data).arr
                arrMain = arrMain.concat(arrTotal)
                console.log(arrMain)
                OTHERSUM= 0
                SALARYSUM= 0

                for(let i = 0; i<JSON.parse(data).length;i++){
                    if(JSON.parse(data).arr[i].name==="OTHER"){
                        OTHERSUM = Number(PRODUCTSSUM)+Number(JSON.parse(data).arr[i].money)
                    }else  if(JSON.parse(data).arr[i].name==="SALARY"){
                        SALARYSUM = Number(LEISURESUM)+Number(JSON.parse(data).arr[i].money)
                    }
                }


            })
            boolean=false
        }
    }

    function test(){
        count()
        balanceGlobal()


    }

    setTimeout(test,250)

    function balanceGlobal(){

        setArr(arrMain)
        setglobalSum(PRODUCTSSUM+LEISURESUM+TRANSPORTSUM+CAFESUM+PRESENTSSUM+HEALTHSUM)
        setglobalSumincome(OTHERSUM+SALARYSUM)

        setDifference(globalSumincome-globalSum)
    }

    function openModal(name,money) {
        console.log(money)

        setMonth(monthOld)
        setName(name)
        setIsOpen(true);
        setBalance(money)
        number=0
        point= true
    }

    function afterOpenModal() {
        subtitle.style.color = '#000000';
    }

    function closeModal() {
        boolean=true
        setTimeout(test,50)
        setIsOpen(false);
    }

    function balanceF(num){

        number++

        if(number<=19){
            setBalance(balance+String(num))
        }

    }

    function pointF(){
        if(point && balance!=="" ){
            setBalance(balance+".")
            point=false
        }
    }

    function erase(){
        if(balance.toString().slice(-1)==="."){
            point=true
        }
        setBalance(balance.slice(0, -1))
    }

    function reqDB(){
        if(balance!==""){
            fetch("http://localhost:3001/api/operations",{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:id,
                    nM:{
                        name:name,
                        money:balance
                    },
                    month:month
                }),
            }).then()
        }

        setTimeout( closeModal,50)


    }

    function deleteDB(){

            fetch("http://localhost:3001/api/delete",{
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nM:'{"name":"'+name+'","money":"'+balance+'"}',
                    nameBd: name === "SALARY"|| name === "OTHER"  ?"income":"money",
                    month:monthOld
                }),
            }).then()


        setTimeout( closeModal,50)


    }

    function monthNext(){

        if(monthOld==="january"){
            window.open("/Operations/?month=february","_self")
        }else if(monthOld==="february"){
            window.open("/Operations/?month=march","_self")
        }else if(monthOld==="march"){
            window.open("/Operations/?month=april","_self")
        }else if(monthOld==="april"){
            window.open("/Operations/?month=may","_self")
        }else if(monthOld==="may"){
            window.open("/Operations/?month=june","_self")
        }else if(monthOld==="june"){
            window.open("/Operations/?month=july","_self")
        }else if(monthOld==="july"){
            window.open("/Operations/?month=august","_self")
        }else if(monthOld==="august"){
            window.open("/Operations/?month=september","_self")
        }else if(monthOld==="september"){
            window.open("/Operations/?month=october","_self")
        }else if(monthOld==="october"){
            window.open("/Operations/?month=november","_self")
        }else if(monthOld==="november"){
            window.open("/Operations/?month=december","_self")
        }else if(monthOld==="december"){
            window.open("/Operations/?month=january","_self")
        }

    }

    function monthBack(){

        if(monthOld==="january"){
            window.open("/Operations/?month=december","_self")

        }else if(monthOld==="february"){
            window.open("/Operations/?month=january","_self")
        }else if(monthOld==="march"){
            window.open("/Operations/?month=february","_self")
        }else if(monthOld==="april"){
            window.open("/Operations/?month=march","_self")
        }else if(monthOld==="may"){
            window.open("/Operations/?month=april","_self")
        }else if(monthOld==="june"){
            window.open("/Operations/?month=may","_self")
        }else if(monthOld==="july"){
            window.open("/Operations/?month=june","_self")
        }else if(monthOld==="august"){
            window.open("/Operations/?month=july","_self")
        }else if(monthOld==="september"){
            window.open("/Operations/?month=august","_self")
        }else if(monthOld==="october"){
            window.open("/Operations/?month=september","_self")
        }else if(monthOld==="november"){
            window.open("/Operations/?month=october","_self")
        }else if(monthOld==="december"){
            window.open("/Operations/?month=november","_self")

        }

    }


    return(
        <div className="main">
            <div className="mainMain">
                <div className="purse">

                    <div className="left">
                        <button className="leftButton" onClick={()=>{window.open("/login","_self")}}>
                            <img alt="exit" className="leftImg" src={iconLeft}/>
                        </button>
                    </div>

                    <div className="right">
                        <button className="rightButton" onClick={()=>{window.open("/?month="+monthOld,"_self")}}>
                            <img alt="OPERATIONS " className="rightImg" src={iconG}/>
                        </button>
                    </div>

                    <div className="leftHalf"></div>

                    <div className="rightHalf"></div>

                </div>
                <div className="list">
                    <ol>
                        {arr.map((arr,i)=>(
                            <button className="buttonList" onClick={()=>{openModal(arr.name,arr.money)}}>
                                <li key={i}>
                                    <div className="oneLi">

                                        <span className="nameArr" >{arr.name}</span>
                                        <span className={arr.name === "SALARY"|| arr.name === "OTHER"  ?"moneyArrG":"moneyArrR" }>{arr.money}</span>
                                    </div>
                                    <br/>
                                </li>
                            </button>

                        ))
                        }

                    </ol>
                </div>




                <span className="balance">{difference} ₴</span>

                <div className="months">
                    <span className="monthsText">{monthOld}</span>
                    <button className="buttonR" onClick={()=>{monthNext()}}> > </button>
                    <button className="buttonL"  onClick={()=>{monthBack()}}> > </button>
                </div>
            </div>


            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                className="Modal"
                contentLabel="Example Modal"
            >
                <div className="name">
                    <span className="nameText"> {name}</span>
                </div>

                <div className="balanceModel">
                    <output className="balanceModelText" > {balance} ₴</output>
                </div>

                <div className="number">
                    <button className="number9" onClick={()=>{balanceF(9)}}><span className="number9Text">9</span></button>
                    <button className="number8" onClick={()=>{balanceF(8)}}><span className="number8Text">8</span></button>
                    <button className="number7" onClick={()=>{balanceF(7)}}><span className="number7Text">7</span></button>
                    <button className="number6" onClick={()=>{balanceF(6)}}><span className="number6Text">6</span></button>
                    <button className="number5" onClick={()=>{balanceF(5)}}><span className="number5Text">5</span></button>
                    <button className="number4" onClick={()=>{balanceF(4)}}><span className="number4Text">4</span></button>
                    <button className="number3" onClick={()=>{balanceF(3)}}><span className="number3Text">3</span></button>
                    <button className="number2" onClick={()=>{balanceF(2)}}><span className="number2Text">2</span></button>
                    <button className="number1" onClick={()=>{balanceF(1)}}><span className="number1Text">1</span></button>
                    <button className="numberP" onClick={pointF}><span className="numberPText">.</span></button>
                    <button className="number0" onClick={()=>{balanceF("0")}}><span className="number0Text">0</span></button>
                    <button className="numberB" onClick={erase}><span className="numberBText">⌫</span></button>
                    <button className="numberOk" onClick={()=>{reqDB()}}><img alt="ok" className="numberOkText" src={iconOk}/></button>
                    <button className="numberDelete" onClick={()=>{deleteDB()}}><img alt="Delete" className="numberOkDelete" src={iconDelete}/></button>
                </div>
            </Modal>
        </div>
    )
}

export default Operations