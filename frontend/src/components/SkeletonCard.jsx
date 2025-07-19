import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonCard() {
  return (
    <div className="rounded overflow-hidden">
      <Skeleton height={270} />
      <Skeleton count={2} />
    </div>
  );
}
