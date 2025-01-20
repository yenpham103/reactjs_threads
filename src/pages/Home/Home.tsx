import { RootState } from '@/stores/store';
import { useSelector } from 'react-redux'

export default function Home() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  console.log(isAuth);
  return (
    <h1>{isAuth ? "Da Login" : "Chua Login"}</h1>
  )
}
