import cx from "clsx"
import Image from "next/image"

export const ProfileImage = ({
  size = "large",
  isInteractive,
}: {
  size: "small" | "large"
  isInteractive?: boolean
}) => {
  return (
    <div
      className={cx(
        "rounded-full bg-gradient-to-tl from-green-700/60 to-emerald-400/60 shadow-lg",
        {
          "p-[2px]": size === "small",
          "p-[3px]": size === "large",
          "group transform transition ease-out hover:scale-105 hover:from-green-700 hover:to-emerald-400 hover:shadow-rose-500/25 active:translate-y-px":
            isInteractive,
          "ring-[5px] ring-purple-500/10": !isInteractive,
        },
      )}
    >
      <div
        className={cx("rounded-full p-px", {
          "h-[36px] w-[36px]": size === "small",
          "h-[64px] w-[64px]": size === "large",
          "transition duration-300 group-hover:scale-105": isInteractive,
        })}
      >
        <Image
          src="https://res.cloudinary.com/mansdesmez/image/upload/v1687436084/xnwaeaMF_400x400_qbfrsk.jpg"
          alt="A photo of Mansour"
          quality={95}
          priority={true}
          className="rounded-full"
          width={size === "small" ? 36 : 64}
          height={size === "small" ? 36 : 64}
        />
      </div>
    </div>
  )
}
