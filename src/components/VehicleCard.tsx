import Link from "next/link";
import VehiclePhoto from "@/components/VehiclePhoto";
import { AVAILABILITY_LABEL } from "@/lib/site";
import type { Vehicle } from "@/lib/types";

export default function VehicleCard({
  vehicle,
  priority = false,
}: {
  vehicle: Vehicle;
  priority?: boolean;
}) {
  const isAvailable = vehicle.availability === "available";
  const green = vehicle.categories.includes("uber-green");

  return (
    <article className="card">
      <VehiclePhoto vehicle={vehicle} priority={priority} />
      <div className="card-body">
        <span className={`avail${isAvailable ? "" : " is-out"}`}>
          {isAvailable
            ? AVAILABILITY_LABEL.available
            : `${AVAILABILITY_LABEL[vehicle.availability]} — ask when it's back`}
        </span>

        <h3 style={{ marginTop: ".45rem" }}>
          <Link href={`/cars/${vehicle.slug}`}>{vehicle.title}</Link>
        </h3>
        <span className="yr">
          {vehicle.year} · {vehicle.fuel}
          {green ? " · Uber Green eligible" : ""}
        </span>

        <ul className="specs">
          <li>{vehicle.seats} seats</li>
          <li>{vehicle.transmission}</li>
          <li>{vehicle.body}</li>
        </ul>

        <div className="card-foot">
          <div className="rate">
            <span className="price">${vehicle.weeklyRate}</span>
            <span>per week</span>
          </div>
          <Link className="btn btn-ghost btn-sm" href={`/cars/${vehicle.slug}`}>
            View car
          </Link>
        </div>
      </div>
    </article>
  );
}
