import { Link } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    return (
        <>
            <div className="bg-gray-200">
                <div className="p-4 flex" >
                    <div className="basis-1/2 font-medium text-2xl text-blue-600 font-serif">
                        Claim Test
                    </div>
                    <div className="basis-1/2 flex justify-end gap-10 px-15">
                        <button onClick={() => navigate("/")}>
                            <Link className='text-primary' underline={pathname == "/" ? "always" : "none"} color={pathname == "/" ? "primary" : "inherit"} >
                                Home
                            </Link>
                        </button>
                        <button onClick={() => navigate("/list")}>
                            <Link className='text-primary' underline={pathname == "/list" ? "always" : "none"} color={pathname == "/list" ? "primary" : "inherit"} >
                                List
                            </Link>
                        </button>
                        {/* <Link to={"/"}>
                            <Button color="primary" variant="outlined" >
                                Add
                            </Button>
                        </Link>
                        <Link to={"/list"}>
                            <Button color="primary" variant="text">
                                List
                            </Button>
                        </Link> */}
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Navbar
