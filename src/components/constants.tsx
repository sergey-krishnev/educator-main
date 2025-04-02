import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

// position list 
// after selecting position load full program of selected position

export const positions = [
    {
        id: 100,
        name: "Senior Java Developer",
        logo: GalleryVerticalEnd,
        location: "PL",
    },
    {
        id: 101,
        name: "Middle React Developer",
        logo: AudioWaveform,
        location: "BY",
    },
    {
        id: 102,
        name: "Junior AI Developer",
        logo: Command,
        location: "US",
    },
]

export const skillPositions = [
    {
        id: 100, positionId: 100, skillId: 100, level: 1, title: 'test', content: 'test2', order: 1, parentId: 1,
    }
]

// много квестов по одной skillPosition, и один квест может может содержать правила многих skillPosition. Это для того, чтобы показывать доступные квесты по мере изучения теории. 

export const skillPositionQuest = [
    {
        id: 100, questId: 100, skillPositionId: 100,
    }
]

export const quests = [
    {
        id: 100, reward: 20, read: 1, write: 2, listen: 3, talk: 4, theory: 5, practice: 6 //maybe about theory and practice (calculated) , потому что зависит от skillPositionQuest. Остальные поля зависят от типа квеста самого
    }
]

export const skills = [
    {"id": 100, "title": "English", "url": "#", "icon": "🇬🇧", "type": 'lang'},
    {"id": 101, "title": "Polish", "url": "#", "icon": "🇵🇱", "type": 'lang'},
    {"id": 102, "title": "Romanian", "url": "#", "icon": "🇷🇴", "type": 'lang'},
    {"id": 103, "title": "German", "url": "#", "icon": "🇩🇪", "type": 'lang'},
    {"id": 104, "title": "Java", "icon": "☕", "type": 'tech'},
    {"id": 105, "title": "Spring Framework", "icon": "🌱", "type": 'tech'},
    {"id": 106, "title": "Maven / Gradle", "icon": "🔨", "type": 'tech'},
    {"id": 107, "title": "Agile, SCRUM, Kanban (JIRA, Confluence)", "icon": "⚙️", "type": 'tech'},
    {"id": 108, "title": "Unit-тестирование (JUnit, TestNG, Mockito)", "icon": "🧪", "type": 'tech'},
    {"id": 109, "title": "Интеграционное тестирование (JUnit, TestNG, Mockito)", "icon": "🔌", "type": 'tech'},
]

export const data = {
    positions: [
        {
            id: 100,
            name: "Senior Java Developer",
            logo: GalleryVerticalEnd,
            location: "PL",
            skills: [
                {
                    "id": 100, "title": "English", "url": "#", "isActive": true, "icon": "🇬🇧", items: [
                        {
                            "title": "Грамматика",
                            "icon": "📖",
                            "items": [
                                { "id": 101, "name": "Present Simple vs Present Continuous" },
                                { "id": 102, "title": "Past Simple vs Present Perfect" },
                                { "id": 103, "title": "Future Forms (will, going to, Present Continuous)" },
                                { "id": 104, "title": "Conditionals (0, 1, 2, 3)" },
                                { "id": 105, "title": "Modal Verbs (can, could, must, should, have to)" }
                            ]
                        },
                        {
                            "title": "Словарный запас",
                            "icon": "🗣️",
                            "items": [
                                { "id": 106, "title": "Common Phrasal Verbs" },
                                { "id": 107, "title": "Idioms and Expressions" },
                                { "id": 108, "title": "Word Formation (prefixes & suffixes)" },
                                { "id": 109, "title": "Synonyms and Antonyms" },
                                { "id": 110, "title": "Collocations (make/do, take/get, etc.)" }
                            ]
                        },
                        {
                            "title": "Аудирование и разговорная практика",
                            "icon": "🎧",
                            "items": [
                                { "id": 111, "title": "Listening to Everyday Conversations" },
                                { "id": 112, "title": "Pronunciation and Intonation" },
                                { "id": 113, "title": "Speaking about Personal Experiences" },
                                { "id": 114, "title": "Describing People, Places, and Events" }
                            ]
                        },
                        {
                            "title": "Чтение и письмо",
                            "icon": "📚",
                            "items": [
                                { "id": 115, "title": "Reading Articles and Stories" },
                                { "id": 116, "title": "Writing Emails and Messages" },
                                { "id": 117, "title": "Formal vs Informal Writing" },
                                { "id": 118, "title": "Summarizing Texts" }
                            ]
                        },
                        {
                            "title": "Практика общения",
                            "icon": "💬",
                            "items": [
                                { "id": 119, "title": "Role-Playing Everyday Situations" },
                                { "id": 120, "title": "Debates and Discussions" },
                                { "id": 121, "title": "Giving Opinions and Expressing Agreement/Disagreement" },
                                { "id": 122, "title": "Making Requests and Suggestions" }
                            ]
                        },
                        {
                            "title": "Подготовка к экзаменам",
                            "icon": "🎓",
                            "items": [
                                { "id": 123, "title": "B1 Listening and Speaking Practice" },
                                { "id": 124, "title": "B1 Reading and Writing Practice" },
                                { "id": 125, "title": "Common B1 Exam Topics" }
                            ]
                        }
                    ]
                },
                {
                    "id": 101, "title": "Polish", "url": "#", "icon": "🇵🇱", items: [
                        {
                            "title": "Gramatyka",
                            "icon": "📖",
                            "items": [
                                { "id": 201, "title": "Czas teraźniejszy, przeszły i przyszły" },
                                { "id": 202, "title": "Dokonane i niedokonane aspekty czasownika" },
                                { "id": 203, "title": "Przymiotniki i przysłówki – stopniowanie" },
                                { "id": 204, "title": "Tryby warunkowe (jeśli, gdyby)" },
                                { "id": 205, "title": "Zaimek względny (który, jaka, jakie)" }
                            ]
                        },
                        {
                            "title": "Słownictwo",
                            "icon": "🗣️",
                            "items": [
                                { "id": 206, "title": "Popularne czasowniki frazowe" },
                                { "id": 207, "title": "Wyrażenia idiomatyczne" },
                                { "id": 208, "title": "Tworzenie słów (przedrostki i przyrostki)" },
                                { "id": 209, "title": "Synonimy i antonimy" },
                                { "id": 210, "title": "Kolokacje (robić/zrobić, mieć/dostać, etc.)" }
                            ]
                        },
                        {
                            "title": "Słuchanie i mówienie",
                            "icon": "🎧",
                            "items": [
                                { "id": 211, "title": "Rozumienie codziennych rozmów" },
                                { "id": 212, "title": "Wymowa i intonacja" },
                                { "id": 213, "title": "Mówienie o swoich doświadczeniach" },
                                { "id": 214, "title": "Opisywanie ludzi, miejsc i wydarzeń" }
                            ]
                        },
                        {
                            "title": "Czytanie i pisanie",
                            "icon": "📚",
                            "items": [
                                { "id": 215, "title": "Czytanie artykułów i opowiadań" },
                                { "id": 216, "title": "Pisanie e-maili i wiadomości" },
                                { "id": 217, "title": "Język formalny i nieformalny" },
                                { "id": 218, "title": "Streszczanie tekstów" }
                            ]
                        },
                        {
                            "title": "Praktyka konwersacyjna",
                            "icon": "💬",
                            "items": [
                                { "id": 219, "title": "Ćwiczenie codziennych sytuacji" },
                                { "id": 220, "title": "Debaty i dyskusje" },
                                { "id": 221, "title": "Wyrażanie opinii i zgadzanie się/niezgadzanie" },
                                { "id": 222, "title": "Formułowanie próśb i sugestii" }
                            ]
                        },
                        {
                            "title": "Przygotowanie do egzaminów",
                            "icon": "🎓",
                            "items": [
                                { "id": 223, "title": "Ćwiczenia ze słuchania i mówienia B1" },
                                { "id": 224, "title": "Ćwiczenia z czytania i pisania B1" },
                                { "id": 225, "title": "Typowe tematy egzaminacyjne B1" }
                            ]
                        }
                    ]
                },
                {
                    "title": "Основы разработки и фреймворки",
                    "icon": "📚",
                    "items": [
                        { "id": 102, "title": "Java Core (JVM, многопоточность, Collections, Stream API)" },
                        { "id": 103, "title": "Spring Framework (Spring Boot, Spring MVC, Spring Security, Spring Data)" },
                        { "id": 107, "title": "Maven / Gradle" },
                        { "id": 120, "title": "Agile, SCRUM, Kanban (JIRA, Confluence)" }
                    ]
                },
                {
                    "title": "Тестирование",
                    "icon": "🧪",
                    "items": [
                        { "id": 108, "title": "Unit-тестирование (JUnit, TestNG, Mockito)" },
                        { "id": 109, "title": "Интеграционное тестирование" }
                    ]
                },
                {
                    "title": "Работа с базами данных",
                    "icon": "💾",
                    "items": [
                        { "id": 110, "title": "Работа с реляционными БД (PostgreSQL, MySQL, Oracle)" },
                        { "id": 111, "title": "Работа с NoSQL (MongoDB, Cassandra, Redis)" }
                    ]
                },
                {
                    "title": "Безопасность и паттерны",
                    "icon": "🔐",
                    "items": [
                        { "id": 115, "title": "Безопасность (OAuth2, JWT, шифрование)" },
                        { "id": 116, "title": "Паттерны проектирования (Singleton, Factory, Observer и т. д.)" },
                        { "id": 117, "title": "Архитектурные паттерны (MVC, MVVM, CQRS, Event Sourcing)" }
                    ]
                },
                {
                    "title": "Контейнеризация и облачные платформы",
                    "icon": "☁️",
                    "items": [
                        { "id": 113, "title": "Контейнеризация (Docker, Kubernetes)" },
                        { "id": 118, "title": "Облачные платформы (AWS, Google Cloud, Azure)" },
                        { "id": 112, "title": "CI/CD (Jenkins, GitLab CI, Travis CI)" }
                    ]
                },
                {
                    "title": "Мониторинг и распределённые системы",
                    "icon": "🌐",
                    "items": [
                        { "id": 114, "title": "Мониторинг и логирование (ELK stack, Prometheus, Grafana)" },
                        { "id": 119, "title": "Работа с распределёнными системами" }
                    ]
                },
                {
                    "title": "Soft Skills и управление проектами",
                    "icon": "💬",
                    "items": [
                        { "id": 121, "title": "Soft Skills (менторство, ревью кода, коммуникация)" },
                        { "id": 105, "title": "Микросервисная архитектура" }
                    ]
                }
            ],
        },
        {
            id: 101,
            name: "Middle React Developer",
            logo: AudioWaveform,
            location: "BY",
            skills: [
                { "id": 100, "title": "English", "url": "#", "icon": "🇬🇧" },
                {
                    "title": "Основы JavaScript и TypeScript",
                    "icon": "💻",
                    "items": [
                        { "id": 201, "title": "JavaScript (ES6+)" },
                        { "id": 202, "title": "TypeScript (интерфейсы, дженерики, утилиты)" }
                    ]
                },
                {
                    "title": "React и инструменты",
                    "icon": "⚛️",
                    "items": [
                        { "id": 203, "title": "React (функциональные компоненты, хуки)" },
                        { "id": 204, "title": "React Router" },
                        { "id": 205, "title": "React Query / SWR" },
                        { "id": 206, "title": "Zustand / Redux Toolkit" },
                        { "id": 217, "title": "Jest + React Testing Library" },
                        { "id": 218, "title": "Cypress / Playwright" },
                        { "id": 219, "title": "Lazy loading (React.lazy, Suspense)" },
                        { "id": 220, "title": "Code splitting" },
                        { "id": 221, "title": "Memoization (useMemo, useCallback, React.memo)" }
                    ]
                },
                {
                    "title": "CSS и стилизация",
                    "icon": "🎨",
                    "items": [
                        { "id": 207, "title": "CSS-in-JS (Styled Components, Emotion)" },
                        { "id": 208, "title": "Tailwind CSS / Bootstrap / Material UI" },
                        { "id": 209, "title": "Адаптивная верстка (Flexbox, Grid)" }
                    ]
                },
                {
                    "title": "Инструменты для разработки",
                    "icon": "🛠️",
                    "items": [
                        { "id": 213, "title": "Webpack / Vite" },
                        { "id": 214, "title": "Babel" },
                        { "id": 215, "title": "ESLint + Prettier" },
                        { "id": 216, "title": "Husky + Lint-staged" }
                    ]
                },
                {
                    "title": "Работа с данными и API",
                    "icon": "🔌",
                    "items": [
                        { "id": 210, "title": "Fetch API / Axios" },
                        { "id": 211, "title": "WebSockets (Socket.IO)" },
                        { "id": 212, "title": "GraphQL (Apollo Client)" },
                        { "id": 224, "title": "Firebase / Supabase" }
                    ]
                },
                {
                    "title": "Разработка и контейнеризация",
                    "icon": "🐳",
                    "items": [
                        { "id": 222, "title": "Docker" },
                        { "id": 223, "title": "CI/CD (GitHub Actions, GitLab CI)" }
                    ]
                },
                {
                    "title": "Чистота кода и код-ревью",
                    "icon": "🧹",
                    "items": [
                        { "id": 226, "title": "Чистый код (SOLID, DRY, KISS)" },
                        { "id": 227, "title": "Code Review" }
                    ]
                },
                {
                    "title": "Node.js и серверная разработка",
                    "icon": "🌲",
                    "items": [
                        { "id": 225, "title": "Node.js (Express, NestJS) – базовое понимание" }
                    ]
                }
            ]
        },
        {
            id: 102,
            name: "Junior AI Developer",
            logo: Command,
            location: "US",
            skills: [
                { "id": 100, "title": "English", "url": "#", "icon": "🇬🇧" },
                {
                    "title": "Основы Python и библиотеки для данных",
                    "icon": "🐍",
                    "items": [
                        { "id": 301, "title": "Python (основы синтаксиса, ООП, структуры данных)" },
                        { "id": 302, "title": "Библиотеки для работы с данными (NumPy, Pandas, Matplotlib, Seaborn)" },
                        { "id": 307, "title": "Работа с данными (чистка, обработка, feature engineering)" }
                    ]
                },
                {
                    "title": "Машинное обучение",
                    "icon": "📈",
                    "items": [
                        { "id": 303, "title": "Алгоритмы машинного обучения (Linear Regression, Decision Trees, KNN, SVM)" },
                        { "id": 304, "title": "Библиотеки для ML (Scikit-Learn, XGBoost, LightGBM)" },
                        { "id": 313, "title": "ML в облаке (Google Colab, AWS SageMaker, Azure ML)" },
                        { "id": 314, "title": "Версионирование моделей (MLflow, DVC)" },
                        { "id": 317, "title": "CI/CD для ML (GitHub Actions, GitLab CI)" }
                    ]
                },
                {
                    "title": "Глубокое обучение",
                    "icon": "🧠",
                    "items": [
                        { "id": 305, "title": "Глубокое обучение (основы нейросетей, активационные функции, backpropagation)" },
                        { "id": 306, "title": "Фреймворки для DL (TensorFlow, PyTorch, Keras)" },
                        { "id": 311, "title": "PyTorch / TensorFlow для обработки изображений" }
                    ]
                },
                {
                    "title": "Обработка и анализ изображений",
                    "icon": "🖼️",
                    "items": [
                        { "id": 310, "title": "Работа с изображениями (OpenCV, PIL, CNN)" },
                        { "id": 311, "title": "PyTorch / TensorFlow для обработки изображений" }
                    ]
                },
                {
                    "title": "Обучение моделей и работа с данными",
                    "icon": "📚",
                    "items": [
                        { "id": 308, "title": "Обучение и валидация моделей (train/test split, cross-validation, metrics)" },
                        { "id": 309, "title": "Основы NLP (TF-IDF, word embeddings, LSTM, transformers)" }
                    ]
                },
                {
                    "title": "Развертывание и контейнеризация",
                    "icon": "🚀",
                    "items": [
                        { "id": 312, "title": "Развертывание моделей (Flask, FastAPI, Streamlit, Gradio)" },
                        { "id": 315, "title": "Docker (контейнеризация ML моделей)" }
                    ]
                },
                {
                    "title": "Git и управление репозиториями",
                    "icon": "🐙",
                    "items": [
                        { "id": 316, "title": "Git (основы, работа с репозиториями)" }
                    ]
                },
                {
                    "title": "Этика и принципы работы с AI",
                    "icon": "⚖️",
                    "items": [
                        { "id": 318, "title": "Этика и принципы работы с AI (bias, explainability, fairness)" }
                    ]
                },
                {
                    "title": "SQL и работа с большими данными",
                    "icon": "⚡",
                    "items": [
                        { "id": 319, "title": "Основы SQL (запросы, JOIN, агрегатные функции)" },
                        { "id": 320, "title": "Работа с Big Data (Spark, Hadoop – базовое понимание)" }
                    ]
                }
            ],
        },
    ],
}