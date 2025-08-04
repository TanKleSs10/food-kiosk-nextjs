import { OrderWithProducts } from "@/src/types";

type latestOrderItemProps = {
  order: OrderWithProducts;
};

export default function LatestOrderItem({ order }: latestOrderItemProps) {
  return (
    <div className="bg-white shadow p-5 space-5 rounded-lg">
      <p className="text-lg font-bold text-slate-600">Cliente: {order.name}</p>
      <ul
        role="list"
        className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-600"
      >
        {order.orderProducts.map((product) => (
          <li key={order.id} className="flex py-6 text-lg">
            <p>
              {product.product.name} <span>({product.quantity})</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
