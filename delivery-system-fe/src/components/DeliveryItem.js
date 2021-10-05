import { useQueryClient, useMutation } from "react-query";
import instance from "../instance";
function DeliveryItem({ deliveries, delivery }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (updatedDelivery) =>
      await instance
        .put(`/deliveries/${updatedDelivery.deliveryId}`, updatedDelivery, {
          headers: { "x-api-key": "123456789" },
        })
        .then((res) => res.data),

    {
      onSuccess: (data) => console.log(data, 4),
      // When mutate is called:
      onMutate: async (mutateData) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries("deliveries", { exact: true });
        // Snapshot the previous value
        const previousDeliveries = queryClient.getQueryData("deliveries");

        console.log(previousDeliveries, "1");

        console.log(mutateData, "3");
        // Optimistically update to the new value
        queryClient.setQueryData("deliveries", (previousDeliveries) =>
          // previousDeliveries.map((oldDelivery) =>
          //   oldDelivery.id === mutateData.deliveryId
          //     ? { ...oldDelivery, status: mutateData.status }
          //     : oldDelivery
          // )
          []
        );
        const newDeliveries = queryClient.getQueryData("deliveries");

        console.log(newDeliveries, "2");

        // Return a context object with the snapshotted value
        return { previousDeliveries };
      },

      onError: (rollback) => rollback(),

      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries("deliveries"),
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
              className="btn button-color-1 col-10 "
            >
              Delivered
            </button>
          ) : (
            <button
              onClick={() =>
                mutate({ deliveryId: delivery.id, status: "delivering" })
              }
              type="button"
              className="btn button-color-2 col-10 "
            >
              Pick for delivery
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
