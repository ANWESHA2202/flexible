import { getCurrentUser } from "@/lib/session"

const Project = async() => {
    const session=await getCurrentUser();
  return (
    <div>page</div>
  )
}

export default Project