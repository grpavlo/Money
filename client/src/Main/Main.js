import React from "react";
import { PieChart } from 'react-minimal-pie-chart';


import iconLeft from "../icon/5.png"
import iconRight from "../icon/10s.png"
import iconTRANSPORT from "../icon/6s.png"
import iconLEISURE from "../icon/8s.png"
import iconPRODUCTS from "../icon/1s.png"
import iconHEALTH from "../icon/3s.png"
import iconPRESENTS from "../icon/4s.png"
import iconCAFE from "../icon/5s.png"
import iconOk from "../icon/9S.png"
import "./Main.css"
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
let  PRODUCTSSUM,LEISURESUM, TRANSPORTSUM,CAFESUM ,PRESENTSSUM ,HEALTHSUM,OTHERSUM ,SALARYSUM = 0
const Main = () =>{
    let id = localStorage.getItem("id")
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const  [balance, setBalance] = React.useState("")
    const  [month, setMonth] = React.useState("")
    const  [name, setName] = React.useState("")

    const  [PRODUCTS, setPRODUCTS] = React.useState(0)
    const  [LEISURE, setLEISURE] = React.useState(0)
    const  [TRANSPORT, setTRANSPORT] = React.useState(0)
    const  [CAFE, setCAFE] = React.useState(0)
    const  [PRESENTS, setPRESENTS] = React.useState(0)
    const  [HEALTH, setHEALTH] = React.useState(0)

    const  [globalSum, setglobalSum] = React.useState(0)
    const  [globalSumincome, setglobalSumincome] = React.useState(0)

    const  [difference, setDifference] = React.useState(0)

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
        setPRODUCTS(PRODUCTSSUM)
        setLEISURE(LEISURESUM)
        setTRANSPORT(TRANSPORTSUM)
        setCAFE(CAFESUM)
        setPRESENTS(PRESENTSSUM)
        setHEALTH(HEALTHSUM)

        setglobalSum(PRODUCTS+LEISURE+TRANSPORT+CAFE+PRESENTS+HEALTH)
        setglobalSumincome(OTHERSUM+SALARYSUM)

        setDifference(globalSumincome-globalSum)
    }

    function openModal(name) {

        setMonth(monthOld)
        setName(name)
        setIsOpen(true);
        setBalance("")
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
            fetch("http://localhost:3001/api/money",{
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

    function monthNext(){

        if(monthOld==="january"){
            window.open("/?month=february","_self")
        }else if(monthOld==="february"){
            window.open("/?month=march","_self")
        }else if(monthOld==="march"){
            window.open("/?month=april","_self")
        }else if(monthOld==="april"){
            window.open("/?month=may","_self")
        }else if(monthOld==="may"){
            window.open("/?month=june","_self")
        }else if(monthOld==="june"){
            window.open("/?month=july","_self")
        }else if(monthOld==="july"){
            window.open("/?month=august","_self")
        }else if(monthOld==="august"){
            window.open("/?month=september","_self")
        }else if(monthOld==="september"){
            window.open("/?month=october","_self")
        }else if(monthOld==="october"){
            window.open("/?month=november","_self")
        }else if(monthOld==="november"){
            window.open("/?month=december","_self")
        }else if(monthOld==="december"){
            window.open("/?month=january","_self")
        }

    }

    function monthBack(){

        if(monthOld==="january"){
            window.open("/?month=december","_self")

        }else if(monthOld==="february"){
            window.open("/?month=january","_self")
        }else if(monthOld==="march"){
            window.open("/?month=february","_self")
        }else if(monthOld==="april"){
            window.open("/?month=march","_self")
        }else if(monthOld==="may"){
            window.open("/?month=april","_self")
        }else if(monthOld==="june"){
            window.open("/?month=may","_self")
        }else if(monthOld==="july"){
            window.open("/?month=june","_self")
        }else if(monthOld==="august"){
            window.open("/?month=july","_self")
        }else if(monthOld==="september"){
            window.open("/?month=august","_self")
        }else if(monthOld==="october"){
            window.open("/?month=september","_self")
        }else if(monthOld==="november"){
            window.open("/?month=october","_self")
        }else if(monthOld==="december"){
            window.open("/?month=november","_self")

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
                        <button className="rightButton" onClick={()=>{window.open("/operations?month="+monthOld,"_self")}}>
                            <img alt="OPERATIONS " className="rightImg" src={iconRight}/>
                        </button>
                    </div>

                    <div className="leftHalf"></div>

                    <div className="rightHalf"></div>

                </div>

                <div className="leftMoney">
                    <div className="PRODUCTS">
                        <span className="textPRODUCTS">PRODUCTS</span>
                        <button className="buttonPRODUCTS" onClick={()=>{openModal("PRODUCTS")}}><img alt="PRODUCTS" className="imgPRODUCTS" src={iconPRODUCTS}/></button>
                        <output className="outputPRODUCTS">{PRODUCTS} ₴</output>
                    </div>
                    <div className="LEISURE">
                        <span className="textLEISURE">LEISURE</span>
                        <button className="buttonLEISURE" onClick={()=>{openModal("LEISURE")}}><img alt="LEISURE" className="imgLEISURE" src={iconLEISURE}/></button>
                        <output className="outputLEISURE">{LEISURE} ₴</output>
                    </div>
                    <div className="TRANSPORT">
                        <span className="textTRANSPORT">TRANSPORT</span>
                        <button className="buttonTRANSPORT" onClick={()=>{openModal("TRANSPORT")}}><img alt="TRANSPORT" className="imgTRANSPORT" src={iconTRANSPORT}/></button>
                        <output className="outputTRANSPORT">{TRANSPORT} ₴</output>
                    </div>
                </div>

                <div className="rightMoney">
                    <div className="CAFE">
                        <span className="textCAFE">CAFE</span>
                        <button className="buttonCAFE" onClick={()=>{openModal("CAFE")}}><img alt="CAFE" className="imgCAFE" src={iconCAFE}/></button>
                        <output className="outputCAFE">{CAFE} ₴</output>
                    </div>
                    <div className="PRESENTS">
                        <span className="textPRESENTS">PRESENTS</span>
                        <button className="buttonPRESENTS" onClick={()=>{openModal("PRESENTS")}}><img alt="PRESENTS" className="imgPRESENTS" src={iconPRESENTS}/></button>
                        <output className="outputPRESENTS">{PRESENTS} ₴</output>
                    </div>
                    <div className="HEALTH">
                        <span className="textHEALTH">HEALTH</span>
                        <button className="buttonHEALTH" onClick={()=>{openModal("HEALTH")}}><img alt="HEALTH" className="imgHEALTH" src={iconHEALTH}/></button>
                        <output className="outputHEALTH">{HEALTH} ₴</output>
                    </div>
                </div>

                <div className="circle">
                    <div className="Chart">
                        <PieChart
                            data={[
                                { title: 'HEALTH', value: HEALTH, color: '#42FF00' },
                                { title: 'TRANSPORT', value: TRANSPORT, color: '#EBFF00' },
                                { title: 'LEISURE', value: LEISURE, color: '#FF00F5' },
                                { title: 'PRODUCTS', value: PRODUCTS, color: '#0500FF' },
                                { title: 'CAFE', value: CAFE, color: '#000000' },
                                { title: 'PRESENTS', value: PRESENTS, color: '#FF5C00' },

                            ]}
                        />
                    </div>

                    <button className="Ellipse" onClick={()=>{window.open("/INCOME?month="+monthOld,"_self")}}>
                       <div className="box">
                           <span className="textCOSTS">COSTS</span>
                           <span className="RtextCOSTS">{globalSum} ₴</span>
                           <span className="GtextCOSTS">{globalSumincome} ₴</span>
                       </div>
                    </button>

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
                </div>
            </Modal>
        </div>
    )
}

export default Main