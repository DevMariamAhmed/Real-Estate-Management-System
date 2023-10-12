import React,{useState,useEffect} from "react"
import MetaTags from 'react-meta-tags';
import axios from "axios";

// import { Col, Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"


import { MDBDataTable } from "mdbreact";
import {AiOutlineDelete} from 'react-icons/ai'
import {BiSolidPencil} from 'react-icons/bi'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle ,Modal,FormGroup,Label, Toast} from "reactstrap"
// import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { ToastContainer, toast } from 'react-toastify';

import Header from "../Components/Header";
import Sidenav from "../Components/Sidenav";
let endPoint="http://localhost:1200/mantainancereq"

export default function Maintainacereq() {
  const[getcustomer,setgetcustomer]=useState([])
  const[gethome,setgethomer]=useState([])
    const[menu,setmenu]=useState(false);
    const toggle = () => {setmenu(!menu)};
    const[isopen ,setisopen]=useState(false);
    const[isEdit,setisEdit]=useState(false);
    const [RenterData,SetRenterData] = useState([]);
    const[RenterObj,setRenterObj]=useState({
      customername:"",
        description:"",
        Hometype:"",
        Priority:"",
       
    })
    const getalldata = () => {
        
      axios.get(endPoint).then((response) => {
        SetRenterData(response.data)
      }).catch((error) => {
          console.log(error)
      })
  }


  useEffect(() => {
      getalldata()

  }, [])
    // useEffect(()=>{
    //     async function onload() {
          
    //     let {data}=await axios.get('http://localhost:1200/mantainancereq')
    //    SetRenterData(data)
    //     // console.log("data loaded",data)
    //     }
    //     onload()
        
    // })
    const deletedata = (id)=> {
      axios.delete(`http://localhost:1200/mantainancereq/${id}`).then((response) => {
        getalldata()
      
      
      alert("deleted request")
      }).catch((error) => {
          console.log(error)
      })
  }
    const hundleEdit=data=>{
      setisopen(true)
      setRenterObj(data)
      setisEdit(true)
    }
    const data={
         columns: [
      {
        
        label: "customer name",
        field: "customername",
        sort: "asc",
        width: 150,
      },
     
      {
        
        label: "description",
        field: "description",
        sort: "asc",
        width: 150,
      },
      {
        
        label: "hometype",
        field: "Hometype",
        sort: "asc",
        width: 150,
      },
    
      {
        label: "Priority",
        field: "Priority",
        sort: "asc",
        width: 200,
      },
      
      

      {
        label: "actions",
        field: "actions",
        sort: "asc",
        width: 200
      }

    ],
        rows: RenterData?.map(data => {
            data . actions=(
                <div >
                    <button onClick={()=>hundleEdit(data)} className="btn  mx-2" style={{background:"#E1DDDB"}}>
                        <i className="dripicons-pencil"></i><BiSolidPencil/> </button>
                        <button onClick={()=>deletedata(data)} className="btn btn-danger ">
                        <i className="dripicons-trash"></i><AiOutlineDelete/> </button>
                </div>
            )
            // data.hometype
            // data.location
            // data.totalamount
            // data.amountpaid

            
                return data
            
            })
            
    }

    const tog_standard=()=>{
      setisopen(!isopen)
    }
    const hundleChange=(e)=>{
      // console.log(e.target.value)
      setRenterObj({...RenterObj,[e.target.name]:e.target.value})
    }
  
    const handleSubmit = async (e) => {
      console.log(RenterObj)
      try {
        if (isEdit) {
          let mainobj={
            // custname:RenterObj.rentalhomeId.Name,
            // hometype:RenterObj.hometype?.type,
          
            customername:RenterObj.customername,
           
            description:RenterObj.description,
            Hometype:RenterObj.Hometype,

            Priority:RenterObj.Priority,
            

          }
          let updatedIdEndpoint = `${endPoint}/${RenterObj._id}`
          console.log("updatedIdEndpoint",updatedIdEndpoint)
          // //put editing data
          const {data} = await axios.put(updatedIdEndpoint, mainobj)
          if (data.status === "success") {
              toast.success(data.message)
              setisEdit(false)
              

          }
          else {
            
              toast.error(data.message)
              setisopen(false)
          }
      }
      else {


          // post

          let { data } = await axios.post(endPoint, RenterObj)
          console.log(RenterObj)
          if (data.status == "success") {
              toast.success(data.messsage)
              setRenterObj({
                customername:"",
                description:"",
              Hometype:"",
              Priority:"",
             
            
            })
            
            
             
   }
          else {
              toast.error(data.message)
              setisopen(false)
              
          }
      }
      // return


      //     }
        
      } catch (error) {
          toast.error(error.message)

      }

  }
  // const params = useParams()
  // const hundleEdit = (event) => {
  //   event.preventDefault()
  //   axios.put(`http://localhost:1200/mantainancereq/${params.id}`, {
  //       "description": title,
  //       "description": description
  //   }).then((res)=>{
  //     alert("success")
      
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
  // }

  
    return (

        <React.Fragment>
           <Header/>
          <Sidenav/>
         
        <div className="page-content">
          <MetaTags>
              </MetaTags>
          <div className="container-fluid  ">
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col xl={4} md={8} style={{ marginTop:"80px"}}>
                <h6 className="page-title">Real Estate</h6>
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
                             requests 
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
                               <Col  md="6" >
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="validationCustom02">
                                        customer name:
                                      </Label>
                                      <AvField
                                        name="customername"
                                        placeholder="Enter your gender"
                                        type="text"
                                        value={RenterObj.customername}
                                        onChange={e => hundleChange(e)}
                                        errorMessage="enter customer name "
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="validationCustom02"
                                      >

                                        {/* <option value="">select customername</option>
                                        {getcustomer.map((cust)=>{
                                          return(
                                            <option value={cust._id}>{cust.custname} </option>
                                          )
                                        })} */}
                                        
                                      </AvField>
                                    </FormGroup>
                                  </Col>
                                  
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">
                          description
                            </Label>
                          <AvField
                            name="description"
                            placeholder="Enter description"
                            type="text"
                            value={RenterObj.description}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter description"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </FormGroup>
                      </Col>
                      <Col  md="6" >
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="validationCustom02">
                                      Hometype:
                                      </Label>
                                      <AvField
                                        name="Hometype"
                                        placeholder="Enter your gender"
                                        type="select"
                                        value={RenterObj.Hometype}
                                        onChange={e => hundleChange(e)}
                                        errorMessage="Enter "
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="validationCustom02"
                                      >
                                        <option value="">select Hometype</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Appartment">Appartment </option>
                                        
                                      </AvField>
                                    </FormGroup>
                                  </Col>
                                  <Col  md="6" >
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="validationCustom02">
                                        Priority:
                                      </Label>
                                      <AvField
                                        name="Priority"
                                        placeholder="Enter your priority"
                                        type="select"
                                        value={RenterObj.Priority}
                                        onChange={e => hundleChange(e)}
                                        errorMessage="Enter the priority"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="validationCustom02"
                                      >
                                        <option value="">select priority</option>
                                        <option value="high">high</option>
                                        <option value="medium">medium </option>
                                        <option value="low">low </option>
                                      </AvField>
                                    </FormGroup>
                                  </Col>
                    </Row>
                       
                           </div> 
                          <div className="modal-footer">
                            <button
                              type="button"
                              // onClick={() => {
                              //   tog_standard()
                              // }}
                              onClick={()=>{tog_standard()
                              setRenterObj({description:"",
                              Hometype:"",
                              Priority:"",
                             
                            })
                              
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
                              Save maintainance data
                            </button>
                          </div>
                          </AvForm>  
                        </Modal>
                        
            {/* data table */}
            <Row>
              <Col className="col-10" style={{marginLeft:"16%"}}>
                <Card  style={{background:"#E1DDDB"}}>
                  <CardBody>
                    <Row>
                      <Col className="col-10"></Col>
                      <Col className="col-2 ">
                        <button onClick={()=>tog_standard()}   className="btn mb-2" style={{background:"#0E4A60",color:"#E1DDDB"}}>Add new</button>
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
