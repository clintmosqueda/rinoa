import { getServices } from "@/lib/services"
import { MenuContent } from "@/sections/MenuContent"

const Menu = async () => {
  const services = await getServices()
  return (
    <MenuContent data={services} />
  )
}

export default Menu

