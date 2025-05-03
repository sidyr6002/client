import FeatureSection from "@/components/feature-section";

async function getData () {
  const res = await fetch(`${process.env.STRAPI_API_URL}/api/feature-highlights-sections?populate[items][populate]=image`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();
  const features = data.data[0];

  console.log(features);

  return (
    <main className="h-svh w-screen p-6 flex items-center justify-center bg-slate-50 text-stone-900">
      <FeatureSection data={features} />
    </main>
  );
}
