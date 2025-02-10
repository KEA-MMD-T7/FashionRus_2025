Del 1:

1. HTML: Lav en dropdownliste <select> / knapper eller ligende UI elementer hvorfra et filter kan sættet.

2. Lav en reference med js til ex. drowdownliste elementet: ex. document.querySelector('#dropdownlist').

3. Opret en eventlistener addEventListener((event) => {}) der kan lytte på ændringer i dropdownlisten.

4. Benyt eventobjektet(Hint: event.target.value) til at få fat i value egenskaben fra den valgte <option value="discount">.

Nu er første del klar, vi har lavet vores opsætning af UI og vi har fået "connected" det med JavaScript.
Næste skridt er at refator(omstrukturere) noget af den kode vi allerede har udviklet.

Del 2: 5. Opret en variabel til at gemme de data fetch returnere: const products = fetch(...)

6. Opret en funktion: function showProducts(){...} til at håndterer produktvisningen. Koden er allerede skrevet, men i den nuværende version, står den i vores sidste .then() metode i vores fetch.

   hint: Når vi skal arbejde med de produkter vi har gemt i products variablen, se punkt 5. skal vi bruge metoden then() igen
   products.then((products => {...})).
   Grunden til at vi opretter en funktion er fordi vi skal udføre den samme handling; vis produkter, to gange. Første gang når brugeren kommer ind på produktlisten, og igen når brugeren har valgt et filter.

7. Kald funktionen showProducts(), i din eventHandler, den vi oprettede i punkt 3. Se om produkterne vises (uden filter) når du vælger et filter.

8. Kald funktionen showProducts, nu skulle produkterne gerne vises på siden igen.

   Nu har du sat grundstruktureren op for din filter funktionalitet. Nu skal vi til at arbejde med funktionaliteten, til det skal vi bruge metoden filter().

9. Udvid showProduct, så funktionen kan modtage medtager event objektet som parameter.

10. Kald filter() før map(). ex. products.filter((product) => { Her skal vi oprette betingelserne for filter, ex. if(event.target.value == "all") etc. }).map(() => {...})
