import { useState } from "react";
import { useQuery } from "react-query";
import instance from "../instance";
import DeliveiryItem from "./DeliveryItem";
import Home from "./Home";
import Loading from "./Loading";

function DeliveryList() {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError, error } = useQuery(
    "deliveries",
    async () => await instance.get("/deliveries").then((res) => res.data)
  );

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    console.log(error);
  }

  const filteredDeliveryList = data
    ?.filter(
      (delivery) =>
        delivery.name.toUpperCase().includes(query.toUpperCase()) ||
        delivery.address.toUpperCase().includes(query.toUpperCase())
    )
    .map((delivery) => (
      <tr>
        <DeliveiryItem
          deliveries={data}
          delivery={delivery}
          key={delivery.id}
        />
      </tr>
    ));

  return (
    <>
      <Home />
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th className="name-cell" scope="col">
              Name
            </th>
            <th className="address-cell" scope="col">
              Address
            </th>
            <th scope="col">
              <input
                className="search-bar"
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search"
              />
            </th>
          </tr>
        </thead>
        <tbody>{filteredDeliveryList}</tbody>
      </table>

      {filteredDeliveryList.length === 0 && (
        <p className="web-title">No Matching Results</p>
      )}
    </>
  );
}

export default DeliveryList;
