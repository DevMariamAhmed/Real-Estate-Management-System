import React,{useState,useEffect} from "react"
import MetaTags from 'react-meta-tags';
import axios from "axios";
import bootstraps from 'bootstrap/dist/css/bootstrap.css';
import DataTable from "react-data-table-component";
import { object } from "prop-types";
import { MDBDataTable } from "mdbreact";
import Sidebar from '../Components/Header'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle ,Modal,FormGroup,Label, Toast} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { ToastContainer, toast } from 'react-toastify';
import {AiOutlineDelete} from 'react-icons/ai'
import {BiSolidPencil} from 'react-icons/bi'
import Header from "../Components/Header";
import Sidenav from "../Components/Sidenav";
let endPoint="http://localhost:1200/tenants"  

// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';


function Customer(){
    const[menu,setmenu]=useState(false);
    const toggle = () => {setmenu(!menu)};
    const[isopen ,setisopen]=useState(false);
    const[isEdit,setisEdit]=useState(false);
    const [homeData,SethomeData] = useState([]);
    const[homeObj,sethomeObj]=useState({
        Name:"",
        Emailaddress:"",
        Emailaddress:"",
      Phone:""
    })
    // useEffect(()=>{
    //     async function onload() {
          
    //     let {data}=await axios.get('http://localhost:1200/tenants')
    //    SethomeData(data)
    //     // console.log("data loaded",data)
    //     }
    //     onload()
        
    // })
    const getalldata = () => {
        
      axios.get(endPoint).then((response) => {
        sethomeObj(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }


  useEffect(() => {
      getalldata()

  }, [])

    const deletedata = (id)=> {
      axios.delete(`http://localhost:1200/tenants/${id}`).then((response) => {
        getalldata()
      
      
      alert("deleted customer")
      }).catch((error) => {
          console.log(error)
      })
  }
    const hundleEdit=data=>{
      setisopen(true)
      sethomeObj(data)
      setisEdit(true)
    }
    const data={
         columns: [
      {
        label: "Name",
        field: "Name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Emailaddress",
        field: "Emailaddress",
        sort: "asc",
        width: 270,
      },
      {
        label: "Emailaddress",
        field: "Emailaddress",
        sort: "asc",
        width: 200,
      },
      {
        label: "Phone",
        field: "Phone",
        sort: "asc",
        width: 100,
      },
      {
        label: "actions",
        field: "actions",
        sort: "asc",
        width: 200
      }

    ],
        rows: homeData?.map(data => {
            data . actions=(
                <div >
                    <button onClick={()=>hundleEdit(data)} className="btn  mx-2" style={{background:"#E45F9F"}}>
                       
                        <BiSolidPencil color="white"/>
                         </button>
                        <button onClick={()=>hundleEdit(data)} className="btn btn-danger ">
                       
                         <AiOutlineDelete color="white"/>
                        
                          </button>
                </div>
            )
            // data.hometype
            // data.location
            // data.ownerEmailaddress
            // data.ownerName

            
                return data
            
            })
            
    }

    const tog_standard=()=>{
      setisopen(!isopen)
    }
    const hundleChange=(e)=>{
      // console.log(e.target.value)
      sethomeObj({...homeObj,[e.target.Name]:e.target.value})
    }
  
  //   const handleSubmit = async (e) => {
  //     console.log(homeObj)
  //     try {
  //       if (isEdit) {
  //         let mainobj={
  //           Name:homeObj.Name,
  //           Emailaddress:homeObj.Emailaddress,
  //           Emailaddress:homeObj.Emailaddress,
  //           Phone:homeObj.Phone

  //         }
  //         let updatedIdEndpoint = `${endPoint}/${homeObj._id}`
  //         console.log("updatedIdEndpoint",updatedIdEndpoint, homeObj)
  //         // //put editing data
  //         const {data} = await axios.put(updatedIdEndpoint, mainobj)
  //         if (data.status == "success") {
  //             toast.success(data.message)
  //             setisEdit(false)
  //             setisopen(false)

  //         }
  //         else {
  //             toast.error(data.message)
  //         }
  //     }
  //     else {


  //         // post

  //         let { data } = await axios.post(endPoint, homeObj)
  //         console.log(homeObj)
  //         if (data.status == "success") {
  //             toast.success(data.messsage)
  //             sethomeObj({
  //             Name:"",
  //             Emailaddress:"",
  //             Emailaddress:"",
  //             Phone:""
            
  //           })
  //             setisopen(false)
              
             
  //  }
  //         else {
  //             toast.error(data.message)
  //         }
  //     }
  //     // return


  //     //     }
        
  //     } catch (error) {
  //         toast.error(error.message)

  //     }

  // }
  const handleSubmit = async (e) => {
    console.log(homeObj)
    try {
      if (isEdit) {
        let mainobj={
          Name:homeObj.Name,
          Emailaddress:homeObj.Emailaddress,
          Emailaddress:homeObj.Emailaddress,
          Phone:homeObj.Phone




          
          

        }
        let updatedIdEndpoint = `${endPoint}/${homeObj._id}`
        console.log("updatedIdEndpoint",updatedIdEndpoint)
        // //put editing data
        const {data} = await axios.put(updatedIdEndpoint, mainobj)
        if (data.status == "success") {
            toast.success(data.message)
            setisEdit(false)
            setisopen(false)

        }
        else {
            toast.error(data.message)
        }
    }
    else {


        // post

        let { data } = await axios.post(endPoint, homeObj)
        console.log(homeObj)
        if (data.status == "success") {
            toast.success(data.messsage)
            sethomeObj({Name:"",
            Emailaddress:"",
            Emailaddress:"",
            Phone:"",
           
          
          })
          
            setisopen(false)
            
           
 }
        else {
            toast.error(data.message)
        }
    }
    // return


    //     }
      
    } catch (error) {
        toast.error(error.message)

    }

}
     return(
        <React.Fragment>
           <Header/>
          <Sidenav/>
         
        <div className="page-content">
          <MetaTags>
              </MetaTags>
          <div className="container"style={{width:"60%"}}>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Real Estate Management</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active"></li>
                </ol>
              </Col>

             
              
              
            </Row>
         </div>
         <ToastContainer/>
          <Modal
                          isOpen={isopen}
                          toggle={()=>tog_standard()}
                        >
                        
                          <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">
                              Customers model
                            </h5>
                            <button
                              type="button"
                              // onClick={() => {
                              //   setmodal_standard(false)
                              // }}
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>

                             
                            </button>
                          </div>
                          <AvForm onValidSubmit={(e,v)=>{
                            handleSubmit()
                          }}>
                          <div className="modal-body">
                               <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">
                           Name
                            </Label>
                          <AvField
                            Name="Name"
                            placeholder="Enter Name"
                            type="text"
                            value={homeObj.Name}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">
                          Emailaddress
                            </Label>
                          <AvField
                            Name="Emailaddress"
                            placeholder="enter Emailaddress"
                            type="email"
                            value={homeObj.Emailaddress}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter Emailaddress"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom03">
                          Emailaddress
                            </Label>
                          <AvField
                            Name="Emailaddress"
                            placeholder="enter Emailaddress"
                            type="text"
                            value={homeObj.Emailaddress}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter Emailaddress"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom04">
                            Phone
                            </Label>
                          <AvField
                            Name="Phone"
                            placeholder="enter Phone"
                            type="text"
                            value={homeObj.Phone}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter Phone"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">
                            Location
                            </Label>
                          <AvField
                            Name="status"
                            placeholder="enter location"
                            type="select"
                            errorMessage="select"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                          <option value="banaan" selected="selected">banaa</option>
                        </FormGroup>
                      </Col> */}
                    </Row>
                       
                           </div> 
                          <div className="modal-footer">
                            <button
                              type="button"
                              // onClick={() => {
                              //   tog_standard()
                              // }}
                              onClick={()=>{tog_standard()
                              sethomeObj({
                            Name:"",
                              Emailaddress:"",
                              Emailaddress:"",
                              Phone:""})
                              
                              }}
                              className="btn btn-secondary waves-effect"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary waves-effect waves-light"
                            >
                              Save changes
                            </button>
                          </div>
                          </AvForm>  
                        </Modal>
                        
            {/* data table */}
            <Row>
              <Col className="col-12">
                <Card style={{background:"#94C8EF",color:"#E45F9F"}}>
                  <CardBody>
                    <Row>
                      <Col className="col-10"></Col>
                      <Col className="col-2 ">
                        <button onClick={()=>tog_standard()}   className="btn mb-2 text-white"style={{background:"#E45F9F"}}>Add new</button>
                      </Col>
                    </Row>
                   
  
                    <MDBDataTable responsive bordered data={data} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
  
           
          </div>
        </div>
      </React.Fragment>
        
      
    )
}

export default Customer;













