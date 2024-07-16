/*
Projektleírás 

Lesz egy tömb, amiben lesznek a objektumok olyan kulcsokkal, hogy 
1. kérdés
2. 4 darab opció, hogy mi a megfelelő válasz, ez egy objektum lesz és majd végig tudunk ezen is menni, mint egy tömbön a map-val 
    csak annyi, hogy kell csinálni egy Object.entries(megadni, az elérési útvonalat) és mivel ez egy tömb tömbökkel, amiben benne vannak az 
    értékpárok, ezért ha végigmegyünk lehet úgy hivatkozni a kulcsokra, hogy entry[0] és az értékre meg, hogy entry[1]
    nekünk az entry[0] kell majd, mert ezt fogjuk összehasonlítani a helyes válasszal!!!!!  
3. helyes válasz, megadjuk, hogy melyik a helyes "a" vagy "b" vagy "c" vagy "d"
4. válasz amit megad a felhasználó, ezt majd úgy csináljuk, hogy ki kell jelölnie egyet és lesz egy függvény, amit megadunk ennek a button-nek 

kell egy currentIndex, mert majd ezt fogjuk használni a tömbhöz, hogy tudjuk melyik kérdésről van szó, ez nulláról indul majd, mert 
a tömb első eleme a nulla és majd ha kiválasztott valamit és megadta azt válasznak, akkor ennek a useState-s változónak növeljük majd az 
értékét 

showProperAnswer ez meg, azért kell, hogy ha már megadta a választ, akkor ne tudjon utána semmit se bejelölni!!!!!! 

nagyon fontos ebben a quiz-ben, hogy lesznek majd segédfüggvénynek
1. selectedAnswer
2. showAnswer  
3. showWrongAnswer

1. Kap egy másik háttéeszínt az amelyiket kiválasztott a játékos, ezt úgy csináljuk, hogy a questions tömbben az objektumban lesz 
egy olyan kulcs, hogy userAnswer ez egy üres string lesz majd eleinte, de majd a selectAnswer függvénnyel ennek az értékét majd 
megváltoztatjuk arra amire rákattintott, tehát ott már nem egy üres string lesz hanem userAnswer: "b" mondjuk 
és bekérünk még egy char-t, aminek megadjuk majd a entry[0], ami "a", "b", "c" vagy "d" és ahol ez megegyezik, tehát jelen esetben a b
az majd kap egy osztályt 
de itt a függvényben csak return-ölünk egy ilyet, hogy return char === userAnswer ? "selected-answer " : " ";
és majd meghívásnál megadjuk mindkettő neki selectedAnswer(entry[0], questions[currentIndex].userAnswer)

2. showAnswer ez is bekér egy char-t, amit megaduk neki az entry[0]-val, hogy vagy "a".."d" és ezt kell majd összehasonlítani
és ezt össze kell hasonlítani azzal, ami a jó válasz, ezt meg mi megadtuk már az objektumnak van egy olyanja, hogy solution minden kérdésnél
és mi ezt megadjuk az elején, amikor csináljuk a questions tömbben az objektumokat, mert lesz egy olyanja, hogy solution, ami meg "a"
így fog kinézni vagy b,c,d, attól függ, hogy mi a jó válasz!!!!!!!!! 

és a kettőt ezt összehasonlítjuk és ahol egyezőség van, tehát a jó válasznál, kap majd ott egy proper-answer class-t ami zöld lesz 

3. showWrondAnswer itt is bekérünk egy char-t ugyanúgy meghívásnál megadjuk a entry[0]-t, "a", "b", "c" vagy "d"-t 
és itt a kikötésnél kettő feltétel lesz 
    - ha char-nak amit bekérünk annak egyenlőnek kell lennie a játékos tipp-jével -> userAnswer
    - nem szabad, hogy egyenlő legyen a solution-vel!!!!!!!!
mert itt kap majd egy olyan class-t, hogy piros legyen és ha a solution-vel egyenlő lennne és a userAnswer-rel is 
akkor azt jelenti, hogy a játékos eltalálta és akkor nem szeretnénk, hogy megkapja ezt a piros háttérszínű class-t 
hanem maradjon a zöld és csak az legyen piros amire a játékos tippelt userAnswer és az nem a solution 

Így a solution zöld lesz mindig és ha nem találta el a játékos, akkor meg az a válasz piros!!!!!! 

Ami még nagyon fontos!!!!!!! 
hogy lesz egy button, amivel a játékos be tuldja küldeni a válaszát és amikor ez megtörtént, akkor a showProperAnswer az false-ról true-ra 
állítjuk és utána ez a gomb át fog változni arra, hogy új kérdés!!!! 
-> 
<button onClick={!showProperAnswer ? tip : nextQuestion} className="btn">
    {!showProperAnswer ? "Send" : "Next"}
</button>

Tehát a button-nek attól függően, hogy a showProperAnswer értéke mi egy onClick-vel vagy a tip vagy a nextQuestion függvényt fogjuk megadni 
és ami bele van írva a button-be az is ettöl fog függeni -> {!showProperAnswer ? "Send" : "Next"}
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
******
Játék kinézete 
Megjelenítjük a jelenlegi kérdést miután vegigmentünk a map-val!!!!
de fontos, hogy nem így {questions.question}, mert így az összeset megjeleníti, hanem van egy currentIndex-ünk amit itt használunk, hogy 
mindig a megfelelő kérdés jelenjen majd meg -> questions[currentIndex].question 
de ha nincs ilyen useState-s változónk, akkor is kapunk a map-nál mindig egy i-t, mint index, amit megadunk key-nek 
ezt is lehetne itt használni és akkor ez lenne, hogy questions[i].question!!!!!!! 

ezután meg akarjuk jeleníteni, amit beírtunk lehetséges answer-nek, questions tömbön belüli objektum ez a része 
            answers:{
                a:"Madrid",
                b:"Barcelona",
                c:"Sevilla",
                d:"Valencia"
            },
ez egy objektum, de ezen is végig lehet menni az Object.entries()-vel és itt is fontos, hogy nem mindegyiket jelenítjük meg, hanem csak azt 
ami ahhoz a kérdéshez tartozik, ezért itt is kell használni a currentIndex-et!!!!!! 
-> 
Object.entries(questions[currentIndex].answers).map(entry) és itt kapunk majd egy entry[0] meg egy entry[1]-et hiszen ezek is tömbök 
["a", "Madrid"] ["b", "Barcelona"] 
és az entry[0] az lesz a "a" meg a "b" stb. az entry[1] meg a value-ja az eredeti objektumnak, tehát "Madrid", "Barcelona"
ezeket szeretnénk megjeleníteni mindkettőt
-> 
{entry[0]} : {entry[1]} és ezt így két külön {}-ben!!!!!!!!!!!! 
*/
import { useState } from "react";

function Quiz() {
    const [questions, setQuestions] = useState([
        {
            question: "Mikor kezdődött a 100 éves háború?",
            answers: {
                a: 1337,
                b: 1338,
                c: 1339,
                d: 1340
            },
            solution: "a",
            userAnswer: ""
        },
        {
            question: "Mi Spanyolország fővárosa?",
            answers: {
                a: "Madrid",
                b: "Barcelona",
                c: "Sevilla",
                d: "Valencia"
            },
            solution: "a",
            userAnswer: ""
        }
    ]);
    /*
    Ezekből fogunk majd dolgozni, fontos, hogy itt legyen a userAnswer meg a solution is, mert majd ezek alapján tudunk class-okat 
    csinálni, ami majd kijelőli a megfejtést, ahol az answers-ekbők a solution-val valamelyik egyenlő a solution-val 
    és a userAnswer-t is ugyanígy, ahol a userAnswer az egyenlő valamelyik answers értékével és akkor majd azt fogjuk megjeleölni, hogy 
    azt tippelte a felhasználó 

    igazából itt az lesz, hogy végigmegyünk a answers-eken egy map-val és mindegyikkel összehasonlítjuk majd a solution-t 
    jelen esetben a solution az "a" és akkor az answers-ből is majd entry[0] a: "Madrid",b: "Barcelona", c: "Sevilla", d: "Valencia"
    a: "Madrid"-val lesz egyenlő és akkor adunk neki egy class-t, hogy zöld legyen 

    a felhasználó tipp-je ugyanez, majd a userAnswer-nek megadjuk, hogy a,b,c,d és akkor azt összehasonlítja, mint az elöbb az entry[0]-vel
    és ahol egyezőség van "a" === "a"-val ott adunk neki egy selected-class-t, hogy ezt tippeli a felhasználő, jelölte ki 
    *****************
    */
    const [currentIndex, setCurrentIndex] = useState(0);
    /*
    Ez is nagyon fontos, mert egyszerre csak egy kérdést illetve a hozzá tartozó answer-eket szeretnénk megjeleníteni, ezért a 
    currentIndex-et majd mindig a questions-tömbbel használjuk így -> questions[currentIndex].question vagy question[currentIndex].answers
    hogy mindig az a kérdés meg a válaszok jelenjenek meg ahol jár ez az index, 0-val kezdjük, tehát az első(nulladik indexű) kérdés
    fog megjelenni elöször, de ezt majd növeljük, amikor át akarunk menni a következő kérdésre!!!! -> nextQuestion függvény!!!! 
    *************************
    */
    const [showProperAnswer, setShowProperAnswer] = useState(false);
    /*
    ezt majd a button-nél fogjuk használni, hogyha ez false, akkor beküldje a felhasználó a tipp-jét(tipp függvény) illetve 
    ha ez true, akkor meg átugorjunk a következő kérdésre!!!!! nextQuestion függvény 

    szóval a button-nél ezt vizsgáljuk, hogy ennek az értéke az false, akkor tipp ha meg true, akkor meg nextQuestion 
    de viszont attól függően, hogy melyik függvény fog lefutni a button-ba lévő text-nek is változni kell, mert válaszbeküldésnél 
    "Send" legyen a button-be kiírva, ha meg következő kérdés, akkor meg "Next"
    -> 
    <button onClick={!showProperAnswer ? tip : nextQuestion} className="btn">
            {!showProperAnswer ? "Send" : "Next"}
    </button>
    és ezek a függvények mivel egy button-ről van szó, ezért egy onClick-vel fognak majd lefutni!!!!!
    ********** 
    */
    const [points, setPoints] = useState(0);
    /*
    itt meg simán a solution-t meg a userAnswer-t fogjuk összehasonlítani, persze ez is mindig currentIndex segítségével, hogy 
    ugyanabban az objektumban ami soron van(ki van írva) hasonlítsuk össze a solution-t meg a userAnswer-t!!!!!!!  
    ************************
    */
    /*
    A selectAnAnswer függvény vár egy char-t, tehát egy betüt, hogy melyiket választotta a user
    -> 
    Object.entries(questions[currentIndex].answers).map((entry)=> 
    <div key={entry[0]} onClick={()=>selectAnAnswer(entry[0])}
    ezt itt meghívásnál meg is kapjuk!!!!! mert itt végigmentünk egy map-val az answers-ökön és mindegyik-re csináltunk egy div-et egy onClick-vel
    és akkor tudjuk, hogy melyikre kattintott a felhasználó és az entry[0] kell nekünk, tehát a betű, hogy a,b,c,d és akkor ezzel majd a 
    userAnswer-nak az értékének megadjuk ezt a char-t, amit itt bekértünk és meg is kaptunk!!!!! 
    és akkor a userAnswer: "a" vagy "b" vagy "c" vagy "d" lesz, attól függően, hogy melyikre kattintott rá a felhasználó!!!! 
    fontos itt is a currentIndex használata, hogy tudjuk, hogy melyik kérdésről (objektumról) van szó
    */
    const selectAnAnswer = (char) => {
        /*
        ha beküldte (megnyomta a gombot) és kiírtuk, hogy mi a jó megfejtés stb., akkor ne tudjon a felhasználó nyomkodni már 
        ezért itt az elején ha showProperAnswer true, akkor return, ha viszont nem, akkor mehetünk tovább és akkor lehet kattintani 
        másikra is amíg nem nyomta meg a send gombot!!!!! 
        */
        if (showProperAnswer) {
            alert("You have already selected an answer!")
            return;
        }
        /*
        itt adjuk meg értéknek a char-t amit itt megkapunk ebböl 
        ->
        Object.entries(questions[currentIndex].answers).map((entry)=> 
        <div key={entry[0]} onClick={()=>selectAnAnswer(entry[0])}
        tehát ezzel kell majd az objektumunknak a userAnswer-jét frissíteni -> userAnswer: ""
        */
        const qs = [...questions];
        qs[currentIndex].userAnswer = char;
        setQuestions([...qs]);
        /*
        1. const qs = [...questions]; react-ben mindig ki kell bontani az eredeti függvényt megcsinálni a változtatást 
            és azzal a változtatott verzióval set-elni useState-s változót 
        2. qs[currentIndex].userAnswer = char; itt történik meg a változás, hogy a char-t amit megkapunk megadjuk a userAnswer-nek 
        3. setQuestions([...qs]); itt meg azzal verzióval, tömbbel set-eljük majd a useState-s változónkat amiben már megtörtént a változás 
        */
    };

    /*
    Ebben a segédfüggvényben bekérünk egy char-t (ami lehet a,b,c,d), attól függően, hogy melyikre kattintott rá a user 
    meg egy userAnswer ezt meg innen felülről a useState-ből el tudnánk érni de meghívásnál ezt megadjuk, hogy mi a 
    userAnswer, amit az előző függvényben megcsináltunk 
    ->
    selectedAnswer(entry[0], questions[currentIndex].userAnswer) 
    és ha ennek a kettőnek az értéke egyezik, akkor adunk egy class-t annak ahol egyezőség van 
    Object.entries(questions[currentIndex].answers).map((entry)=> 
    <div key={entry[0]} onClick={()=>selectAnAnswer(entry[0])}
    className={"answer " + selectedAnswer(entry[0], questions[currentIndex].userAnswer) 
    Tehát a 4 div-ből, amit itt csináltunk az fogja kapni ahol ez a kettő megegyezik, egyenlő
    az fogja kapni a selected-class-t!!!! 
    */
    const selectedAnswer = (char, userAnswer) => {
        return char === userAnswer ? "selected-class " : " ";
        // fontos, hogy legyen egy space utána "selected-class ", mert majd összefüzzük a class-okat és nem érhetnek egymásba 
        //így legyen className="selected-class box" ne így className="selected-classbox"
    }

    /*
    itt már nem kérjük be a solution-t az elöbb sem kellett volna a userAnswer-t, mert ez el van mentve egy useState-be, aminek az értékét 
    itt a függvényben elérjük!!!! 
    tehát itt a solution fogjuk azzal összehasonlítani, hogy melyik a 4 közül a jó 
    tehát a solution az biztos jelen esetben az első objektumban az "a" és ahol "a" lesz az entry[0], annak adunk egy osztályt!!! 
    showAnswer(entry[0]) -> csak akkor kapja meg a div ezt a class-t, ha meghívásnál ennek az értéke true lesz!!!!! !!!
    de lehet majd a "d" a jó a kövekező kérdésben, akkor meg annak adunk egy class-t, ahol "d" az entry[0]
    */
    const showAnswer = (char) => {
        return char === questions[currentIndex].solution ? "proper-answer " : " ";
    }

    /*
    itt meg kell nézni, hogy a char, amit megkapunk az egyezik a userAnswer-rel, de viszont a userAnswer nem egyezik a solution-val, 
    akkor adunk neki egy wrong answer class-t
    fontos, hogy itt azt is meg kell nézni, hogy a showProperAnswer az true legyen, hiszen csak akkor akarjuk, hogyha már megnyomta 
    a send gombot!!!! 
    */
    const showWrongAnswer = (char) => {
        return char === questions[currentIndex].userAnswer && questions[currentIndex].solution !== questions[currentIndex].userAnswer &&
            showProperAnswer ? "wrong-answer " : " ";
    }

    /*
    Ebben a tip függvényben tip-elünk és ez akkor fog lefutni ha megnyomtuk a gombot 
    ha nincs a userAnswer-nek értéke, akkor viszont return-ölünk, mert akkor tudjuk, hogy a felhasználó úgy nyomta meg a gombot, hogy 
    nem választott ki semmit, tehét a questions[currentIndex].userAnswer az üres!!!!! 

    showProperIndex-et false-ról true állítjuk 

    megnézzük, hogy a solution egyezik-e a userAnswer-rel, mert ha igen, akkor adunk neki egy pont-ot!!! 
    */
    const tip = () => {
        const qs = [...questions];
        //ha még nem választott úgy akarja beküldeni, tehát a userAnswer értéke egy üres string, akkor return !!! 
        if(qs[currentIndex].userAnswer === "") {
            alert("You did not select an answer!");
            return;
        }

        //ha tippelt, akkor set-eljük a showProperAnswer-t true-ra!! 
        setShowProperAnswer(true);

        //és ha a solution meg a userAnswer megegyezik, akkor adunk neki egy pontot
        if(qs[currentIndex].solution === qs[currentIndex].userAnswer) {
            setPoints(p=>++p);
        }
    }

    /*
    nextQuestion nagyon fontos, hogy itt kell majd növelni a currentIndex-nek az értékét!!!! 
    ez is egy onClick-re lesz megadva egy button-nek!!! 
    a showProperAnswer-t visszarakjuk false-ra 

    van egy kikőtés, amit az elején megcsinálunk, hogy csak akkor tudjunk továbbmenni, hogyha a currentIndex az nagyobb vagy egyenlő 
    a questions.length-1-jével, mert ha egyenlő akkor az azt jelenti, hogy az utolsó indexün vagyunk és akkor innen már ne lehessen 
    továbbmenni, tehát itt kell egy return!!! 
    */
    const nextQuestion = ()=> {
        //ha az utolsó kérdésnél vagyunk, akkor ne lehessen továbbmenni
        if(currentIndex >= questions.length-1) {
            return;
        }

        //hogy újra csak akkor mutassuk meg a helyes választ ha ez true lesz majd!!! 
        setShowProperAnswer(false);
        //növeljük a currentIndex-et, mert a következő objektum, elem kell majd a tömbből!!! 
        setCurrentIndex(ci=>++ci);
    }

    return(
        <div className="container">
            <div className="points-holder">
                <h3>{points} : {currentIndex+1}</h3>
            </div>
            {
                <div className="question">
                    <h3>{questions[currentIndex].question}</h3>
                    <div>
                        {
                            Object.entries(questions[currentIndex].answers).map((entry)=> 
                                <div key={entry[0]} onClick={()=>selectAnAnswer(entry[0])}
                                className={"answer " + selectedAnswer(entry[0], questions[currentIndex].userAnswer)
                                + showAnswer(entry[0]) + showWrongAnswer(entry[0])}>
                                    {entry[0]} : {entry[1]}
                                </div>
                            )
                        }
                    </div>

                    <button onClick={!showProperAnswer ? tip : nextQuestion} className="btn"> 
                        {!showProperAnswer ? "Send" : "Next"}
                    </button>
                </div>
            }
        </div>
    )

}

export default Quiz;

/*
lehetett volna hasonlóan, hogy kihelyezzük egy ilyenbe, de túl sok prop lett volna, amit meg kellett volna adni 
mert emellett ami itt van még meg kellett volna adni az entry-ket is és nem lett volna jobb, kevesebb hely 

function QuizElement({selectAnAnswer, selectedAnswer, showAnswer, showWrongAnswer}) {
    return (
        <div key={entry[0]} onClick={()=>selectAnAnswer(entry[0])}
            className={"answer " + selectedAnswer(entry[0], questions[currentIndex].userAnswer) 
            + showAnswer(entry[0]) + showWrongAnswer(entry[0])}>
            {entry[0]}: {entry[1]}
        </div>
    );
}

export default QuizElement;
*/


