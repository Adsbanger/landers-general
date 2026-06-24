const wheelTextItems = [
  {
    first: 'R3,000',
    second: 'Bonus'
  },
  {
    first: 'R300'
  },
  {
    first: 'R500'
  },
  {
    first: 'R750'
  },
  {
    first: 'RESPIN'
  },
  {
    first: 'R1,000'
  },
  {
    first: 'R1,500'
  },
  {
    first: 'RESPIN'
  }
];

const wheelTexts = document.getElementById('wheelTexts');

wheelTexts.innerHTML = wheelTextItems
  .map((item, index) => `
      <div class="wheel__texts-${index + 1} wheel__texts-block">
          <p class="wheel__texts-1-first" style="font-size: ${item.firstSize || '3em'}">
              ${item.first}
          </p>

          ${item.second ? `
              <p class="wheel__texts-1-second" style="font-size: ${item.secondSize || '2em'}">
                  ${item.second}
              </p>
          ` : ''}
      </div>
  `)
  .join('');