import { useState } from "react";
import { motion } from "framer-motion";
import { Character, Novel, novel, Scene } from "./novel-template";

const getCharacter = (scene: Scene, novel: Novel) => {
  if (!scene.speaker) return null;
  return novel.characters[scene.speaker] || { name: scene.speaker, emotions: {} };
};

const getAvatar = (scene: Scene, character: Character | null) => {
  if (!character) return null;
  if (scene.emotion && character.emotions && character.emotions[scene.emotion]) {
    return character.emotions[scene.emotion];
  }
  const emotions = character.emotions || {};
  return Object.values(emotions)[0] || null;
};

const NovelCore = () => {

  const [sceneId, setSceneId] = useState(novel.meta.startScene);
  const [background, setBackground] = useState(
    novel.scenes[novel.meta.startScene]?.background || null
  );

  const scene = novel.scenes[sceneId];
  const character = getCharacter(scene, novel);
  const avatar = getAvatar(scene, character);

  const goToScene = (nextId: string) => {
    const nextScene = novel.scenes[nextId];
    setSceneId(nextId);
    if (nextScene && nextScene.background) {
      setBackground(nextScene.background);
    }
  };

  const handleNext = () => {
    if (scene.next) goToScene(scene.next);
  };

  const handleChoice = (choice) => {
    if (choice.next) goToScene(choice.next);
  };

  return (
    <div
      className="h-full w-full flex flex-col justify-end items-center p-0"
      style={{
        background: background
          ? `url(/backgrounds/${background}) no-repeat center center / cover`
          : undefined,
      }}
    >
      {/* Фон и портрет */}
      <div className="flex-1 w-full relative flex justify-center items-end">
        {avatar && (
          <motion.img
            src={`/characters/${avatar}`}
            alt={character?.name}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
            className="h-[55vh] md:h-[70vh] xl:h-[80vh] w-auto bg-transparent object-contain"
          />
        )}
      </div>
      {/* Диалоговое окно */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 18 }}
        className="w-full shadow-lg p-6 bg-white dark:bg-zinc-800"
      >
        <div className="font-bold text-[20px] mb-2 text-[#22223b] dark:text-gray-100 drop-shadow-[0_1px_4px_#fff] dark:drop-shadow-[0_1px_4px_#222]">
          {character?.name}
        </div>
        <div className="text-[18px] mb-4 text-[#22223b] dark:text-gray-100 drop-shadow-[0_1px_4px_#fff] dark:drop-shadow-[0_1px_4px_#222]">
          {scene.text}
        </div>
        {scene.choices && scene.choices.length > 0 ? (
          <div className="flex flex-col gap-2">
            {scene.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleChoice(choice)}
                className="px-6 py-2 text-[16px] rounded-lg border-none bg-indigo-500 text-white cursor-pointer"
              >
                {choice.text}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 text-[16px] rounded-lg border-none bg-indigo-500 text-white cursor-pointer"
            disabled={!scene.next}
          >
            {scene.next ? "Далее" : "Конец"}
          </button>
        )}
      </motion.div>
      {/* конец анимированного окна */}
    </div>
  );
};

export default NovelCore;
