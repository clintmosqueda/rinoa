import { PageGuard } from "@/components/PageGuard"
import { getMenu } from "@/lib/menu"
import { MenuContent } from "@/sections/MenuContent"

const Menu = async () => {
  const menus = await getMenu()
  return (
    <PageGuard>
      <MenuContent data={menus || []} />
    </PageGuard>
  )
}

export default Menu

