import { ProductDetail } from "@/components/services/ProductDetail";
import { pageMeta } from "@/lib/seo";
import { ourProducts } from "@/lib/services";

const product = ourProducts.find((item) => item.id === "fuel-pump-erp")!;

export const metadata = pageMeta({
  title: product.title,
  description: product.summary,
  path: product.href,
});

export default function FuelPumpErpPage() {
  return <ProductDetail product={product} />;
}
