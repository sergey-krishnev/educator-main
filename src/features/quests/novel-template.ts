export type Character = {
    name: string;
    emotions: {
        [emotion: string]: string;
    };
};

export type Novel = {
    meta: {
        title: string;
        startScene: string;
    };
    characters: {
        [key: string]: Character;
    };
    scenes: {
        [sceneId: string]: Scene;
    };
};

export type Scene = {
    id?: string;
    speaker: string;
    background?: string;
    emotion?: string;
    text: string;
    next?: string;
    choices?: Array<{
        type: string;
        text: string;
        prompt?: string;
        expectedWords?: string[];
        next: string;
        grammarRules?: number[];
        consequence?: string;
        placeholder?: string;
    }>;
};

export const novel: Novel = {
    "meta": {
        "title": "Nowy początek: Tajemnica akademika",
        "startScene": "scene1"
    },
    "characters": {
        "Narrator": {
            "name": "Narrator",
            "emotions": {}
        },
        "Ania": {
            "name": "Ania",
            "emotions": {
                "neutral": "ania_neutral.png",
                "smile": "ania_smile.png",
                "worried": "ania_worried.png",
                "serious": "ania_serious.png"
            }
        },
        "Dyżurny": {
            "name": "Dyżurny Marek",
            "emotions": {
                "stern": "guard_stern.png",
                "neutral": "guard_neutral.png"
            }
        }
    },
    "scenes": {
        "scene1": {
            "id": "scene1",
            "speaker": "Narrator",
            "background": "room_night.png",
            "text": "Ты просыпаешься в незнакомой комнате. За окном темно. Странная тишина...",
            "next": "scene2"
        },
        "scene2": {
            "id": "scene2",
            "speaker": "Narrator",
            "text": "На столе — карта с меткой. Под ней надпись на польском: 'Uciekaj'",
            "next": "scene3"
        },
        "scene3": {
            "id": "scene3",
            "speaker": "Narrator",
            "text": "Слышны шаги в коридоре. Кто-то останавливается у двери... Замок щёлкает — дверь медленно открывается.",
            "next": "scene4"
        },
        "scene4": {
            "id": "scene4",
            "speaker": "Ania",
            "emotion": "serious",
            "text": "Cicho! Jesteś obudzony? Musimy iść!",
            "choices": [
                {
                    "type": "voice", "text": "Скажи: 'Что происходит?'", "prompt": "Co się dzieje?",
                    "expectedWords": ["co się dzieje"],
                    "next": "scene5",
                    "grammarRules": [242, 243]
                },
                {
                    "type": "action",
                    "text": "Подняться и пойти за ней",
                    "next": "scene5_wrong",
                    "grammarRules": [],
                    "consequence": "Ты идёшь за Аней, не спрашивая. Она что-то шепчет, но ты не понимаешь. В коридоре вы сталкиваетесь с охраной, и ты не знаешь, как объясниться."
                }
            ]
        },
        "scene5": {
            "id": "scene5",
            "speaker": "Ania",
            "emotion": "worried",
            "text": "Ktoś przeszukuje pokoje. Szukają czegoś... albo kogoś.",
            "next": "scene6"
        },
        "scene5_wrong": {
            "id": "scene5_wrong",
            "speaker": "Narrator",
            "text": "Ты идёшь за Аней, не спрашивая. Она что-то шепчет, но ты не понимаешь. В коридоре вы сталкиваетесь с охраной, и ты не знаешь, как объясниться.",
            "next": "scene6_wrong"
        },
        "scene6": {
            "id": "scene6",
            "speaker": "Narrator",
            "text": "Вы с Аней крадетесь по коридору. Внезапно — крик на польском снизу!",
            "next": "scene7"
        },
        "scene6_wrong": {
            "id": "scene6_wrong",
            "speaker": "Narrator",
            "text": "Ты один в коридоре. Слышны крики и бегущие шаги. Ты не знаешь, что делать.",
            "next": "scene7_wrong"
        },
        "scene7": {
            "id": "scene7",
            "speaker": "Dyżurny",
            "emotion": "stern",
            "text": "Zatrzymać się! Kim jesteście?!",
            "choices": [
                {
                    "type": "voice", "text": "Скажи: 'Я студент. Пожалуйста!'", "prompt": "Jestem studentem. Proszę!",
                    "expectedWords": ["jestem studentem", "proszę"],
                    "next": "scene8",
                    "grammarRules": [233, 234, 251]
                },
                {
                    "type": "input",
                    "text": "Написать объяснение на листке",
                    "placeholder": "Napisz, kim jesteś...",
                    "next": "scene_input_fail",
                    "grammarRules": [],
                    "consequence": "Dlaczego nie mówisz? To wygląda podejrzanie. Musicie iść ze mną natychmiast."
                }
            ]
        },
        "scene7_wrong": {
            "id": "scene7_wrong",
            "speaker": "Dyżurny",
            "emotion": "stern",
            "text": "Ty! Zatrzymaj się! Kim jesteś?!",
            "choices": [
                {
                    "type": "voice", "text": "Скажи: 'Я не понимаю. Помогите!'", "prompt": "Nie rozumiem. Pomocy!",
                    "expectedWords": ["nie rozumiem", "pomocy"],
                    "next": "scene8_wrong",
                    "grammarRules": [234, 251]
                },
                {
                    "type": "action",
                    "text": "Бежать",
                    "next": "scene_fail",
                    "consequence": "Ты выбегаешь в панике — и сталкиваешься с охраной. Тебя задерживают."
                }
            ]
        },
        "scene_input_fail": {
            "id": "scene_input_fail",
            "speaker": "Dyżurny",
            "emotion": "stern",
            "text": "Dlaczego nie mówisz? To wygląda podejrzanie. Musicie iść ze mną natychmiast.",
            "next": "scene9"
        },
        "scene8": {
            "id": "scene8",
            "speaker": "Dyżurny",
            "emotion": "neutral",
            "text": "Hmm... W porządku. Przypominasz mi jednego chłopaka... Może to przypadek, ale muszę to sprawdzić. Chodźcie ze mną.",
            "next": "scene9"
        },
        "scene8_wrong": {
            "id": "scene8_wrong",
            "speaker": "Dyżurny",
            "emotion": "neutral",
            "text": "Pomocy? Wszystko dobrze. Ale nie możesz być tutaj sam. Chodź.",
            "next": "scene9_wrong"
        },
        "scene9": {
            "id": "scene9",
            "speaker": "Narrator",
            "background": "campus_security_room.png",
            "text": "Вы заходите в комнату охраны. На стене — множество фотографий студентов. Среди них — твоё лицо, но с пометкой 'ZAGINIONY'. Пропавший... Дежурный выглядит смущённым. Он что-то скрывает...",
            "next": "scene10"
        },
        "scene9_wrong": {
            "id": "scene9_wrong",
            "speaker": "Narrator",
            "background": "campus_security_room.png",
            "text": "Ты один в комнате охраны. Охранник что-то пишет. На стене ты видишь своё лицо с надписью 'ZAGINIONY'. Пропавший без вести... Он говорит по телефону. В его голосе — тревога...",
            "next": "scene10_wrong"
        },
        "scene10": {
            "id": "scene10",
            "speaker": "Ania",
            "emotion": "neutral",
            "text": "To nie wszystko. Masz coś, czego oni chcą... Mój brat też zniknął tak samo.",
            "next": "scene11"
        },
        "scene10_wrong": {
            "id": "scene10_wrong",
            "speaker": "Dyżurny",
            "emotion": "stern",
            "text": "Zgłoszę to. Nie powinieneś tu być. Poczekaj tutaj.",
            "next": "scene11_wrong"
        },
        "scene11": {
            "id": "scene11",
            "speaker": "Narrator",
            "background": "room_day.png",
            "text": "Всё только начинается. И ты должен решить — кому доверять в этом городе, где правду прячут за улыбкой...",
            "next": "scene12"
        },
        "scene11_wrong": {
            "id": "scene11_wrong",
            "speaker": "Narrator",
            "background": "room_day.png",
            "text": "Ты остался один, без ответов и союзников. Возможно, всё ещё можно изменить — но только если ты начнёшь понимать, что тебе говорят...",
            "next": "scene12_wrong"
        },
        "scene12": {
            "id": "scene12",
            "speaker": "Ania",
            "emotion": "serious",
            "text": "Musimy znaleźć profesora Nowaka. On wie, co się dzieje naprawdę.",
            "choices": [
                {
                    "type": "voice", "text": "Скажи: 'Gdzie on jest?' (Где он?)", "prompt": "Gdzie on jest?",
                    "expectedWords": ["gdzie", "jest"],
                    "next": "scene13",
                    "grammarRules": [242, 234]
                },
                {
                    "type": "action",
                    "text": "Кивнуть и последовать за Аней молча",
                    "next": "scene13_silent",
                    "grammarRules": []
                }
            ]
        },
        "scene12_wrong": {
            "id": "scene12_wrong",
            "speaker": "Narrator",
            "text": "Ты сидишь в комнате. Вдруг раздаётся звонок. На экране — незнакомый номер.",
            "choices": [
                {
                    "type": "action",
                    "text": "Ответить на звонок",
                    "next": "scene12_wrong_call"
                },
                {
                    "type": "action",
                    "text": "Проигнорировать звонок",
                    "next": "scene12_wrong_ignore"
                },
                {
                    "type": "action",
                    "text": "Написать сообщение: 'Kim jesteś?'",
                    "next": "scene12_wrong_sms"
                }
            ]
        },
        "scene12_wrong_call": {
            "id": "scene12_wrong_call",
            "speaker": "???",
            "text": "Słuchaj uważnie. Jesteś w niebezpieczeństwie. Musisz uciekać z akademika.",
            "next": "scene13_warning"
        },
        "scene12_wrong_ignore": {
            "id": "scene12_wrong_ignore",
            "speaker": "Narrator",
            "text": "Телефон продолжает звонить... и вдруг — отключается свет.",
            "next": "scene13_dark"
        },
        "scene12_wrong_sms": {
            "id": "scene12_wrong_sms",
            "speaker": "Narrator",
            "text": "Ответа нет. Но вдруг — приходит фотография: вход в библиотеку с надписью 'PAMIĘTAJ'.",
            "next": "scene13_warning"
        },
        "scene13": {
            "id": "scene13",
            "speaker": "Ania",
            "emotion": "worried",
            "text": "Widziano go ostatnio w bibliotece. Ale uważaj — ktoś nas śledzi.",
            "next": "scene14"
        },
        "scene13_silent": {
            "id": "scene13_silent",
            "speaker": "Narrator",
            "text": "Вы идёте по университетскому коридору. Аня напряжена, озирается.",
            "next": "scene14"
        },
        "scene13_warning": {
            "id": "scene13_warning",
            "speaker": "Narrator",
            "text": "Ты бежишь в коридор. Что-то изменилось. Люди смотрят на тебя... как будто знают больше, чем говорят.",
            "next": "scene14"
        },
        "scene13_dark": {
            "id": "scene13_dark",
            "speaker": "Narrator",
            "text": "Ты один в темноте. Звонок прекратился. Но теперь — полная тишина. Что делать дальше?",
            "next": "scene14"
        },
        "scene14": {
            "id": "scene14",
            "speaker": "Narrator",
            "text": "Что бы ты ни выбрал до этого — судьба уже в движении. И только ты можешь расшифровать тайну профессора Новяка...",
            "choices": []
        }
    }
}
