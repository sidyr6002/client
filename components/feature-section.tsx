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
        <div className="container max-w-6xl mx-auto p-2 md:p-4">
            <div className="flex flex-col items-center">
                <h3 className="text-xl mb-4">Why choose us</h3>
                <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                <p className="mb-8 text-center">{data.description}</p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-7">
                <div className="col-span-4 flex items-center justify-center">
                    <div className="h-[16rem] w-[16rem] md:h-[20rem] md:w-[20rem] p-2 md:p-4 rounded-full bg-pink-800/80 text-stone-50 font-semibold flex contain-strict items-center justify-center translate-x-8 z-10">

                        <p className="text-sm">{data.items[activeIndex].description}</p>
                    </div>

                    <Image width={500} height={500} className="h-[16rem] w-[16rem] md:h-[20rem] md:w-[20rem] rounded-full overflow-hidden object-cover translate-x-[-2rem]" src={`${data.items[activeIndex].image.url}`} alt={data.items[activeIndex].image.alternativeText || ""} />
                </div>
                <div className="col-span-3 p-4 self-end flex flex-col gap-4 items-end">
                    {
                        data.items.map((item, index) => (
                            <button key={item.id} onClick={() => setActiveIndex(index)} className={twMerge("p-4 pr-6 md:pr-8 lg:pr-10 font-bold w-full rounded-4xl text-end transition", activeIndex === index ? "bg-pink-800/80 text-stone-50" : "bg-gray-300 text-stone-700")}>
                                {item.title}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}