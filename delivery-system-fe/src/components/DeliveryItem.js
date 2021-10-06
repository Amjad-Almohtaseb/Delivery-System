import instance from "../instance";
import { useQueryClient, useMutation } from "react-query";

function DeliveryItem({ delivery }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (updatedDelivery) =>
      instance.put(
        `/deliveries/${updatedDelivery.deliveryId}`,
        updatedDelivery,
        {
          headers: { "x-api-key": "123456789" },
        }
      ),

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

        //Return the snapshotted value
        return () => queryClient.setQueryData("deliveries", previousDeliveries);
      },

      onError: (error, delivery, rollback) => {
        console.log(error);
        if (rollback) rollback();
      },
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
              className="btn btn-success"
              type="button"
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
