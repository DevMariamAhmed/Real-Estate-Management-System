import React,{useState,useEffect} from "react"
import MetaTags from 'react-meta-tags';
import axios from "axios";
import { mutate } from "swr";
import {useParams,useNavigate } from "react-router-dom";
// import { Col, Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import DataTable from "react-data-table-component";
import { object } from "prop-types";
import {AiOutlineDelete} from 'react-icons/ai'
import {BiSolidPencil} from 'react-icons/bi'
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle ,Modal,FormGroup,Label, Toast} from "reactstrap"
// import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AvForm, AvField } from "availity-reactstrap-validation"
import { ToastContainer, toast } from 'react-toastify';
import Header from "../Components/Header";
import Sidenav from "../Components/Sidenav";
let endPoint="http://localhost:1200/employee"


export default function Employee() {
    const[menu,setmenu]=useState(false);
    const toggle = () => {setmenu(!menu)};
    const[isopen ,setisopen]=useState(false);
    const[isEdit,setisEdit]=useState(false);
    const [RenterData,SetRenterData] = useState([]);
    const[RenterObj,setRenterObj]=useState({
        Name:"",
        Gender:"",
        Address:""
       
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
          
    //     let {data}=await axios.get('http://localhost:1200/property')
    //    SetRenterData(data)
    //     // console.log("data loaded",data)
    //     }
    //     onload()
        
    // })
    const deletedata = (id)=> {
      axios.delete(`http://localhost:1200/employee/${id}`).then((response) => {
        getalldata()
      
      
      alert("deleted employee")
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
        label: "Name",
        field: "Name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Gender",
        field: "Gender",
        sort: "asc",
        width: 270,
      },
      {
        label: "Address",
        field: "Address",
        sort: "asc",
        width: 200,
      },{
        label: "actions",
        field: "actions",
        sort: "asc",
        width: 200
      }
      // {
      //
        
    
    ],
        rows: RenterData?.map(data => {
            data . actions=(
                <div >
                    <button onClick={()=>hundleEdit(data)} className="btn  mx-2" style={{background:"#E1DDDB"}}>
                        <i className="dripicons-pencil"></i><BiSolidPencil/> </button>
                        <button onClick={()=>deletedata(data)} className="btn btn-danger ">
                        <i className="dripicons-trash"><AiOutlineDelete/></i> </button>
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
            
            
            Name:RenterObj.Name,
            Gender:RenterObj.Gender,


            Address:RenterObj.Address,
           
            
          

          }
          let updatedIdEndpoint = `${endPoint}/${RenterObj._id}`
          console.log("updatedIdEndpoint",updatedIdEndpoint)
          // //put editing data
          const {data} = await axios.put(updatedIdEndpoint, mainobj)
          if (data.status == "success") {
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
            
              setRenterObj({Name:"",
              Gender:"",
              Address:""
              
             
            
            })
            
           

            
              
              // setisEdit(false)
              
             
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
  //   axios.put(`http://localhost:1200/property/${params.id}`, {
  //       "Name": title,
  //       "Name": Name
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
                      Employee 
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
                     name="Name"
                     placeholder="Enter Name"
                     type="text"
                     value={RenterObj.Name}
                     onChange={(e)=>hundleChange(e)}
                     errorMessage="Enter Name"
                     className="form-control"
                     validate={{ required: { value: true } }}
                     id="validationCustom01"
                   />
                 </FormGroup>
               </Col>
               {/* <Col  md="6" >
                             <FormGroup className="mb-3">
                               <Label htmlFor="validationCustom02">
                               Gender:
                               </Label>
                               <AvField
                                 name="status"
                                 placeholder="Enter your Gender"
                                 type="text"
                                 value={RenterObj.Gender}
                                 onChange={e => hundleChange(e)}
                                 errorMessage="Enter  Gender"
                                 className="form-control"
                                 validate={{ required: { value: true } }}
                                 id="validationCustom02"
                               >
                                 
                               </AvField>
                             </FormGroup>
               </Col> */}
              <Col sm="12" md="6" lg="12">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="validationCustom02">
                                        Gender:
                                      </Label>
                                      <AvField
                                        name="Gender"
                                        placeholder="Enter your gender"
                                        type="select"
                                        value={RenterObj.Gender}
                                        onChange={e => hundleChange(e)}
                                        errorMessage="Enter your gender"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="validationCustom02"
                                      >
                                        <option value="">select gender</option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                      </AvField>
                                    </FormGroup>
                                  </Col>
               <Col  md="6" >
                             <FormGroup className="mb-3">
                               <Label htmlFor="validationCustom02">
                               Address:
                               </Label>
                               <AvField
                                 name="Address"
                                 placeholder="Enter your Address"
                                 type="text"
                                 value={RenterObj.Address}
                                 onChange={e => hundleChange(e)}
                                 errorMessage="Enter the Address"
                                 className="form-control"
                                 validate={{ required: { value: true } }}
                                 id="validationCustom02"
                               >
                               
                               </AvField>
                             </FormGroup>
                           </Col>
                           {/*  */}
                 
              
               
               {/* <Col md="6">
                 <FormGroup className="mb-3">
                   <Label htmlFor="validationCustom01">
                   Name
                     </Label>
                   <AvField
                     name="Name"
                     placeholder="Enter Name"
                     type="text"
                     value={RenterObj.Name}
                     onChange={(e)=>hundleChange(e)}
                     errorMessage="Enter Name"
                     className="form-control"
                     validate={{ required: { value: true } }}
                     id="validationCustom01"
                   />
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
                       setRenterObj({Name:"",
                       Gender:"",
                       Address:"",
                       
                      
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
                       Save  data
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
                 <button onClick={()=>tog_standard()}className="btn mb-2" style={{background:"#0E4A60",color:"#E1DDDB"}}>Add new</button>
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
