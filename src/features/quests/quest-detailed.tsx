import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ImageOff, Rocket } from "lucide-react";
import { useGetQuestByIdQuery } from "@/api/questApi";
import NovelCore from "./novel-core";

export type Quest = {
  id: number;
  name: string;
  description: string;
  preview: string;
  screenshots?: string[];
};

const Img: React.FC<{ src?: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [ok, setOk] = React.useState(Boolean(src));
  if (!ok) {
    return (
      <div className={`flex items-center justify-center bg-muted/60 border border-border ${className ?? ""}`}>
        <ImageOff className="w-6 h-6 opacity-70" aria-hidden />
      </div>
    );
  }
  return (
    <img src={src} alt={alt} className={className} onError={() => setOk(false)} loading="lazy" />
  );
};

const QuestDetailed = () => {
  const { id } = useParams<{ id: string }>();
  const questId = Number(id);
  const {data: quest} = useGetQuestByIdQuery(questId)
  const [isGameStarted, setGameStarted] = useState(false)

  if (!quest) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Button asChild variant="ghost" size="sm" className="px-2">
            <Link to="/quests" aria-label="Back to list">
              <ChevronLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Quest not found</span>
        </div>
      </div>
    );
  }

  const gallery = (quest.screenshots?.length ? quest.screenshots : []).slice(0, 8);

  if (isGameStarted) return <NovelCore novel={quest.scenario} handleExit={() => setGameStarted(false)}/>

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-6">
      {/* Back */}
      <div className="mb-4 flex justify-between">
        <Button asChild variant="ghost" size="lg" className="px-2">
          <Link to="/" aria-label="Back to list">
            <ChevronLeft className="h-4 w-4" /> Back
          </Link>
        </Button>
        <Button disabled={!quest.scenario} onClick={() => setGameStarted(true)} className="rounded-xl cursor-pointer" size="lg" aria-label={`Start quest: ${quest.name}`}>
            <Rocket className="mr-2 h-4 w-4" /> Start {!quest.scenario ? "is not available" : ''}
        </Button>
      </div>

      {/* Hero */}
      <Card className="overflow-hidden rounded-2xl border bg-card text-card-foreground">
        <Img src={quest.preview} alt={quest.name} className="w-full aspect-[16/9] object-cover" />
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold leading-tight">{quest.name}</h1>
          <p className="text-base text-muted-foreground">{quest.description}</p>
        </CardContent>
      </Card>

      {/* Gallery */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">Screenshots</h2>
        {gallery.length ? (
          <div className="flex gap-3 overflow-auto snap-x">
            {gallery.map((src, i) => (
              <div key={i} className="shrink-0 w-64 snap-start">
                <Img src={src} alt={`${quest.name} screenshot ${i + 1}`} className="w-64 h-40 object-cover rounded-xl border" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No screenshots yet.</div>
        )}
      </div>
    </div>
  );
};

export default QuestDetailed;
