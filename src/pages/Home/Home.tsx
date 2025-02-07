import { RootState } from '@/stores/store';
import { useSelector } from 'react-redux'

export default function Home() {
  const { isAuth, user, isLoading } = useSelector((state: RootState) => state.auth);
  if (isLoading) return <h1>Loading...</h1>
  return (
    <>
      <h1>{isAuth ? "Da Login" : "Chua Login"}</h1>
      <h1>Hello: {user?.name}</h1>
    </>
  )
}
