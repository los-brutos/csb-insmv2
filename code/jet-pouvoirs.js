${#caracteristique:= item.reussite}$
${#carac:= recalculate(concat("$","{",caracteristique,"}","$"))}$
${#libelle:= item.name}$
${#niveau:= item.niveau}$
${#malusCol:= 0}$
${#modificateur:= 0}$
${#seuil:= 0}$
${?#{_jet_talent_pouvoir}}$

${#seuil:= %{
/**
 définissons ici le seuil à atteindre
*/

// Table unique multiple
const tum = Array(
//  -   1   2   -   -   3   -   -   4   -   -   -   -   5   -   -   -   6
//  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17
  [11, 13, 21, 22, 23, 24, 25, 26, 32, 33, 34, 35, 41, 43, 46, 53, 61, 66], // 0
  [13, 21, 32, 34, 36, 43, 45, 51, 54, 55, 56, 62, 64, 66, 66, 66, 66, 66], // 1
  [16, 24, 43, 46, 54, 62, 63, 64, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66], // 2
  [31, 43, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66]  // 3
);

// correspondance entre le niveau de la caractéristique et la colonne
const colonneCarac = {
  1: 1,
  2: 2,
  3: 5,
  4: 8,
  5: 13,
  6: 17 // aka tmu.length-1
};

const col = Math.min(17, Math.max(0, colonneCarac[${carac}$] + ${malusCol}$ + ${modificateur}$));
return tum[${niveau}$][col];
}%}$

${#c:= [1d6[red]]}$
${#d:= [1d6[black]]}$
${#u:= [1d6[white]]}$

${#roll:= (c*10)+d}$

${#reussite:= ((c*10)+d <= seuil ? true : false)}$

<table>
  <colgroup>
    <col style="width: 50%;">
    <col>
  </colgroup>
  <tbody>
    <tr class="insmv-jet${!and(c==6, and(d==6, u==6)) ? " insmv-jet-bete" : and(c==1, and(d==1, u==1)) ? " insmv-jet-unique": ""}$">
      <th colspan="2" style="text-align: center;">
        @UUID[${!item.uuid}$]{${!libelle}$}
      </th>
    </tr>
    <tr>
      <td colspan="2">
        <div style="display: flex; align-items: center; font-size: 0.95em; padding-left: 33%;">
          <div class="dice dice-hundreds">${!c}$</div>
          <div class="dice dice-tens">${!d}$</div>
          <div class="dice dice-units">${!u}$</div>
        </div>
      </td>
    </tr>
    <tr>
      <td>${!caracteristique}$ ( ${!carac}$ )</td>
      <td>
        ${!niveau}$ 
        ${!modificateur == 0 ? '' : concat(' <span data-tooltip="Modificateur">(', modificateur >= 0 ? concat('+', modificateur) : modificateur, ' col)</span>')}$
        <span><i class="fa-light fa-right"></i> ${!seuil}$-</span>
      </td>
    </tr>
    <tr class="insmv-result ${!reussite ? 'insmv-success' : 'insmv-fail'}$">
      <th>
        ${!reussite ? 'Succès' : 'Echec'}$
      </th>
      <td>
        RU : ${!u}$${!malusCol == 0 ? "" : concat(' <span data-tooltip="bonus données par un malus de colonnes">+ ', (-1)*malusCol, '</span>')}$
    </tr>
    <tr style="font-style: italic;">
      <td>Défense : ${!item.defense}$</td>
      <td>Coût PP : ${!item.cout}$</td>
    </tr>
  </tbody>
</table>