import useUsers from "@/hooks/user/use-users"
import { UserComponent } from "./user"

export const RecentChats = () => {
  const { users } = useUsers()

  return <>{users?.map(user =>
    <UserComponent user={user} key={user.id} withDetails />)}


  </>
}