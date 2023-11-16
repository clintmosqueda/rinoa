import { PageGuard } from "@/components/PageGuard"
import { MenuContent } from "@/sections/MenuContent"

const Menu = async () => {
  return (
    <PageGuard>
      <MenuContent />
    </PageGuard>
  )
}

export default Menu

