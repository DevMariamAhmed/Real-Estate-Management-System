import React,{useState,useEffect} from "react"
import MetaTags from 'react-meta-tags';
import axios from "axios";
// import { Col, Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import DataTable from "react-data-table-component";
import { object } from "prop-types";
import { MDBDataTable } from "mdbreact";
import {AiOutlineDelete} from 'react-icons/ai'
import {BiSolidPencil} from 'react-icons/bi'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle ,Modal,FormGroup,Label, Toast} from "reactstrap"
// import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Sidenav from "../Components/Sidenav";
import Header from "../Components/Header";
import { ToastContainer, toast } from 'react-toastify';
let endPoint="http://localhost:1200/receipt"  

function Receipts(){
    const[menu,setmenu]=useState(false);
    const toggle = () => {setmenu(!menu)};
    const[isopen ,setisopen]=useState(false);
    const[isEdit,setisEdit]=useState(false);
    const [receiptData,SetreceiptData] = useState([]);
    const[receiptObj,setreceiptObj]=useState({
      Name:"",
      Receiptamount:"",
      Receiptstatus:"",
      Phonepaid:"",
      Paiddate:"",
     
    })
    // useEffect(()=>{
    //     async function onload() {
          
    //     let {data}=await axios.get('http://localhost:1200/receipt')
    //    SetreceiptData(data)
    //     // console.log("data loaded",data)
    //     }
    //     onload()
        
    // })
    const getalldata = () => {
        
        axios.get(endPoint).then((response) => {
            SetreceiptData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    
  
    useEffect(() => {
        getalldata()
  
    }, [])


    const deletedata = (id)=> {
        axios.delete(`http://localhost:1200/receipt/${id}`).then((response) => {
          getalldata()
        
        
        alert("deleted employee")
        }).catch((error) => {
            console.log(error)
        })
    }
    const hundleEdit=data=>{
      setisopen(true)
      setreceiptObj(data)
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
        label: "Receiptamount",
        field: "Receiptamount",
        sort: "asc",
        width: 270,
      },
     
      {
        label: "Receiptstatus",
        field: "Receiptstatus",
        sort: "asc",
        width: 100,
      },
      {
        label: "Phonepaide",
        field: "Phonepaid",
        sort: "asc",
        width: 100,
      },
      {
        label: "paid date",
        field: "Paiddate",
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
        rows: receiptData?.map(data => {
            data . actions=(
                <div >
                    <button onClick={()=>hundleEdit(data)} className="btn  mx-2" style={{background:"#E1DDDB"}}>
                        <i className="dripicons-pencil"></i><BiSolidPencil/></button>
                        <button onClick={()=>deletedata(data)} className="btn btn-danger ">
                        <i className="dripicons-trash"></i> <AiOutlineDelete/> </button>
                </div>
            )
            // data.Name
            // data.Receiptamount
            // data.updatedAt
            // data.Paiddate

            
                return data
            
            })
            
    }

    const tog_standard=()=>{
      setisopen(!isopen)
    }
    const hundleChange=(e)=>{
      // console.log(e.target.value)
      setreceiptObj({...receiptObj,[e.target.name]:e.target.value})
    }
  
    const handleSubmit = async (e) => {
      console.log(receiptObj)
      try {
        if (isEdit) {
          let mainobj={
            Name:receiptObj.Name,
            Receiptamount:receiptObj.Receiptamount,
            Receiptstatus:receiptObj.Receiptstatus,
            Phonepaid:receiptObj.Phonepaid,
            Paiddate:receiptObj.Paiddate,
          

          }
          let updatedIdEndpoint = `${endPoint}/${receiptObj._id}`
          console.log("updatedIdEndpoint",updatedIdEndpoint, receiptObj)
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

          let { data } = await axios.post(endPoint, receiptObj)
          console.log(receiptObj)
          if (data.status == "success") {
              toast.success(data.messsage)
              setreceiptObj({Name:"",
              Receiptamount:"",
              Receiptstatus:"",
              phonepaid:"",
              Paiddate:"",

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
     return(
        <React.Fragment>
            <Sidenav/>
            <Header/>
        <div className="page-content">
          <MetaTags>
              </MetaTags>
          <div className="container-fluid ">
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col xl={4} md={8}style={{ marginTop:"80px"}}>
                <h6 className="page-title">REM</h6>
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
                             Receiption
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
                            value={receiptObj.Name}
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
                            Receiptamount
                            </Label>
                          <AvField
                            name="Receiptamount"
                            placeholder="enter Receiptamount"
                            type="text"
                            value={receiptObj.Receiptamount}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter Receiptamount"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="12" md="6" lg="12">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="validationCustom02">
                                      Receipt status:
                                      </Label>
                                      <AvField
                                        name="Receiptstatus"
                                        placeholder="Enter your Receiptstatus"
                                        type="select"
                                        value={receiptObj.Receiptstatus}
                                        onChange={e => hundleChange(e)}
                                        errorMessage="Enter your Receipt status"
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="validationCustom02"
                                      >
                                        <option value="">select Receipt status</option>
                                     
                                        <option value="partiallypaid">partially paid</option>
                                        <option value="fullypaid">fully paid</option>
                                      </AvField>
                                    </FormGroup>
                                  </Col>
                      {/* <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">
                           Receipt Status
                            </Label>
                          <AvField
                            name="Receiptstatus"
                            placeholder="Enter receipt status"
                            type="select"
                            value={receiptObj.Receiptstatus}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter phone paid"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                          
                          <option value="">select status </option>
                          <option value="paid">paid </option>
                          <option value="partially paid ">partially paid </option>
                          <option value="Fully paid">Fully paid</option>
                        </FormGroup>
                      </Col> */}
                      
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">
                           Phone paid
                            </Label>
                          <AvField
                            name="Phonepaid"
                            placeholder="Enter Phonepaid"
                            type="text"
                            value={receiptObj.Phonepaid}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter Phonepaid"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">
                           paid date
                            </Label>
                          <AvField
                            name="Paiddate"
                            placeholder="Enter Paiddate"
                            type="datetime-local"
                            value={receiptObj.Paiddate}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter Paid date"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </FormGroup>
                      </Col>
                    
                      {/* <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Owner name
                            </Label>
                          <AvField
                            name="Paiddate"
                            placeholder="enter owner name"
                            type="text"
                            value={receiptObj.Paiddate}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter owner name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom04">
                            updatedAt
                            </Label>
                          <AvField
                            name="updatedAt"
                            placeholder="enter owner number"
                            type="text"
                            value={receiptObj.updatedAt}
                            onChange={(e)=>hundleChange(e)}
                            errorMessage="Enter owner number"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
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
                              setreceiptObj({Name:"",
                              Receiptamount:"",
                              Receiptstatus:"",
                              Phonepaid:"",
                              Paiddate:""
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
                              Save receipts
                            </button>
                          </div>
                          </AvForm>  
                        </Modal>
                        
            {/* data table */}
            <Row>
              <Col className="col-10"style={{marginLeft:"16%"}}>
                <Card>
                  <CardBody  style={{background:"#E1DDDB"}}>
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
        
        // <div className="container mt-5">
        //     <table className="table">
        //         <thead>
        //             <tr>
        //             {columns.map((c,i)=>(
        //                 <th key={i}>{c}</th>

        //             ))}
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {
        //                 record.map((d,i) => (
        //                     <tr key={i}>
        //                         <td>{d.Name}</td>
        //                         <td>{d.Receiptamount}</td>
        //                         <td>{d.Paiddate}</td>
        //                         <td>{d.updatedAt}</td>

        //                     </tr>
                            
        //                 ))

        //            }
        //             </tbody>
        //     </table>
        //     </div>
    )
}
export default Receipts



