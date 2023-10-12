import { useEffect, useState } from "react";
import SideNav from "../Components/Sidenav"
import {MdAttachMoney} from "react-icons/md"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { BiColumns } from "react-icons/bi";
import Header from "../Components/Header";


function Dashbaord(){
    const [totalTeacher, setTotalTeacher] = useState("")
    const [totalStudents, setTotalStudents] = useState("")
    const [totalSalary, setTotalSalary] = useState(" ")
    const [totalemployee,settotalemployee]= useState(" ")
    const [totalreq,settotalreq]= useState(" ")
    const navigte = useNavigate()


    const admin = localStorage.getItem("admin");

    const protectRoute = () => {
        if(admin){
            navigte("/dashboard")
        }
        else {
            navigte("/")
        }
    }

    useEffect(() => {
        protectRoute()
    },)


   
    const gettotalemployee = () => {
        axios.get("http://localhost:1200/totalemployee").then((response) => {
            settotalemployee(response.data.totalemployee)
        })
    }
    const getTotalTeacher = () => {
        axios.get("http://localhost:1200/teacher/total").then((response) => {
            setTotalTeacher(response.data.totalTeachers)
        })
    }

    const getTotalStudents = () => {
        axios.get("http://localhost:1200/total").then((response) => {
            setTotalStudents(response.data.totalStudents)
        })
    }

    //  const getAllR = () => {
        
    //     axios.get("http://localhost:1200/total/requests").then((response) => {
    //         setTotalSalary(response.data.totalSalary)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }
   
    useEffect(() => {
        
        getTotalTeacher()
       gettotalemployee()
       getTotalStudents()
     
       
    },[])

    return <div>
        <Header/>

        <SideNav />

        <div className="main" > 
        <div className="container " style={{marginLeft:"300px"}}><br/><br/><br/><br/>

            <h1  style={{color:"#0E4A60",marginLeft:"300px"}}>Welcome { JSON.parse(admin).username} </h1> 

            <div className="row my-5">
            
           <div class="card mx-3" style={{width:"18rem"}}>
  <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhYYGBgZHBoaHBwZGiEaHhwaHRwaHBoaGh4cJC4lHCErHxwaJjgmKy80NTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJSs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAEDBAYCBwj/xABDEAACAQIEAwUFBQcBCAIDAAABAhEAAwQSITEFQVEGImFxgRMykaGxQlJywdEHFBZigpLwFSMzU6Ky0uHxQ2MXJML/xAAZAQADAQEBAAAAAAAAAAAAAAAAAgMBBAX/xAAkEQADAAIDAAMBAQADAQAAAAAAAQIDERIhMRMyQVEiBBSRYf/aAAwDAQACEQMRAD8AFcTwX7u6FHbMQSDsRy0inw2Mu3Ctp7rFXZVMgbEjwqnj+IvfdWZVXKpHdJO5nnT4a5kdH3ysrR1ggx8q5KrT68O2IblOl2a3+Ek/4j/AVk2SRlkxPWtWO1q/8Jv7h+lZeaRtfhTGq75FjgvDEe6qElZBMjfQeNaDHdn0S27h3JUTrEfSgfC8V7K4rxmidJjcRRjGdog6Ons4zKROaY+VZtNdi2snJcfAGK7Wo1qQUh0HS1KtRrUy0oHQFOBTV2Kw0QFFeEcOW4GZidDEDymhgFXcDxF7YIULqZ1BPh1p8blVuvCOaaqdT6TcZwSWygSdQZkztFDCKuY7GtdILADKDEeNVWoty6bnw3DNTKVemq7NroPwj6CtDQLs8NPQfQUdrqxfVHFm+7HFIUhSqhIenFNTigB6emFPQAqelSoAVKlSoAVKlSoAamNPTGtAjapE2qN6lTagwelT0qAPOe0+HUYeQqiHXYAdayC1Nex911yu7MN4J0kUQ4dwC5dQOrIASRqTOhjkK5H2ejK4T/pgxakBqzxLhz2GCuQSRIy+cc6rClZVNPtHQroTTLXa1hp0oqQCuQK7UUoDrUyiuUFSKKw0cCugKUU4FYA4FPTrXQoMGNM1PSbagDXcAH0/KjdBuAjQ0aruxfVHm5fsxUqVIU4g9OKYU4oMHFOKYU9AD0qVKgBUqVKgBUqVKtMGpjTmmNAEVyplqG5Uy0AdUqVKgDwc1p+zvH7ViyEuZ82Zj3VkQdazVPmrk2ek5VLTDXaLiiX3RreaFUg5hl1mRvQtaiBrsPSseVxWiYV2pqFXrtWrBiwtPevKilm5D41BcuAKx6A845deVAMejGM4O7MJXXUBgDrJ1IHlTRHJ9k8l8V0ELXGyTKrJA1E6DbVunz3qxb4+phip6QSB5x1Gv+RWZS8xWFUkctp1XKAFM6aR0261AXJYypgaQNY3MV0PDL/Dm+Wv6bvBcTRxr3TMETMesaGiArz6zjsrKUChQToeo/FzrUcE4o9zRhrsT6b/ACqGTDx7RfHl5dMNCnrmRTzUCx1XLU1KaANnwMb0ZoPwPZqL124/qjzcn3Y9KlSqhMenrmnoA6FM7gAkkAASSTAAG5J5Uq83/a1x4oqYRCZce0uRzSYRZ6EhifwjrWpbA67R/tOVGNvCKHI09o/uf0qNW8zA86E4L9quIRgL1q2455cyN5zLD0ivP8vMiANyTqQapMBv1Pwp1KA+juzXazD4wRbJVwJZH0YDqI0YeI9Yo9Xzx2esXUK4hGKMjSDz8Y6jqOcmvQ8d+0J0UQiAgLmLFo15gLynTwipulvSH+Otb0eiUq85w37TAR3ktE/yu4n0KH60+I/agimFw5brNwD6KaNi8Wz0SmNYrhn7R8O5C3Ee3POQ6jziD8jWxsX0dQ6MHVtQymQfIitBy16NcqZaheploFOqVKlQYeQdkMCMTZYuYdHKMMo5AEUc/hdfvD+0UN7BXNb7kgK7ITOgDZQN9tTNbOxdV1zIysp2KkEab6io8JfejpeS5etme/hZeq/20/8ACw6r8K0wroUfHIfNf9Mv/C3ivwpfwuf5fhWpFdCj4pD57/pkr3ZdirAZZIIG+5Fea4yzdtlgSVCNkaOUZgcx5cxB0Ne8isn2l7KLduG6hCO4AMxkNwEBGcRrK5lJ3kL6tMqV0Zzqnpnldkd24w2XVXBmdYAjTXc/GuiCqK6K3u989cxO/MAgQNq0A7GYhrhTKoWQc0AKTpI7u3kepotxfgXslCtadnKg5kAZZGmx21I0Gu1DyL8KrG/0wT4YBYJEgkxOo5k+v5VpOxeEa5dAAYiHMDQcwTO3NdPEVNc4fcVFISSzAGVEpoSJ0gnbTXfwivTeA8Mt2ABbQQyAljGedDBIGoMkxyjxFG+S0xa/xpoEf6G33G+Ncngrfcf4itlSqfwIX/sUYw8Hb7j/ACrj/SG+69beKUUfBP8AWb/2KBvBrbKDmBBopTUpq0ritEarb2ItWR7c8RxNj2N2y5VAWV9ARJgpmB3GhHrWrasp264ZevpbS1B7xLAmIEaNHPp61piW3ozXEP2k4kABLSJpqzyxJ5kLIgfGhyftIxmaS6Efd9mI+k/OoL/Y3GKhLWmYaxlIMeJjWsljsC9okOjLHXStXF/o+mvw9n7K9vExLi3dC23aApBOVjtGvun1rHftcwjDGpc+y9pQPNWefqPjWGwuIIYESD4Uc41xG5iFQXHZ8mYjMSSM5E76xoK1LixeO/AO6gpAmZnT8+lWOCcEu4i4O6QgPebkB0862HAuA4N7aOUzMPe7538hyNaLF31RAllI6BRAFSvPraR0Rg206A/EUS2qW0HgB+tDMRh7dwNbdhnylRG6nWQTtzHwqzxG8bSPcYZrsZUXeCftHyrN8K4e9wwXeCCzuO772pgnfz6/OcL92WyV5KRnFulTB0IMdNtDVpbhEAHU/wCE1BxURdbxM/qfXf1riw+s9BXZ6tnD49F/2jAyCZrVdlO1L2HzKSVkZ05OvNgOTjrWSV9CTUWEvEMCCRWOdjJ/jPpjDYtLqK6MGRhII/zQ+FXVrw/sb2nOEvujkmyzEsPumBDqOvI9R5CivFv2r3DIw9pUAI7z94kcxlGg5c6VSxKWmeu0q8W//K2K+5a/tb/upVvFigDGXijWrJL+yKh2RSDLlmXMfvaKBrtWrwHE/YEubtvunKVBhdYMHTM3npzoHxfBG1i8PnXa0jmdQTmdmHoxj0FH+K8UHsSoVWzsGaQDMRpr5VzW+0d8JOX/AA2fDOIpfTOhkbEcwauish+z+2uS7cVcoLhQo90ZRPd6DvbVrxTrw5bSVaQ4roVyK6FaKdCmuWwylWAIO4NcNdA51Dh7jPccFwFRUIQASc2bvMx5aQAI2O9Y6SGUtnVoIhYAASZ9Y1+lZXtNxW47i1bUiIlx9mdJkVo8WkneN9elZj/WEzOhU7kBxGo8elQ/Tsk54fauXwuEAQICCzrDNAjMzEO3eJiD1M9a31m0EUIogKAB5CsD2W4/h7OcOGAcg5/e01iefPlW3wnEbVz3LiN4A6/A61aNHPm5N/8AwuClSpVQgdUqVKgDmkaVKgw5eYMbxpPXlVDB4ZLTd58125u7nVyNcqjkByUURqvisKHyd5lyurd0xMHZuoIrGuhp+xHe4pbbMiOGZdGCy0Hocu1YHthwRXR7kmQJrY4rg9u80i46ZSC622KgncTHXrQrtHcUg2kGkVJtrs6VKfR5Lwjs9dvh2QjubAzLHnlgQANBJIEkDyjvMY1+6PpW7w99LFtyqk3shRQB3RmPvk9TMQPu+NYrimGZHKkeWs+Y8wZFWmnT7FqVPgUw/aZzcT2xzDLlDABdNNGiJAGs8taM8ZxmKYBcOUS2/dDIczkwSYjfY6KOVef4l+7I3Ug1Lh+JXLTpctuVgGOYAb3hB01oeJb2jPletM1fBOH3LTqL5LLeYKyMDnKkxmkkxqRI6c647RYcYZgiO5mcizoqgDc78wKEYvj928Bncg9YH5a9aa/bRUDllYnnnBjyUCfiaTi09soqlrSAfFJzydyATVe2alxt/O2YCAAAPIVDb3FdM9Sclfbos3W0C9aR0rme95Dauk1YCNWIAHmaDQzjeHXDa9tHdOWdddgJ8poKwj/1XofGxFlba6TE+QGgrI3MONv8mp462ux8s6fQGzeVPVz938KVV2SPU+3/AA4ulu+u9tsreKOVHyYL8TWa4kjQqAa869NxNkOuRhIJGh8DI+YoPjuHIyOyqoOsnbUeVclS29o68VJTplnsfhwmFtiQS2ZjHUk6eggelHBWQ7CYkhbmHY6o5K/hP+A+ta8UxCvszm7cyiage9XWJ1BB2iPjVCzclRO40PmNDUbp70WiVrZKz1XfEhLiXSYUn2b9IY9wnybQfjNc552qtj7Oe06TBZTlPRhqp9CBU0+yjQa4haLrCMBO5nlB2+VAcV2etosl2OkdJJq32b4l7W0hPvaAjow0IPrXfaK/BVeQlj8P/NVcr0nNVviYK9gQCUXZSVHkNKjTDOp7pOlFeG6gsdzr8dasYe1OY0nIvov9nePXxdS27lkY5Tm1InQQd9639eSJicr5xoVdCPNZP6V61acMoYbEAjyImrY3+HLnlJpoeuq5rqqEDmlSpUAKme2GBU6g09cPcAy/zGAfQx9KAQLw9gpKKiogJmEKknlBnXzoHxm8iSBuZmi3E8SzBFR2Gd3TSNlzDTTTUChC9nh7ZszF0BEAnYwDDdTr8xUKk7ItP0C4bClwWI94iJ6DY1nO1eGNu6Q+uYZ1A3hid+moPyr13D8OUtttpXm37RhGLZR9lLYHlBb6sa3EnyMulRgsTO5AA6bmPE1HYIMr6jyqbGHlXC4Q+xW8pkK5R/CQGU+R7w818a6/w536Oi6xXTp1p1uDnUTuWPhQBG1mRNQKveFEL4ygCqY3mtRjR2i6sfTyq9wO2P3i3ILd6TAmBG/kKr4fXN5/kK1fYi4M15MksyaP90DQj1n5UlvUseFukXeJzz22oVew8iRRvHJ3VSZO2tB+NI1kZtwCFP8AUJBFQitdF7jfYJNo0ql9qp509W5EOB7Tg76uqOhlW1B9KGY1/ZOyt7lxT6NH50C/Zkrtad85y58gQ+6CApLefejT/wBG+0aM6a6xS60hpRnOAXcnEIGzqR/yn81FehivKeH3suMsN42wfViD8jXqwrDMnpWxpgVnrOMBdkkd4SPxDRh8IPoaMY/EkMVjQZYO8zMjwO3xrCcfS6L1tbIPtC2ZOWo11nlEz4TUKW60VjqTX8Fvf7R16L9TRlrCP7yjzGh+IoDwZGHeuIEcqMwBzCfA8x+tFxfFWxyuOmSyN8toiw3ZtEZ3tuy52zFWhgCd8sQRO+s1W7Q8HvOWdMpGQqO9B1Ec6JLjAOdDu0vFymGcqYYwoI3BJiR4jf0pnMiqqT2AMJwm8gINtjGkqMw+VNeL20YlHB5Sp/SpeAdrZIS+crbB9gfx9D47eVa44oxPz5VL4k/0r81eNHi9jFM7k6nvFo2j/IFe1WcYiWLWZioZEghc3ITzEVn+2N4PhnWYLFAD4hwwE+Yq7w6yz4CyCO8ttTrvKkiPgK16TBt0lsLHjtjq/wDYP+6nHG7J/wCJ/av/AHVlglT20rVTEcSjTf6ohGgeeUgAT4was4e7nRWGkiY6dR6HSs7aWrJ4ibSEBcxnMBMaE6/80n+oU2/6T47ekX8Riu/7PqjMPMED86G8e4jkS20wrMyz905SyH0ZRQq/xFrrLdUZWSQV/lOhB9QD6VW7WuHwMj7BD/A61m9m8dBmxaIv2EPJr9z+53Yf9QqbDYN7N287vnW6ysqhcuUgFTrJ+zkH9NSEf/sof5CP+mrboWeOVGtm8mi3hH7s6eQ5frXjX7Q+Im5jLgVQoQC2STOYrJLQPEx/TXspgLA00r56vktLMcxJkk6kk6kk+NPKCe9sDYluRYn0rdfs64fZvYfEpcQMGYCTuFy7g8iDrPUVh8WmtazstcWwLquSEa1aYlYJGfKuYeTP8qevqI/QPxnhL4a4bbHMNSjDZl6joeo5HwIJq2AvWj3HuD3rRyvmZN1fUqfH+U+dZ29hzqRqOfhWS9gqIsXezNptVdmrr2R5A062GnXTzqnRr2zvCvuOuvT50b7PYprd4FQdQQ0/d3P0oTbVV13br+lS4QO1xQgJbfTeAJPyBpaW0zZemjU4rFgtnExINC+OsrEBGZs5DuTMSBEDyED0oa2OnT0opwcFpVteYqDnj2Xm+XQOiKVErlrU6UqOQ3E9E7PcOTBJdt53YPcJWVPdgKIJWdYgzA3FVuN4qBKtIMgEGQai4hjibl1UOrWkvIP50GVwfBkgelALXEQ/d3DkMp5gmAQfHY+lPQk+lPEXMt+R9nLHoAfrXsaGQD1rxJrge4WBnMx+tHLvEL337o/qcfnU6etA55fptMaHd7gIUZdEAaHaB72hGUToKDJZyp+9s+eC1tQ8sqLmKvDATJZYzGdB40AXFPB77CdT3jv1psObl2LCM0uYABIAn3j4CJJ9akl2W1pEmP46VYPbdlJkEN31HQqwg/GaYdrLoXvLPKeZ8amxXYrEAnK63ANplT6Dbrzqnd7NYlfetP6EN/0k1RLiJuaWto7/AIv6yPSp+KcQNy1bn7c3IPQd1f8A+6pDgd7lau+qN+YpcQcZyqmVQC2viEGWfUgn1rU9i0tdFNhR3Dcd/dsMmcu3tHfIoE5USAdzoMxrP4h8o2knQDqToBR7jWFbMlsE5bSJb0+8BLn+4n4UVXFdmTPKtFu3jUxaZXDBFIdpgEwDCiDufyopf7UW8LhwivmuFA6wMwEwckToAO6OcDrrWUs8NbQyZ86JDhdy6VyIzxoYUt8YqLpNnR8fWzQ9ncQMRYS8BlLA5l+6wMMNfEfCKMphaj7N8HezbhwFkzlBkg8yY0E6aTRxLddUztb0cF1qtbBos5RJGg1MdK6u2rN1YytsR7+UwYnYidhV67a0g7GgGQqSOYMVlTs2aa7BPaLAjDOj4cZWcNmDsWRvGCdCP1rMXuJ3LiNh7gQFioUps8sBA8RP+RW14lgFvqA5YFfdZTBH61W4bw17JLSrmIDZRmjoZFT259Kf5rzpmgxel5G8xV9NzQR75cjNuDI5VcXGEdKFkkx4qLmJuDUdQR8RrXl3Hb9m3c9lbs20CbsVB5deZPTetbjce77D2a6gs0FyDpKrMDTm3wrHXOCo98L38gIZ7rHKcrQQqkjU7agRDTWN7otE8Z34wTj8GLyv7HDyzES7d0LrrGyr9YnetL2d4H7M+3Fy26pYCNI7uZRObNzAPhyqHFuEzWLgyWVXOiI0hxmKsWeJZlaJFXGy2rFqwrGLzqfEqxza+AXX0oqqS0CiG9+k3GsbdNoIWVPapIOQyVI/F3fHTnXl+MuOjFH3U7Dbzr1O9cZ0uMiZ3uk27Qgf7tB7wzaAe9r1rzLj+Fue2YMhQqApBImd9YPjT4XTfZPLMSuvQecT4Vy16m/dX8PjXS4U8yK6NENkZuVr/wBnmGzXHun7ACjzbU/QVmEwq8yT5V6J2UwC2bbHmxJbwIlY+RqeV6keO6C3ELVog5kQzuSoM/KslhrSLdOQQPl5UavFnJmT4cqr8ZVMPYLnfZAObnWT6A1Bfwv0uyrdsanSlTYa8biK+YjMJjpT0umV2aNBYlnyAGMgMnZtCAJjnVBeA4ZMr53gd4jMpnygCKyicVfNlJgDUzyMx8qivcWZm97uDblXS0cKpm/wHDsMoDW7ap0MAkeMmT86Iu6opYloAn9APM6V5uvaNgyIhGQDXTc0cscYzhVddM6TBnQOppan9NTfht+H2mdAbqBGP2VOfTlqwEH0q2hRO8iKHO+b3o6HpXeG11NLGWw4KgxO5G48jUdtHQpXjJrWLQ6nMCdAuUt9BrVa5isLagXb2Q7y7Nb+WgAoDiUykoVu3CNZLELHLUQPiaAJbt3mK3CM66nOSZHUTPMQfI0yyP8AUK8C/pteLcaw4w1xrN+3cYCBkuByCxgEwxO5ryu44UFjsK1tvgthQ9ruB2CtA5qJjoYk7jYgVju0fD3t6AMUnfePAkcvGKpveiaSnaXYuy1o3sYhbVUm63SE1Uf3Za29uzLFidSST5nU1nuwtkJZu323dhbX8Kd5yPUgelHzjByqGd7ekdGDpNlj91ZSHR08nto6+feH51ds9oMYggjDuo2ARrZ+TMPlQcY+RO3XWrGFti9ot20D0NwEj+ka1OXa6RS1D7oP2u1r/bw0j/67oY/BlX610O1tn7aYpPD2auP+TMarYPhATX2yswnT2ZZfWGBPoRRCziGQ9/Dyo+3aAb4o3fHpmrqnnrs47+JvorjjyXyBYv3V6g4O40/1ZABVjE4RkILNnLazlybeHKr44vayZ84yjQz3SD0ZWgqfA1Cbz3lzjJkGo97MfHUAR4iabeyetdlIW66Fura26ZkoaBMynaXFvZZXWCGERrMjpA6UKs9pWbdHXzE/StZ2gyJZe49v2oQFsmYpMb6rrtNedP2qtuy5LCIvNQzMT6sTrXPcNvaR2YrWkmF34yHlZykad7Q/A61FxXFxZTK0ypB/uYfkPhUuHTD4lYBBPQ6OvlP/AKoXxfhV62Cc2dNO8BqAOTAbfSjHrf8ADMu9dFTH4mVt5jqGuk+IfJp/ytXOBxjPiLKl2IVgiljJVD3NJ5xmpXbYKBm1HIem/wBKo4JovKRyYR6EV0aWjnVNeHrvB+Dmwc7uHKJ7NDEBUGp33YwCT4CvKeJ3va3HuffZm1/mYn869a7XYr2eGusNCVyDzfu/nXkiYVm20HUkL8zTY9JbEpunsGuhFc2LLO4RBLMYAmjFrgTu4tnKGZC6ktmUgGN1nnR7gvB1sqWlXYN3gFgiB7syToYYRvPiK2sspdBONt9k3COAjDLmKB7vN+S+CA/XerOA/wDkB0zOWgjYkDMPVpPrVrEYvMO4w151Rw19g8OZJ9NOVcrp12zpUpLSJ7VqDA571S4k6Yi8+GYZkt2wW8HLCNtQQOnWidxwmZ2PdVSx9BWd7DXTcOIvt7zuJ8gJj500L1iZK0tBHD4LKoUKIAjn+tNRmVH2qVHQv+znFdj8NcKWygQurS6CGka78/Wsjf7CQ7ILyQrFSSGBHMaDTavRcdfh1YfYcH0Ig0N4qkveC/bXOv4k1+lVexJZlMN2Btq6l8RKjcKsE+HeJAFaB+zuDtKblpCzplaHdjGuhAmDQs8R03qG7xMmY5rlPjrS7Y2uzVHisiARsPSaa5xsImu/+bV5/e4s6sVVSzDST8jU9ziJFtGdgrjeASBJ0OnPwrKnaGmtMm452nd2CoQADDN016H118K4Xg/tV9r7VhcP2SYUSM2VY3mNZqLhuEw1xy7OX+8mVlzEmB3yNNelSm4UCMqFAFZgHH3VZZHUbUjfHpBkyUTYDFBwtp2yOp/2T/cb7jdUO3y6UXxAe/adBCYhNGUgEN5SPdbk1CcOtjKC1q+xjWIgyJI223ota4spK5cNcLquRHciY6M2aSPOaflP6zOFfiKF6z7JLVmIKIMwH3377/UD0qERV25hLruzkDvEk6zvyqzgeBvcbKGQH+YhfQTvUXSbOuZ4z2C8oNcmwDoQD561t7XYRol7ij8Kl/0q/Z7KYZfeLufgD8B+dMsdP8J1mif0wlk3EEo7p4BiB/bOX5Ub4dxLGGMv+0/Fbn5plrbYbhVhNEtKPEifmaupb8KpOOl6yNZofiMseHviVjE4S2wH3nVjPgrLp8aGnhYw3+5OIwyyCUyu9skH/wCssqzz1A61vf3YbkU3sYGjEeetVS60Rdd71/4ULJDoGGoIBBFcutXrqUNxF4CsfQLsgxKAqQdjpXjnFcdicPcZGzqoYhWIEMAdCCRrpXrzvNZrtJdtJAvZSj8mUsCRvy05VF135s6ITX7o88TtJiOV0/BfrFWcP2oxCiC4YfzKDUXE8Jhc3+xd1n7OXMvoSQR864wXCFZgWzlfICt1OvBlyf6ctxgk94LlnYKAB5AVM2IUaj5VPjeGW2EBcsbFRB9etC3wbouhzido1A/OtTlhU0i4/EWcTnZvBmJ+tRm+WAUbnbzFBLlzXQweYqWxiypB3ImPM86fiT5GiXiAt2kdjDqZX+ZCYZfh/wBIonjOKKAHR9WGYqNyDs3yiOg8Kw6MXclj9k+ld2L5DWzOwynyDGs4IOYUxnF8zkq2XxXn4kbT5UT4Rii6yXLEHc77DShmA4K+KdmsoMoPeLNCgnbqZ8hVvhls2yyGJDctRsOtFStBNPkXu1nEiMOFBhnOU+Q3rjspifZYV2AljcyoPvMQoUfGgnaG6XvKg1yKBH8za/pWn4FhBnC/Ywwj8V5xLt/SNPWs+sg/9UH7FgBQG7zcz1PP509BMZxaHYDrSqWmV6NriE7xoTxfFezTPuRI9GBX86hwPG/3hS6QonUMdR6c6E8SR8QzIGKBY5atM6+G1WqlK2zniXVaRmnxYUamPOq3+qSYUE+VF/4WQGWYt50Qw3A0QiBUnmleHSsFP0B2bN+4JAyj4miOG4AAAzlmP8x/KtThcKu0R+tX/YKRtXPWemXnFMmbWyltcxIRZiT16Dqay3FsSzXEzHQdwzsQp3+Br1XhSoVe06BxOaGAI+dAO0OCwy6iygI1HdojLKfaFy4Hka49EHCMQjIuVkYqBOTYRV22nLfWPDkJ+FCeCGSzwAu0AR9KNACJmJpa9Ka0tDGwvIflXYB2Hz1+tSkDr/hrlrijal2aWMNirqe7cceGYx8DpRWxx+8vvhXHiIPxH6UDTEU7XzTzdz4xKxxXqNhhOP2j7yFD/cPjvRD/AFK1E+0QDxMfWsHbu1aR6qv+RX6Qr/jz+dGpbjdoe6Wf8I/Noqq/HyfdQD8Rn5D9aA5iNjXTbTzoeen4CwSvS5jOIXLilS5UH7nd+e9CjjHQw4zKPtKNh1YD6j5VMmKHQ1OjZtxSO69bHUT5o7s3QwDKQR1FAe3mB9phGKjvWyHHkNG+RohcwmUlrbZDzH2T5j8xSXGBpt3RkLArr7rTp3T+VPGRbErH0eKoSD3iRFafg/EMMDD5lPUkx/4qhxTsxeRmnVGZsjExOUxVNeDvGrIvmwrqaml6SmqnxG+w/C0dcwYQdjMzULcJE5ayGEu3LGgvJHTNp8KIr2jgauM3PmPlUHDXnZ0TlT96CuO4KVGaAfTWgeI4Gh1AK+W3wrte0cEd8t/SY+dFrPGEYd4A+Iplykx8aAOH7Mu0kOABtpv51UxnZ3EpJADD+U/ka37Qnry9KiN4zMaTBBoWWiTxyP2NwnsMKobR2LOw5jkAf6VWsxiLgF1vBLTH1toxrU3LUiUMEa5aguLbdhmRTOjaaxtW/Jv1GLHrxmN4Eme895tlYt6jatBwtow6sSRnLufNiT9Kv2eHW0V7aoI11XRgSNJ61Q4LdJsFG2U5QOn3fpFFVyCZ4+hXh2Mw/s1kGY1kDeTSoKuHsNrmInl0p6TSHOuzbN7EZWjvNykcqLYK8zXDnAnJuOeUz+ZpUqpm+rI4Pui61sZjPpT2dgaalXn/AIemdo5Bq97eIVtPnNKlWfoMktXAt1TJg6GhHa9wFJpUqWfsh48M3gMYQgUDqavWMQx3pUq62jm2EEJI3qygpqVRZQvcMwRuXVSYBOp8OcUfbsuBtdPqs/SlSrpw45a7OPNlqX0zk9lW5XF/tP60v4Zcf/IvwNPSqvwx/CXzX/R/9Au9U+J/SozwO/yy/wB3/ilSpPikf5aObnA724Cz+KquItPbOV4BgHQzpSpVPJCS6Hx22+yu9/1rh++CDGvUSJpUqgXZl+J8HUxMmJ+0YE66AnSquH4XZ2KCfjNKlTc60PMosNwK2Roqj02qjd4MqcgRSpVk5K2M4kiucMXcARUFvCLnWZABBMdAdaVKrqmTqVo1nDMZae8vtZya7Tv9mY1itE3BMLflrbuJM89+pDClSp14ct9MDcQwfsrhWc0AGdjryNCMRcyuG60qVL+jrw5a6VfOKrcWuLbRmQf70qfwspkx50qVNPpj8M/imh2g85+Ov50qVKqCH//Z" style={{height:"250px"}}alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Total employee</h5>
    <p class="card-text"> {totalemployee}</p>
    <a href="employee" class="btn btn-primary" style={{width:"100%",backgroundColor:"#0E4A60",color:"#E1DDDB"}}>Employee List</a>
  </div>
            </div>
           <div class="card mx-3" style={{width:"18rem"}}>
  <img src="data:image/jpeg;base64,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" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Rental Homes</h5>
    <p class="card-text"> {totalTeacher}</p>
    <a href="property" class="btn btn-primary "style={{width:"100%",backgroundColor:"#0E4A60",color:"#E1DDDB"}} >Rental Homes</a>
  </div>
            </div>
           <div class="card mx-3" style={{width:"18rem"}}>
  <img src="data:image/jpeg;base64,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"style={{height:"250px"}} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title"> Properties</h5>
    <p class="card-text"> {totalStudents}</p>
    <a href="rental" class="btn btn-primary"style={{width:"100%",backgroundColor:"#0E4A60",color:"#E1DDDB"}}>Properties List</a>
  </div>
            </div>
       
            </div>
            <br>
            </br>


            {/* <div className="row ">
            
           <div class="card mx-3" style={{width:"18rem"}}>
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Total employee</h5>
    <p class="card-text"> {totalSalary}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
            </div>
           <div class="card mx-3" style={{width:"18rem"}}>
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Total properties</h5>
    <p class="card-text"> {totalTeacher}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
            </div>
           <div class="card mx-3" style={{width:"18rem"}}>
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Total properties</h5>
    <p class="card-text"> {totalStudents}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
            </div>
       
            </div> */}


            

        
        </div>
    </div>
    </div>

    
}

export default Dashbaord;