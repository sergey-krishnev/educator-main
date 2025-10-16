import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageOff } from "lucide-react";
import { useGetQuestsQuery } from "@/api/questApi";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import QuestDetailed from "./quest-detailed";

// Quest data type
export type Quest = {
  id: number;
  name: string;
  description: string;
  preview: string; // image URL
};

// Props for the grid component
type QuestsGridProps = {
  /** Optional wrapper classes to control max-width / padding on large screens */
  containerClassName?: string;
};

// Single quest tile
const QuestTile: React.FC<{ quest: Quest}> = ({quest}) => {
  const [imgOk, setImgOk] = useState(Boolean(quest.preview));

  return (
    <Card className="h-full flex flex-col overflow-hidden border bg-card text-card-foreground hover:shadow-lg transition-shadow duration-300 rounded-2xl">
      {/* Media */}
      <div className="relative w-full aspect-[16/9] bg-muted/60 border-b border-border overflow-hidden">
        {imgOk ? (
          <img
            src={quest.preview}
            alt={quest.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex items-center gap-2 opacity-70">
              <ImageOff className="w-5 h-5" aria-hidden />
              <span className="text-sm">No preview</span>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1">
        <CardHeader className="pt-4 pb-2 px-6 text-left">
          <CardTitle className="text-lg leading-tight line-clamp-2 text-left">{quest.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 flex-1 flex flex-col px-6 text-left">
          <p className="text-sm text-muted-foreground line-clamp-3">{quest.description}</p>
          <div className="flex justify-end mt-auto">
            <Button asChild size="sm" className="rounded-xl cursor-pointer" aria-label={`See details: ${quest.name}`}>
              <Link to={`/quests/${quest.id}`}>Details</Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
QuestTile.displayName = "QuestTile";

// Grid of tiles
const QuestsGrid: React.FC<QuestsGridProps> = ({ containerClassName }) => {

  const { data: quests } = useGetQuestsQuery({})

  if (!quests?.length) {
    return (
      <div className="w-full text-center py-12 text-muted-foreground">
        No quests to display.
      </div>
    );
  }

  return (
    <div className={containerClassName ?? "mx-auto w-full max-w-screen-2xl px-4"}>
      <div className="grid gap-6 2xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [@media(min-width:1680px)]:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {quests.map((q: Quest) => (
          <QuestTile key={q.id} quest={q} />
        ))}
      </div>
    </div>
  );
};

export default QuestsGrid;

export const Preview: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            <h1 className="text-2xl text-center font-semibold mb-4 p-3">Available quests</h1>
            <QuestsGrid />
          </>
          } />
          <Route path="/quests/:id" element={<QuestDetailed />} />
        </Routes>
    </BrowserRouter>

  );
};
