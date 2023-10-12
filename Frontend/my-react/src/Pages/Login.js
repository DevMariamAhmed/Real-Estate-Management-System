import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Container,Card, CardBody, CardTitle, CardSubtitle ,Modal,FormGroup,Label, Toast} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import MetaTags from 'react-meta-tags';
import { ToastContainer, toast } from 'react-toastify';
import logoSm from "../assets/images/icon.PNG";
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
export default function Login() {
  const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const login = (event) => {
        event.preventDefault()
        axios.post("http://localhost:1200/admin/login", {
           username: username,
           password: password 
        }).then((response) => {

           if(response.data.username ){
            //store admin data in localStorage
            localStorage.setItem("admin", JSON.stringify(response.data) )
            navigate("/dashboard")
           }
else if(username==="" || password===""){
  alert("empty")
}
           else {
            alert("username or password incorrect!")
           }
        }).catch((error) => {
            console.log(error)
        })

    }
  return (
    <React.Fragment >
      <div className="bg-image"style={{backgroundImage: "url(https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=400)"}} >
        {/* className= "" */}

      <MetaTags>
      <title>Login</title>
    </MetaTags>
    <div className="home-btn d-none d-sm-block">
      <Link to="/" className="text-dark">
        <i className="fas fa-home h2" />
      </Link>
      <ToastContainer/>
    </div>
    <div className="account-pages my-3  pt-sm-5" style={{marginLeft:"-30%"}}>
      <Container >
        <Row className="" >
          
          <Col className='col-6'>
                        {/* <img src={home}>
                        </img> */}
                      
          </Col>
          <Col md={8} lg={6} xl={4}>
            <Card className="overflow-hidden">
              <div className="" style={{background:"#0E4A60"}}>
                <div className="text-primary text-center p-4">
                  <h5 className="text-white font-size-20">
                    Welcome Back !
                      </h5>
                  <p className="text-white-50">
                    Sign in to continue our Real State management System.
                      </p>
                  <Link to="/" className="logo logo-admin">
                    <img src={logoSm} height="24" alt="logo" />
                  </Link>
                </div>
              </div>

              <CardBody className="p-4">
                <div className="p-3">
                  <AvForm
                    className="form-horizontal mt-4"
                  >
                   
                    <div className="mb-3">
                      <AvField
                        name="username"
                        label="username"
                        id="username"
                        className="form-control"
                        placeholder="Enter username"
                        type="text"
                        required
                        value={username} onChange={(event) => {
                          setUsername(event.target.value)
                        }
                      }
                        
                      />
                    </div>

                    <div className="mb-3">
                      <AvField
                        name="password"
                        label="Password"
                       
                        type="password"
                        required
                        placeholder="Enter Password"
                        value={password} onChange={(event) => {
                          setPassword(event.target.value)
                        }}
                      />
                    </div>

                    <Row className="mb-3">
                      
                      <Col sm={6}>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="customControlInline" />
                          <label className="form-check-label" htmlFor="customControlInline">Remember me</label>
                        </div>
                      </Col>
                      <Col sm={6} className="text-end">
                        <button
                          className="btn w-md waves-effect waves-light text-white"  style={{background:"#0E4A60"}}
                          type="submit"
                          onClick={login}
                        >
                          Log In
                            </button>
                      </Col>
                    </Row>
                    <Row className="mt-2 mb-0 row">
                      <div className="col-12 mt-4">
                        <Link to="/forgot-password"  style={{color:"#0E4A60"}}>
                          <i className="mdi mdi-lock"></i> Forgot your
                              password?
                            </Link>
                      </div>
                    </Row>
                    
                  </AvForm>
                </div>
              </CardBody>
            </Card>
            
          </Col>
        </Row>
      </Container>
    </div>

        </div>
      
    
  </React.Fragment>
  )
}
