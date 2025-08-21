import { useState } from "react";
import { motion } from "framer-motion";

const dialogues = [
  {
    character: "Алиса",
    avatar: "/Alice/idle.png",
    text: "Привет! Добро пожаловать в нашу визуальную новеллу.",
    background: "url(/bakery.png)",
  },
  {
    character: "Алиса",
    avatar: "/Alice/laugh.png",
    text: "Спасибо, что заглянул! Готов к приключениям?",
    background: "url(/bakery.png)",
  },
  {
    character: "Алиса",
    avatar: "/Alice/astonishment.png",
    text: "Что? Ты думаешь, что это не конец?",
    background: "url(/bakery.png)",
  },
  {
    character: "Алиса",
    avatar: "/Alice/angry.png",
    text: "Да, это конец! Проваливай отсюда!",
    background: "url(/bakery.png)",
  }
];

const NovelCore = () => {
  const [step, setStep] = useState(0);
  const current = dialogues[step];

  return (
    <div
      className="h-full w-full flex flex-col justify-end items-center p-0"
      style={{
        background: current.background,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Фон и портрет */}
      <div className="flex-1 w-full relative flex justify-center items-end">
        <motion.img
          src={current.avatar}
          alt={current.character}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="h-[55vh] md:h-[70vh] xl:h-[80vh] w-auto bg-transparent object-contain "
        />
      </div>
      {/* Диалоговое окно */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
        className="w-full shadow-lg p-6 bg-white dark:bg-zinc-800"
      >
        <div className="font-bold text-[20px] mb-2 text-[#22223b] dark:text-gray-100 drop-shadow-[0_1px_4px_#fff] dark:drop-shadow-[0_1px_4px_#222]">
          {current.character}
        </div>
        <div className="text-[18px] mb-4 text-[#22223b] dark:text-gray-100 drop-shadow-[0_1px_4px_#fff] dark:drop-shadow-[0_1px_4px_#222]">
          {current.text}
        </div>
        <button
          onClick={() => setStep((s) => Math.min(s + 1, dialogues.length - 1))}
          className="px-6 py-2 text-[16px] rounded-lg border-none bg-indigo-500 text-white cursor-pointer disabled:opacity-60"
          disabled={step === dialogues.length - 1}
        >
          {step === dialogues.length - 1 ? "Конец" : "Далее"}
        </button>
      </motion.div>
      {/* конец анимированного окна */}
    </div>
  );
};

export default NovelCore;
