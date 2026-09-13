import Image from "next/image";
import type { CSSProperties } from "react";
import { CarSilhouette } from "@/components/icons";
import { vehicleImage } from "@/sanity/lib/image";
import type { Vehicle } from "@/lib/types";

interface Props {
  vehicle: Vehicle;
  width?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Renders the Sanity photo if one has been uploaded, otherwise a silhouette
 * placeholder. The site therefore looks intentional rather than broken while
 * the fleet is still being photographed.
 */
export default function VehiclePhoto({
  vehicle,
  width = 900,
  sizes = "(max-width: 620px) 100vw, (max-width: 940px) 50vw, 380px",
  priority = false,
  className = "",
  style,
}: Props) {
  const url = vehicleImage(vehicle.mainImage, width);
  const isVan = vehicle.body === "Van" || vehicle.body === "Ute";

  if (!url) {
    return (
      <div className={`shot shot-ph ${className}`.trim()} style={style}>
        <CarSilhouette van={isVan} />
      </div>
    );
  }

  return (
    <div className={`shot ${className}`.trim()} style={style}>
      <Image
        src={url}
        alt={
          vehicle.mainImage?.alt ||
          `${vehicle.year} ${vehicle.title} available for weekly hire in West Ryde, Sydney`
        }
        width={width}
        height={Math.round((width / 3) * 2)}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
