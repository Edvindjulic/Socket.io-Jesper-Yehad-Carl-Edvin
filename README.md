# Något Coolt Namn På Vår Chat

## Beskrivning

## Tekniker och verktyg

### Front End

- [Lista](https://) - Lista
- [På](https://) På

### Back End

- [Olika](https://) - Olika
- [Grejer](https://) - Grejer

## Skapare

[Edvin Djulic](https://github.com/Edvindjulic), [Carl Hasselblad](https://github.com/lysmac), [Jesper Lindström](https://github.com/Jesper-Lindstrom), [Yehad Moussaoui](https://github.com/ye-mou)

## Kodbas

Den här kodbasen är indelad i en [klientmapp](./client/) och en [servermapp](./server/).
Servern har två miljöer konfigurerade, en för utveckling och en för testning.

Här är en lista på de olika skripten som kan köras i terminalen.

Navigera först till server mappen -`cd server` och sedan:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar utvecklingsmiljön.
- `npm test` - Startar testmiljön så du kan jobba med kravlistan.

Efter detta kan du navigera tillbaka till root-mappen genom att skriva `cd ..` och sedan köra följande kommandon:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run dev` - Startar utvecklingsmiljön med Vite.

När du har gjort detta kan du sedan när du står i root-mappen använda följande kommandon så du slipper navigera in i mapparna:

- `npm test` - Startar testen utan att du behöver navigera in i server-mappen.
- `npm run frontend` - Startar frontend-miljön med Vite.
- `npm run backend` - Startar backend-miljön med Nodemon.
- `npm run all`- Startar både frontend och backend samtidigt.

**Krav för godkänt:**

- [x] Användaren får börja med att välja ett eget visningsnamn när den besöker sidan
- [x] Det ska gå att skapa ett rum (och samtidigt gå med i rummet)
- [x] Det ska gå att lämna ett rum (tomma rum ska automatiskt försvinna)
- [x] Samtliga rum skall vara synligt i en lista
- [x] De går att gå med i ett rum genom att klicka på det i listan
- [x] När en användare går med i ett nytt rum ska befintligt rum lämnas automatiskt
- [x] Användare ska kunna skicka och läsa nya meddelanden i rummet de har gått med i
- [?] När en användare håller på att skriva ett meddelande skall det synas för alla andra i rummet
- [x] Git & GitHub har använts
- [x] Projektmappen innehåller en README.md fil (läs ovan för mer info)
- [x] Uppgiften lämnas in i tid!

**Krav för väl godkänt:**

- [ ] Alla punkter för godkänt är uppfyllda
- [ ] Varje rum i listan skall även visa vilka användare som finns i rummet
- [ ] Det ska gå att ha privata konversationer med enskilda användare (DM’s)
- [x] Historik ska sparas för skickade meddelanden och visas när en konversation öppnas (gäller både för Rum och för DM’s)
- [ ] När sidan laddas om ska användaren behålla sitt användarnamn, läggas tillbaka i konversationen som den befann sig i (Rum eller DM) och kunna sina läsa tidigare DM’s
