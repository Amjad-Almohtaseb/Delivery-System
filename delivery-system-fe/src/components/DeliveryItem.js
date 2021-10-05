import { useQueryClient, useMutation } from "react-query";
import instance from "../instance";
function DeliveryItem({ delivery }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (updatedDelivery) =>
      instance
        .put(`/deliveries/${updatedDelivery.deliveryId}`, updatedDelivery, {
          headers: { "x-api-key": "123456789" },
        })
        .then((res) => res.data),
    {
      onMutate: (mutateData) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        queryClient.cancelQueries("deliveries", { exact: true });
        // Snapshot the previous value
        const previousDeliveries = queryClient.getQueryData("deliveries");
        // Optimistically update to the new value
        queryClient.setQueryData("deliveries", (previousDeliveries) =>
          previousDeliveries.map((oldDelivery) =>
            oldDelivery.id === mutateData.deliveryId
              ? { ...oldDelivery, status: mutateData.status }
              : oldDelivery
          )
        );
        //Return a context object with the snapshotted value
        return { previousDeliveries };
      },
      onError: (rollback) => rollback(),
    }
  );

  return (
    <>
      <td>{delivery.name}</td>
      <td>{delivery.address}</td>

      {delivery.status !== "delivered" ? (
        <td>
          {delivery.status === "delivering" ? (
            <button
              onClick={() =>
                mutate({ deliveryId: delivery.id, status: "delivered" })
              }
              type="button"
              className="btn btn-success"
            >
              <span> Delivered</span>
            </button>
          ) : (
            <button
              onClick={() =>
                mutate({ deliveryId: delivery.id, status: "delivering" })
              }
              type="button"
              className="btn btn-primary"
            >
              <span> Pick for delivery</span>
            </button>
          )}
        </td>
      ) : (
        <td></td>
      )}
    </>
  );
}

export default DeliveryItem;
