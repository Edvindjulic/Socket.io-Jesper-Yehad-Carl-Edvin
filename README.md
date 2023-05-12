# Namn

The Chatting-app

## Beskrivning

En app där användare chattar med varandra. Du börjar med att ange ett användarnamn varfter du kommer in i ett "default" room. Väl därinne kan du gå med i rum som redan finns eller skappa ett rum där andra användare kan ansluta sig till. Du som användare har även en möjlighet att skicka privata meddelanden till användare. Sist ut stänger dörren vilket innebär att om du är ensam användare och går ut som kommer rummet att stängas. Du kan även se vilka users som är inne i ett rum samt totala antalet användare.

## Tekniker och verktyg

Vi har användt oss av följande ramverk: För realtidschat användes socket.io för design och layout Material UI, React har använts för våra komponenter och typescript för utveckling

### Front End

- React, Typescript, Material UI, Vite

### Back End

- Socket.io, Typescript

## Skapare

[Edvin Djulic](https://github.com/Edvindjulic), [Carl Hasselblad](https://github.com/lysmac), [Jesper Lindström](https://github.com/Jesper-Lindstrom), [Yehad Moussaoui](https://github.com/ye-mou)

## Kodbas

Den här kodbasen är indelad i en [klientmapp](./client/) och en [servermapp](./server/).

Här är en lista på de olika skripten som kan köras i terminalen.

Navigera först till server mappen -`cd server` och sedan:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar utvecklingsmiljön.

Sedan gör du samma sak för client mappen det vill säga - `cd client`och sedan:

- `npm install` - Installerar alla NodeJS moduler (körs en gång).
- `npm run update` - Uppdaterar testerna och behöver köras om läraren har ändrat dom.
- `npm run dev` - Startar utvecklingsmiljön.

Efter detta kan du navigera tillbaka till root-mappen genom att skriva `cd ..` och sedan köra följande kommandon:

- `npm run all` för att starta båder server och client samtidigt

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

- [x] Alla punkter för godkänt är uppfyllda
- [x] Varje rum i listan skall även visa vilka användare som finns i rummet
- [x] Det ska gå att ha privata konversationer med enskilda användare (DM’s)
- [x] Historik ska sparas för skickade meddelanden och visas när en konversation öppnas (gäller både för Rum och för DM’s)
- [x] När sidan laddas om ska användaren behålla sitt användarnamn, läggas tillbaka i konversationen som den befann sig i (Rum eller DM) och kunna sina läsa tidigare DM’s
