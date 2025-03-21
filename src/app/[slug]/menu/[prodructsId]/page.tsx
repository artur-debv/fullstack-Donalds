import { db } from "@/lib/prisma";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-details";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { slug: string; productId: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = params;
  const product = await db.product.findFirst({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
    },
  });

  console.log("Produto:", product); // Verifique os dados retornados aqui

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
