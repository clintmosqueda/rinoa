import { ProfitContent } from "@/sections/ProfitContent"
import { PageGuard } from "@/components/PageGuard"

const Profit = () => {
  return (
    <PageGuard>
      <ProfitContent />
    </PageGuard>
  )
}

export default Profit