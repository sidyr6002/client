"use client";
import { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Item {
  id: number;
  title: string;
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  };
}

interface FeatureSectionData {
  title: string;
  description: string;
  items: Item[];
}

export default function FeatureSection({ data }: { data: FeatureSectionData }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="container max-w-6xl mx-auto p-4">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-lg md:text-xl mb-2">Why choose us</h3>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">{data.title}</h1>
        <p className="text-center text-sm md:text-base max-w-prose px-4">{data.description}</p>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center gap-8">
        {/* Capsule Container */}
        <div className="w-full max-w-[320px] relative">
          {/* Image Circle */}
          <div className="aspect-square w-full rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              width={320}
              height={320}
              className="w-full h-full object-cover"
              src={data.items[activeIndex].image.url}
              alt={data.items[activeIndex].image.alternativeText || ""}
            />
          </div>
          
          {/* Text Capsule */}
          <div className="absolute bottom-0 w-full bg-pink-900/90 text-white p-4 rounded-2xl shadow-lg -translate-y-8">
            <p className="text-sm text-center line-clamp-3">
              {data.items[activeIndex].description}
            </p>
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="w-full space-y-3 px-4">
          {data.items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={twMerge(
                "w-full p-3 text-left rounded-xl transition-all",
                "text-sm font-medium flex items-center",
                "active:scale-95 transform transition-transform",
                activeIndex === index
                  ? "bg-pink-800 text-white shadow-inner"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm"
              )}
            >
              <span className="flex-1">{item.title}</span>
              <span className={`h-2 w-2 rounded-full ${activeIndex === index ? 'bg-white' : 'bg-pink-800'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Layout (Unchanged) */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-7">
        <div className="col-span-4 flex items-center justify-center overflow-visible">
          <div className="relative flex items-center">
            <div className={twMerge(
              "h-[20rem] w-[20rem]",
              "p-4",
              "rounded-full bg-pink-900/85",
              "text-stone-50 font-semibold",
              "flex items-center justify-center",
              "z-10 translate-x-8"
            )}>
              <p className="text-sm text-center">{data.items[activeIndex].description}</p>
            </div>
            <Image
              width={500}
              height={500}
              className={twMerge(
                "h-[20rem] w-[20rem]",
                "rounded-full object-cover",
                "translate-x-[-4rem]",
                "border-4 border-white"
              )}
              src={data.items[activeIndex].image.url}
              alt={data.items[activeIndex].image.alternativeText || ""}
            />
          </div>
        </div>

        <div className="col-span-3 md:self-end flex flex-col gap-4">
          {data.items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={twMerge(
                "p-4 pr-8",
                "w-full text-end",
                "rounded-3xl transition-colors",
                "text-base",
                activeIndex === index
                  ? "bg-pink-800/80 text-stone-50"
                  : "bg-gray-300 hover:bg-gray-400/50 text-stone-700"
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}