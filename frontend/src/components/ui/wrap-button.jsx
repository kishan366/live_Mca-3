import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

const WrapButton = ({ className, children, href }) => {
  const isHashLink = href?.startsWith("#")

  const Inner = (
    <div
      className={cn(
        "group cursor-pointer border border-[#3B3A3A] bg-[#151515] gap-2 h-[64px] px-4 flex items-center rounded-full w-fit mx-auto", // 👈 width fix + center
        className
      )}
    >
      <div className="border border-[#3B3A3A] bg-[#ff3f17] h-[43px] px-4 rounded-full flex items-center justify-center text-white">
        <p className="font-medium tracking-tight flex items-center gap-2">
          {children}
        </p>
      </div>
      <div className="text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]">
        <ArrowRight
          size={18}
          className="group-hover:rotate-45 ease-in-out transition-all"
        />
      </div>
    </div>
  )

  if (!href) {
    return (
      <div className="flex justify-center">
        <div
          className={cn(
            "group cursor-pointer border border-[#3B3A3A] bg-[#151515] gap-2 h-[64px] px-4 flex items-center rounded-full w-fit",
            className
          )}
        >
          <div className="border border-[#3B3A3A] bg-[#fe7500] h-[43px] px-4 rounded-full flex items-center justify-center text-white">
            <Globe className="mx-2 animate-spin" />
            <p className="font-medium tracking-tight">
              {children ? children : "Get Started"}
            </p>
          </div>
          <div className="text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]">
            <ArrowRight
              size={18}
              className="group-hover:rotate-45 ease-in-out transition-all"
            />
          </div>
        </div>
      </div>
    )
  }

  if (isHashLink) return <a href={href}>{Inner}</a>
  return <Link to={href}>{Inner}</Link>
}

export default WrapButton
