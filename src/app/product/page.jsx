import { getProduct } from "@/lib/product"
import { ProductContent } from "@/sections/ProductContent"

const Product = async () => {
  const product = await getProduct()
  return (
    <ProductContent data={product || []} />
  )
}

export default Product