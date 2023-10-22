import { getMerch } from "@/lib/merch"
import { MerchContent } from "@/sections/MerchContent"

const Merchandise = async () => {
  const merch = await getMerch()
  return (
    <MerchContent data={merch || []} />
  )
}

export default Merchandise