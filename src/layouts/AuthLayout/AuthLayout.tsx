import { Link, Outlet } from "react-router-dom";
import authBg from "./images/bg_login.avif"

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center bg-no-repeat justify-center bg-[length:100%] lg:bg-[length:120%] lg:bg-[center_0%]" style={{
      backgroundImage: `url(${authBg})`,
    }}>
      <div className='w-[418px] mx-auto px-6 pt-[15vh]' >
        <Outlet />
      </div>
      <ul className="flex gap-4 justify-center absolute bottom-4 left-0 right-0">
        <li>© 2025</li>
        <li>
          <Link className="hover:underline" to="#">Threads Terms</Link>
        </li>
        <li>
          <Link className="hover:underline" to="#">Privacy Policy</Link>
        </li>
        <li>
          <Link className="hover:underline" to="#">Cookies Policy</Link>
        </li>
      </ul>
    </div>
  )
}
