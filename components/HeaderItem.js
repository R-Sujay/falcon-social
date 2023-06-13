import React from "react";
import { motion } from "framer-motion";

function HeaderItem({ text, isSelected, onClick }) {
  return (
    <li className="flex h-1 items-center justify-center lg:h-3 m-5 relative cursor-pointer flex-shrink-0" onClick={onClick}>
      <h1 className="z-50 text-lg font-semibold text-indigo-600 transition-colors">{text}</h1>
      {isSelected && (
        <motion.div
          layoutId="outline"
          className="absolute -top-[20px] -left-[20px] -right-[20px] -bottom-[20px] rounded-2xl bg-indigo-800"
          initial={false}
          transition={{
            stiffness: 500,
            damping: 20,
            type: "spring",
          }}
        />
      )}
    </li>
  );
}

export default HeaderItem;
