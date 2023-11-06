import { PageGuard } from "@/components/PageGuard"
import { getProduct } from "@/lib/product"
import { ProductContent } from "@/sections/ProductContent"

const Product = async () => {
  const product = await getProduct()
  return (
    <PageGuard>
      <ProductContent data={product || []} />
    </PageGuard>
  )
}

export default Product