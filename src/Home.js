import {React, useState, useEffect} from 'react'
import ReactColorPicker from '@super-effective/react-color-picker';
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
const Home = () => {
    let navigate = useNavigate();
    const [color, setColor] = useState('#3cd6bf');
    const [row, setRow] = useState(1);
    const [col, setCol] = useState(1);
    const [rowArr, setrowArr] = useState([0]);
    const [colArr, setcolArr] = useState([0]);
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [obj, setObj] = useState([])
    const [ok, setOk] = useState(true)
    const [input, setInput] = useState(true)
    const [plano, setPlano] = useState("")
    const [colorArr, setColorArr] = useState(["#808080"])
    const [colorOp, setColorOp] = useState(false)
    useEffect(() => {
        let rowArray = []
        for (var i = 0; i < row; i++) {
            rowArray.push(i)
        }
        setrowArr(rowArray)
        let colArray = []
        for (i = 0; i < col; i++) {
            colArray.push(i)
        }
        setcolArr(colArray)
      },[row, col])
    const onColorChange = (updatedColor) => {
        setColor(updatedColor);
    };
    const handleEvent = (e) => {
        e.preventDefault();
        if (name === "") {
            alert("Category Name is Required")
            return
        }
        if (data.length === 0) {
            alert("Atleast one row col should be selected")
            return
        }
        data.map((data1)=>{
            console.log(data1);
            document.getElementById(data1).style.pointerEvents ="none";
            return <></>
        })
        let newObj = {
            "cat_name" : name,
            "cat_color" : color,
            "data_point" : {
                "name" : data
            }
        }
        let dummyObj = obj;
        dummyObj.push(newObj)
        setObj(dummyObj)
        let newArr = colorArr
        newArr.push(color);
        setColorArr(newArr)
        setData([])
        setOk(!ok)
        setInput(false)
        setName("")
    }
    const handleChange1 = async (e)=> {
        let onlyNum = e.target.value;
        if (onlyNum  !== "" && !Number(onlyNum)) {
            return;
        }
        await setRow(onlyNum)
    }
    const handleChange2 = (e)=> {
        let onlyNum = e.target.value;
        if (onlyNum  !== "" &&  !Number(onlyNum)) {
            return;
        }
        setCol(e.target.value)
    }
    const handleChange3 = (e)=>{
        setName(e.target.value)
    }
    const selectCol = async (e) => {
        let ind = colorArr.indexOf(color);
        if (ind !== -1) {
            alert("Color is Already Taken change the Color")
            return
        }
        let id = e.target.id;
        let doc = document.getElementById(id)
        if (!doc.style.backgroundColor || doc.style.backgroundColor === 'rgb(128, 128, 128)') {
            doc.style.backgroundColor = color
            let dummy = []
            dummy = data;
            dummy.push(id);
            setData(dummy)
            if(data.length > 0){
                setOk(false); setColorOp(false)
            }
            else {
                setOk(true); setColorOp(true)
            }
            return
        }
        let dummy = []
        dummy = data;
        let index = dummy.indexOf(id);
        dummy.splice(index, 1);
        setData(dummy)
        doc.style.backgroundColor = "rgb(128, 128, 128)"
        if(data.length > 0)
            setOk(false)
        else
            setOk(true)
    }
    const handleChange4  = (e) => {
        setPlano(e.target.value)
    }
    const savePlano = async () => {
        if (plano === "") {
            alert("Planogram Name is Required")
            return
        }
        const url = "https://planpgram.herokuapp.com/add"
        let jsonObj =  {}
        jsonObj.name = plano;
        jsonObj.value = obj
        jsonObj = JSON.stringify(jsonObj)
        let response = await fetch(url, {
            method: 'POST', 
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: jsonObj 
          });
          console.log(response);
          setInput(true)
          if(response.status === 200) {
              alert("Successfully Saved Data");
              navigate("/mydata");
            }
          else  {
            alert("Something went wrong");
              console.log("something went wrong");
              return
          }
    }
    const openColor = () => {
        setColorOp(!colorOp)
    }
    return (
        <>
        <Link to="/mydata"><button className="buttonShow">Show Data</button></Link>
            <main>
                <div className = "left">
                   <h1> Planogram Box </h1>
                   {
                      rowArr.map((data)=><div className="flexBox">{
                          colArr.map((data1)=>{
                            var str = data.toString() + ',' + data1.toString()
                              return <div className="boxs" id = {str} onClick = {selectCol}>
                                {data},{data1}
                              </div> 
                          })
                        }
                          </div>
                      )
                   }
                   
                </div>
                <div className = "right">
                <h1> Planogram UI </h1> 
                <form onSubmit={handleEvent}>
                <div className = "coloumn">
                   <div className="half">
                    <label>
                    Rows: <p></p>
                    <input type="text" name="row" value={row} onChange={handleChange1} disabled={!input} />
                    </label>
                   </div>
                   <div className="half">
                    <label>
                    Coloumn: <p></p>
                    <input type="text" name="col" value={col} onChange={handleChange2} disabled={!input}/>
                    </label>
                    </div>
                    </div>
                    <p></p>
                    <div className = "coloumn">
                   <div className="half">
                    <label>
                    Name a Category: <p></p>
                    <input type="text" name="cat" value={name} onChange={handleChange3} required />
                    </label>
                    </div>
                    <div className="half">
                    <label>
                    Box Color: <p></p>
                    <div className="smallBox" style={{backgroundColor : `${color}`, margin:"0px"}} id="color" onClick={ok && openColor}></div>
                    </label>
                    </div>
                    </div>
                    <div>
                        {ok && colorOp ? 
                            <>
                            <p></p>
                            <ReactColorPicker className="popup" color={color} onChange={onColorChange} /></>
                        : ""}
                    </div>
                    <input className="button" type="submit" value="Fix Selection"/>
                </form>
                <div className="savePlano">

                    { obj.length > 0 ? 
                        <><label>
                        Enter Planogram Name: <p></p>
                        <input type="text" name="plano_name" value={plano} onChange={handleChange4} />
                    </label>
                    <p></p>
                    <button className="buttonSave" onClick={savePlano}>Save Planogram</button></>
                        : ''
                    }
                    </div>
                </div>
            </main>
            <div>
                { obj.length > 0 ? 
                    <><h3 className="details">Planogram Details</h3><table>
                        <tr>
                            <td>Category Name</td>
                            <td>Category Color</td>
                            <td>Row, Col Points</td>
                        </tr>
                        {obj.map((data) => {
                            return (<>
                                <tr>
                                    <td>{data.cat_name}</td>
                                    <td>  <p className="smallBox" style={{ backgroundColor: `${data.cat_color}` }}></p></td>
                                    <td>{data.data_point.name.map((d) => {
                                        return <>({d})</>;
                                    })}</td>
                                </tr>
                            </>);
                        })}
                    </table></>
                : '' }
            </div>
        </>
    )
}
export default Home;