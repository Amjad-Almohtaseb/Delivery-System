import { useQuery } from "react-query";
import instance from "../instance";
import DeliveiryItem from "./DeliveryItem";
import Home from "./Home";
import Loading from "./Loading";
function DeliveryList() {
  const { data, isLoading } = useQuery(
    "deliveries",
    async () => await instance.get("/deliveries").then((res) => res.data)
  );
  console.log(data, "5");
  if (isLoading) {
    return <Loading />;
  }

  const deliveryList = data?.map((delivery) => (
    <tr>
      <DeliveiryItem deliveries={data} delivery={delivery} key={delivery.id} />
    </tr>
  ));
  return (
    <>
      <Home />
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>{deliveryList}</tbody>
      </table>
    </>
  );
}

export default DeliveryList;
