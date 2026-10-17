import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();
  return <h1 className="p-10 font-display text-4xl">Property #{id}</h1>;
}