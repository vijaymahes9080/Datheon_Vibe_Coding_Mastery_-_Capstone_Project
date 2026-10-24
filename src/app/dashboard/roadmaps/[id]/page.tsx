import React from "react";
import RoadmapDetailClient from "./RoadmapDetailClient";

export function generateStaticParams() {
  return [
    { id: "rm-ai-01" },
    { id: "rm-fs-02" },
    { id: "demo-roadmap" },
  ];
}

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RoadmapDetailClient id={id} />;
}
