import {React, useState, useEffect} from 'react'
import './mydata.css';
const Mydata = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
        showData();
    },[]);
    const showData =async () => {
        const url = "https://planpgram.herokuapp.com/get"
        let response = await fetch(url, {
            method: 'GET', 
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          if (response.status !== 200) {
            alert("Something went wrong")
            return
          }
          let data5 = await response.json();
          data5.map((d)=>{
              d.value = JSON.parse(d.value)
              return <></>
          })
          setData(data5)
    }
    return (
        <>
            {
                data.length  > 0 ? 
              data.map((data,index)=><table key={index}>
                  <div className="heading" key={index}>Planogram Name : {data.name}</div>
                  <tr>
                    <th>Category Name</th>
                    <th>Color</th>
                    <th>Row, Col Points</th>
                  </tr>
                {
                  data.value.map((d,index)=>{
                    return <>
                    <tr key={index}>
                      <td>  {d.fields.cat_name}  </td>
                      <td> <p className="smallBox" style={{backgroundColor : `${d.fields.cat_color}`, width:"20px"}}></p></td>
                      <td> {
                          d.fields.data_point.name.map((data)=>{
                              return <> ({data}) </>
                          })
                            }</td>
                    </tr>
                    </>
                  })
              }
              </table>)
              : <h1>No Planogram Added </h1>
            }
        </>

    )
}
export default Mydata;
