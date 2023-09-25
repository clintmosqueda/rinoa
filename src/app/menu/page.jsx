import { getMenu } from "@/lib/menu"
import { MenuContent } from "@/sections/MenuContent"

const Menu = async () => {
  const menus = await getMenu()
  return (
    <MenuContent data={menus} />
  )
}

export default Menu

